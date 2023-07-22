"use client";

import { UserAccount, UserServices } from "@/components/index";
export const UserDashboard = () => {
    return (
        <div>
            <UserAccount />
            <UserServices />
        </div>
    );
};

export default UserDashboard;
