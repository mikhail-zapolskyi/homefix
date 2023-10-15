"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const GoogleSigninButtun = () => {
    return (
        <Button startIcon={<FcGoogle />} onClick={() => signIn("google")}>
            Sign in with Google
        </Button>
    );
};

export default GoogleSigninButtun;
