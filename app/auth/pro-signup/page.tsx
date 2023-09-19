"use client";

import { ViewProSignUp } from "@/components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignUp() {
    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }

    return <ViewProSignUp />;
}
