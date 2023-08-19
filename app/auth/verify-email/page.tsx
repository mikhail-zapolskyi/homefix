"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const hashedToken = searchParams.get("token");

        if (hashedToken) {
            const verifyUserEmail = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:3000/api/users/verify-email",
                        {
                            method: "POST",
                            body: JSON.stringify(hashedToken),
                        }
                    );

                    if (response.ok) {
                        toast.success("Email verified successfully!");
                        setVerified(true);
                        router.push("/auth/signin");
                    } else {
                        console.error("Verification failed");
                        toast.error("Email verification failed");
                        router.push("/");
                    }
                } catch (error) {
                    console.error("An error occurred", error);
                    toast.error("Something went wrong");
                }
            };

            verifyUserEmail();
        }
    }, [searchParams, router]);

    return (
        <div>
            {!verified ? (
                <h1>Verifying Email...</h1>
            ) : (
                <h1>Redirecting to sign in page</h1>
            )}
        </div>
    );
};

export default VerifyEmail;
