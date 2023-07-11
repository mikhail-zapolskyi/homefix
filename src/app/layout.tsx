"use client";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { NavigationBar } from "@/components";
import Providers from "../lib/auth/Providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<NavigationBar />
						<Providers>{children}</Providers>
					</CssBaseline>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
