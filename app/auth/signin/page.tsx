// SIGN IN PAGE

"use client";

import { ViewSignIn } from "@/components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Page = () => {
    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }

    return <ViewSignIn />;
};

export default Page;
