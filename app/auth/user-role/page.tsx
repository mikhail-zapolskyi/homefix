"use client";
import { CustomRadioGroup, PageContainer } from "@/components";
import { Box } from "@mui/material";
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
        <PageContainer maxWidth="md">
            <Box
                sx={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CustomRadioGroup
                    title="Please choose the profile you wish to create"
                    value={value}
                    values={["USER", "PRO"]}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </PageContainer>
    );
};

export default UserRole;
