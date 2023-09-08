import { PaletteMode, Shadows } from "@mui/material";
import { Nunito, PT_Sans } from "next/font/google";
import { Typography } from "@mui/material/styles/createTypography";

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

const getDesignToken = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  primary: {
                      main: "#009FFD",
                      light: "#62C5FF",
                      dark: "#01629A",
                      contrastText: "#FBFEF9",
                  },
                  secondary: {
                      main: "#837A75",
                      light: "#BFB5AC",
                      dark: "#4F4A46",
                      contrastText: "#FBFEF9",
                  },
                  text: {
                      primary: "#252627",
                      secondary: "#424242",
                  },
                  background: {
                      default: "#FAFAFA",
                      paper: "#FAFAFA",
                  },
                  warning: {
                      main: "#FF6663",
                      light: "#FF7977",
                      dark: "#F34E4B",
                      contrastText: "#fff",
                  },
                  success: {
                      main: "#7DCE82",
                      light: "#85C489",
                      dark: "#58B35E",
                      contrastText: "#fff",
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: "#dbf4ff",
                  },
                  divider: "#004282",
                  text: {
                      primary: "#F8F8F8",
                      secondary: "#E7E4E4",
                  },
                  background: {
                      default: "#272727",
                      paper: "#272727",
                  },
                  warning: {
                      main: "#FF6663",
                      light: "#FF7977",
                      dark: "#F34E4B",
                      contrastText: "#fff",
                  },
                  success: {
                      main: "#7DCE82",
                      light: "#85C489",
                      dark: "#58B35E",
                      contrastText: "#fff",
                  },
              }),
    },
    typography: {
        fontFamily: [nunito.style.fontFamily, pt.style.fontFamily].join(","),
        h1: {
            fontFamily: nunito.style.fontFamily,
            fontWeight: 400,
            fontSize: "2.5rem",
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
            fontSize: 18
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
            fontFamily: nunito.style.fontFamily,
            fontWeight: 400,
        },
        body2: {
            fontFamily: nunito.style.fontFamily,
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
    } as Typography,
    shadows: [
        "none",
        "0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
        "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)",
        "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "0px 2px 5px 0px rgba(50, 50, 105, 0.15), 0px 1px 1px 0px rgba(0, 0, 0, 0.05)",
        "0px 0.0625em 0.0625em rgba(0, 0, 0, 0.25), 0px 0.125em 0.5em rgba(0, 0, 0, 0.25), 0px 0px 0px 1px inset rgba(255, 255, 255, 0.1)",
        ...Array(19).fill("none"),
    ] as Shadows,
});

export default getDesignToken;
