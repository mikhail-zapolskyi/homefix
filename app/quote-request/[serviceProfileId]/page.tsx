// This page process User Project Request for only choosen service profile.

"use client";

import {
    CustomButton,
    EditorRequestField,
    EditorView,
    SectionWithTitle,
} from "@/components";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const output_request = {
    title: "Kitchen Pipe Leak Repair",
    content:
        "<ul><li>Assess the extent of water damage to the cabinet below the sink.</li><li>Repair the leaky pipe in the kitchen.</li><li>Ensure there are no further leaks.</li></ul>",
    categories: ["Plumbing Services"],
    specialties: ["Pipe Repair", "Water Damage Assessment"],
    country: "",
    state: "",
    city: "",
    budget: 10000,
};

const page = ({ params }: { params: { serviceProfileId: string } }) => {
    const { serviceProfileId } = params;
    const router = useRouter();
    const [content, setContent] = useState<string>("");
    const [processedRequestByAi, setProcessedRequestByAi] = useState<
        Record<string, any>
    >({});

    const handleMessageContent = (content: string) => {
        setContent(content);
    };

    const handleProcessRequest = () => {
        setProcessedRequestByAi(output_request);
    };

    const sendRequest = async () => {
        try {
            const response = await axios.post("/api/projects/request", {
                serviceProfileId,
                ...output_request,
            });

            if (response.status === 200) {
                toast.success("Quote request sent successfully");
                router.push("/dashboard/projects");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };
    return (
        <Box
            sx={{
                width: "100%",
                padding: "2rem 1rem",
                sm: { padding: "none" },
            }}
        >
            {!_.isEmpty(processedRequestByAi) && (
                <SectionWithTitle title="Processed Request">
                    <Typography>
                        Take a moment to review if your request looks right
                    </Typography>
                    <Typography variant="h2">{output_request.title}</Typography>
                    <EditorView content={output_request.content} />
                    <Typography variant="body2">
                        Categories: {output_request.categories}
                    </Typography>
                    <Typography variant="body2">
                        Specialties: {output_request.specialties}
                    </Typography>
                    <Typography variant="body1">
                        Budget: {output_request.budget}
                    </Typography>
                    <CustomButton
                        text="Adjust Request"
                        onClick={() => {
                            setProcessedRequestByAi({});
                        }}
                    />
                    <CustomButton
                        text="Send Request"
                        variant="contained"
                        onClick={sendRequest}
                    />
                </SectionWithTitle>
            )}
            {_.isEmpty(processedRequestByAi) && (
                <EditorRequestField
                    content={content}
                    onChange={handleMessageContent}
                    onClick={handleProcessRequest}
                />
            )}
        </Box>
    );
};

export default page;
