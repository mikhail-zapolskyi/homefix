"use client";

import {
    CustomButton,
    EditorField,
    ReviewContainer,
    SectionWithTitle,
    SliderInput,
} from "@/components";
import { useValidateReviewFields } from "@/hooks";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { ReviewCriteria, ReviewCreationType } from "@/app/types";
import { explanation } from "@/assets/review/explanation";

const Page = ({
    params,
}: {
    params: { serviceProfileId: string; projectId: string };
}) => {
    const { serviceProfileId, projectId } = params;
    const router = useRouter();
    const [review, setReview] = useState<ReviewCreationType>({
        service_quality: null,
        punctuality: null,
        communication: null,
        consultations: null,
        professionalism: null,
        expertise: null,
        efficiency: null,
        accuracy: null,
        friendliness: null,
        problem_solving: null,
        emergency: null,
        value_for_money: null,
        reliability: null,
        transparency: null,
        discounts: null,
        innovation: null,
        accountability: null,
    });
    const [otherDetails, setOtherDetails] = useState<Record<string, any>>({
        content: "",
        serviceProfileId,
        projectId,
        overall_rating: 0,
    });

    const { errorContent, validateForm } = useValidateReviewFields();

    type SliderEvent = Event & {
        target: { name: string };
    };

    const handleSliderChange = (e: Event, value: number | number[]) => {
        const sliderEvent = e as SliderEvent;
        setReview({ ...review, [sliderEvent.target.name]: value });

        const nonNullValues = _.values(review).filter(
            (value) => typeof value === "number" && value !== null
        );
        const average = Math.round(_.mean(nonNullValues));

        setOtherDetails({ ...otherDetails, overall_rating: average });
    };

    const handleEditorCallback = (data: Record<string, any>) => {
        setOtherDetails({ ...otherDetails, content: data.content });
    };

    const handleSubmitReview = async () => {
        // Get validation results
        const isValid = validateForm(review as ReviewCriteria);

        // Validate if the evaluation is complete and all fields are present.
        if (!isValid) {
            return;
        }
        // Combine review data with other details into a single review object for sending to an endpoint.
        const data = { ...review, ...otherDetails };

        try {
            const response = await axios.post("/api/reviews", data);

            if (response.status === 201) {
                toast.success("Review added");
                router.push("/dashboard/projects");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <ReviewContainer>
            <Box
                sx={{
                    width: { xs: "80%", md: "65%" },
                    padding: "1rem",
                    margin: "0 auto",
                }}
            >
                <Stack spacing={2}>
                    <SectionWithTitle
                        title={`Please provide a rating for your experience with this contractor or business. 
                                Be precise in your assessment. Rate each criteria on a scale of 0 to 100. 
                                Please adjust all the criteria so we can accurately evaluate your experience.
                        `}
                    />

                    {_.map(review, (value, key) => {
                        if (
                            key !== "content" &&
                            key !== "serviceProfileId" &&
                            key !== "projectId" &&
                            key !== "overall_rating"
                        ) {
                            return (
                                <SliderInput
                                    key={key}
                                    title={_.startCase(
                                        _.replace(key, "_", " ")
                                    )}
                                    content={
                                        explanation[
                                            key as keyof ReviewCreationType
                                        ]
                                    }
                                    value={value}
                                    name={key}
                                    onChange={handleSliderChange}
                                    errorContent={errorContent[key]}
                                />
                            );
                        }
                        return null;
                    })}
                    <SectionWithTitle
                        title={`Please provide brief comments about the service you've experienced`}
                    />
                    <EditorField
                        name="content"
                        content={otherDetails.content || ""}
                        onChange={handleEditorCallback}
                    />
                    <CustomButton
                        text="Submit Review"
                        variant="contained"
                        onClick={handleSubmitReview}
                    />
                </Stack>
            </Box>
        </ReviewContainer>
    );
};

export default Page;
