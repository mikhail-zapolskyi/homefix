"use client";

import theme from "@/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Providers from "@/lib/auth/Providers";
import { AppBar } from "@/components";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <Providers>
                            <AppBar />
                            {children}
                        </Providers>
                    </CssBaseline>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
