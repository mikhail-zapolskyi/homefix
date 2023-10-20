"use client";
import { AuthContainer, CustomRadioGroup, PageContainer } from "@/components";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const UserRole = () => {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [value, setValue] = useState("USER");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { type: value, serviceProfile: { create: {} } };

        try {
            toast.promise(axios.put("/api/users", data), {
                success: {
                    render({ data }) {
                        if (data) {
                            updateSession({
                                name: data.data.name,
                                image: data.data.image,
                                type: data.data.type,
                            });
                        }
                        router.push("/dashboard");
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const updateSession = (user: Record<string, any>) => {
        update({
            ...session,
            user,
        });
    };

    return (
        <AuthContainer>
            <Typography component="h1" variant="h5" sx={{ padding: "1rem" }}>
                Please choose the profile you wish to create
            </Typography>
            <Box sx={{ padding: "1rem" }}>
                <CustomRadioGroup
                    value={value}
                    values={["USER", "PRO"]}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </AuthContainer>
    );
};

export default UserRole;
