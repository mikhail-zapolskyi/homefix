"use client";

import {
    CustomButton,
    EditorField,
    ReviewContainer,
    SectionWithTitle,
    SliderInput,
} from "@/components";
import { useValidateReviewFields } from "@/hooks";
import { Fields } from "@/hooks/useValidateReviewFields";
import { Box, Stack } from "@mui/material";
import { Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

type ReviewCreationType = Omit<
    Review,
    | "id"
    | "createdAt"
    | "userId"
    | "serviceProfileId"
    | "projectId"
    | "overall_rating"
    | "content"
>;

const explanation = {
    service_quality:
        "The cornerstone of any exceptional service experience, it reflects the overall standard and satisfaction derived from the service provided.",
    punctuality:
        "Punctuality pertains to the service provider's ability to consistently adhere to scheduled appointments or delivery times. It ensures that the service is reliable and dependable in terms of timing.",
    communication:
        "Communication involves the effectiveness of interactions with the service professional. It encompasses responsiveness, clarity, and the ability to convey information and address concerns promptly and accurately.",
    consultations:
        "Offering free consultations or assessments before providing the service.",
    professionalism:
        "Professionalism refers to the overall conduct, attitude, and appearance of the service provider. It reflects their commitment to maintaining a high standard of service and treating customers with respect.",
    expertise:
        "Demonstrating excellence and deep knowledge in the specific field of service, assuring customers of the provider's competence and ability to deliver high-quality results.",
    efficiency:
        "Efficiency evaluates the speed and effectiveness with which the service is delivered, ensuring that the service is completed in a timely and satisfactory manner.",
    accuracy:
        "Accuracy is critical for services that require precision and attention to detail. It ensures that the service is performed with a high degree of precision and correctness.",
    problem_solving:
        "Problem-solving assesses the service provider's ability to address issues and challenges in a friendly and courteous manner, ensuring that the customer's concerns are resolved effectively.",
    emergency:
        "Emergency services are available 24/7 to address urgent needs. This provides customers with peace of mind, knowing that help is readily available in critical situations.",
    value_for_money:
        "Value for money evaluates whether the service provided justifies its cost. It considers the quality and benefits of the service in relation to the price paid.",
    reliability:
        "Reliability focuses on the consistency and dependability of the service professional. Customers can count on the service being delivered as promised every time.",
    transparency:
        "Transparency involves openness and clarity in all aspects of the service, including pricing, terms, and conditions. Customers should have a clear understanding of what they are receiving.",
    discounts:
        "By participating in referral programs, customers can receive discounts or rewards for successfully referring others to the service, making it more affordable and enticing. Any other discounts",
    innovation:
        "Innovation signifies the use of new and inventive methods or technology in service delivery, ensuring that the service remains up-to-date and efficient.",
    accountability:
        "Accountability entails taking responsibility for any mistakes or issues that may arise during the service. It demonstrates a commitment to rectifying problems and ensuring customer satisfaction.",
    friendliness:
        "Friendliness evaluates the service provider's approachability and courtesy during interactions with the customer. A friendly demeanor creates a positive and welcoming service experience",
    overall_rating: "",
    content: "",
    projectId: "",
    serviceProfileId: "",
};

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
        const isValid = validateForm(review as Fields);
        console.log({ errorContent, isValid });

        if (!isValid) {
            return toast.error("Not VAlid");
        }
        const data = { ...review, ...otherDetails };
        alert(JSON.stringify(data));
        // router.push("/dashboard/projects");
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
