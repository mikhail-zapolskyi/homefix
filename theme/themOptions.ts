import { red } from "@mui/material/colors";
import { PaletteMode, Shadows } from "@mui/material";
import { Nunito, PT_Sans } from "next/font/google";

declare module "@mui/material/styles" {
    interface Palette {
        neutral: Palette["primary"];
    }
    interface PaletteOptions {
        neutral: PaletteOptions["primary"];
    }
}

declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides {
        neutral: true;
    }
}

declare module "@mui/material/ToolBar" {
    interface ToolBarPropsColorOverrides {
        neutral: true;
    }
}

export const nunito = Nunito({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const pt = PT_Sans({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const themeOptions = {
    palette: {
        mode: "light" as PaletteMode,
        primary: {
            main: "#009FFD",
            light: "#FBFEF9",
            dark: "#252627",
        },
        secondary: {
            main: "#837A75",
        },
        neutral: {
            main: "#ffffff",
            contrastText: "#000000",
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: [nunito.style.fontFamily, pt.style.fontFamily].join(","),
        h1: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 300,
        },
        h2: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 300,
        },
        h3: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 300,
        },
        h4: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 300,
        },
        h5: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 300,
        },
        h6: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 300,
        },
        subtitle1: {
            fontFamily: pt.style.fontFamily,
            fontWeight: 400,
        },
        subtitle2: {
            fontFamily: pt.style.fontFamily,
            fontWeight: 400,
        },
        body1: {
            fontFamily: pt.style.fontFamily,
            fontWeight: 400,
        },
        body2: {
            fontFamily: pt.style.fontFamily,
            fontWeight: 400,
        },
        button: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 700,
        },
        caption: {
            fontFamily: pt.style.fontFamily,
            fontWeight: 400,
        },
        overline: {
            fontFamily: pt.style.fontFamily,
            fontWeight: 400,
        },
    },
    shadows: [
        "none",
        "box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
        "box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
        "box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",
        "box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;",
        "box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;",
        ...Array(19).fill("none"),
    ] as Shadows,
};
