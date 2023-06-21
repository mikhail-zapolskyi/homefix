"use client";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import ProvidersWrappers from "../lib/Auth/ProvidersWrappers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<ProvidersWrappers>{children}</ProvidersWrappers>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
