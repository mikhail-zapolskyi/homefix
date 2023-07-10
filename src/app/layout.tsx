"use client";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Typography, CssBaseline } from "@mui/material";
import Providers from "../lib/auth/Providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<Typography variant="h1">Testing </Typography>
						<Providers>{children}</Providers>
					</CssBaseline>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
