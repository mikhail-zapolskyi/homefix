"use client";

import React from "react";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { FaFacebook } from "react-icons/fa";

const FacebookSigninButtun = () => {
    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl");

    return (
        <Button
            startIcon={<FaFacebook />}
            onClick={() => signIn("facebook", { callBackUrl })}
        >
            Sign in with Facebook
        </Button>
    );
};

export default FacebookSigninButtun;
