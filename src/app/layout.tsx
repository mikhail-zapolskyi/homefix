"use client";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Providers from "../lib/auth/Providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<Typography variant="h1">Testing </Typography>
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
