"use client";

import { ViewResetPassword } from "@/components";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPassword = () => {
    const [token, setToken] = useState("");

    const searchParams = useSearchParams();

    useEffect(() => {
        const hashedToken = searchParams.get("token");

        setToken(hashedToken || "");
    }, [searchParams]);

    return <ViewResetPassword token={token} />;
};

export default ResetPassword;
