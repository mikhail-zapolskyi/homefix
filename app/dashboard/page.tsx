"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
    const { data: session, status } = useSession();

    if (!session && status === "unauthenticated") {
        throw new Error("You don't have permissions to access this page");
    }

    return <div>Dashboard</div>;
};

export default Dashboard;
