"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { CustomButton } from "@/components";

const GoogleSigninButtun = () => {
    return (
        <CustomButton
            text="Sign in with Google"
            startIcon={<FcGoogle />}
            fullWidth
            onClick={() => signIn("google")}
        />
    );
};

export default GoogleSigninButtun;
