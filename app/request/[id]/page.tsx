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

const output_request = {
    title: "Kitchen Pipe Leak Repair",
    content:
        "<ul><li>Assess the extent of water damage to the cabinet below the sink.</li><li>Repair the leaky pipe in the kitchen.</li><li>Ensure there are no further leaks.</li></ul>",
    category: ["Plumbing Services"],
    specialties: ["Pipe Repair", "Water Damage Assessment"],
    country: "",
    state: "",
    city: "",
    budget: 10000,
};

const page = ({ params }: { params: { id: string } }) => {
    const { id } = params;
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

    const sendRequest = () => {
        toast.success("Request sent");
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
                        Categories: {output_request.category}
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
