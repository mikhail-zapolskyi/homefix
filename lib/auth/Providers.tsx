// Session provider to wrap the app in to make session data available globally.

"user client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
