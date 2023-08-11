"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const hashedToken = searchParams.get("token");

        setToken(hashedToken || "");
    }, [searchParams]);

    useEffect(() => {
        if (token.length > 0) {
            const verifyUserEmail = async () => {
                try {
                    await fetch(
                        "http://localhost:3000/api/users/verify-email",
                        {
                            method: "POST",
                            body: JSON.stringify(token),
                        }
                    );
                    setVerified(true);
                } catch (error: any) {
                    console.log(error);
                }
            };
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div>
            {!verified ? (
                <h1>Verifying Email...</h1>
            ) : (
                <h1>Email Verified Succussfully</h1>
            )}
            {!verified ? (
                <p>{token}</p>
            ) : (
                <Link href="signin">Go to signin page</Link>
            )}
        </div>
    );
};

export default VerifyEmail;
