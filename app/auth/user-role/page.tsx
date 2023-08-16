"use client";
import { CustomRadioGroup, PageContainer } from "@/components";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const UserRole = () => {
    const router = useRouter();
    const [value, setValue] = useState("user");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const req = async () =>
                await fetch("http://localhost:3000/api/users", {
                    method: "PUT",
                    body: JSON.stringify({ type: value }),
                });

            toast.promise(req(), {
                pending: "Updating role",
                success: "Role updated successfully!!",
                error: "Something went wrong",
            });

            router.push("/");
        } catch (error) {
            console.error("An error occurred", error);
            toast.error("Something went wrong");
        }
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
                    title="Role"
                    value={value}
                    values={["user", "Pro"]}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </PageContainer>
    );
};

export default UserRole;
