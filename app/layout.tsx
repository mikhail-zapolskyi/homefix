"use client";

import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import Providers from "@/lib/auth/Providers";
import { AppBar } from "@/components";
import getDesignToken from "@/theme/getDesignToken";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<PaletteMode>("light");
    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );
    const theme = useMemo(() => createTheme(getDesignToken(mode)), [mode]);

    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <Providers>
                            <ToastContainer />
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
