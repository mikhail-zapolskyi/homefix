"use client";

import { CustomButton, PageContainer } from "@/components";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <PageContainer maxWidth="md">
            <Box
                sx={{
                    height: "80%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Typography component="h1" variant="h4">
                    {error.message || "Something went wrong!"}
                </Typography>
                <CustomButton text="Try again" onClick={() => reset()} />
                <Link href="/">Go back home</Link>
            </Box>
        </PageContainer>
    );
};

export default Error;
