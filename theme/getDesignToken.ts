/**
 * Usage:
 *
 * 1. Import `getDesignToken` from this module.
 *
 * Example:
 *
 * ```javascript
 * import getDesignToken from './path-to-this-module';
 * ```
 *
 * 2. Call `getDesignToken` function with a `mode` argument to get the design tokens for either light or dark mode.
 *
 * Example:
 *
 * ```javascript
 * const lightModeTokens = getDesignToken('light');
 * const darkModeTokens = getDesignToken('dark');
 * ```
 *
 * 3. Use the design tokens in your Material-UI theme configuration.
 *
 * Example:
 *
 * ```javascript
 * import { createTheme } from '@mui/material/styles';
 *
 * const lightTheme = createTheme(lightModeTokens);
 * const darkTheme = createTheme(darkModeTokens);
 *
 * // Use the themes in your Material-UI application
 * ```
 *
 * Note: This module provides design tokens for both light and dark modes, making it easy to customize the Material-UI theme for your application.
 *
 * @module DesignToken
 */

import { PaletteMode, Shadows } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";

const nunitoFontFamily = '"Nunito", sans-serif';
const ptFontFamily = '"PT Sans", sans-serif';

declare module "@mui/material/styles" {
    interface Palette {
        star: PaletteColor;
        exellent: PaletteColor;
        very_good: PaletteColor;
        good: PaletteColor;
        fair: PaletteColor;
        poor: PaletteColor;
        bad: PaletteColor;
    }

    interface PaletteOptions {
        star: SimplePaletteColorOptions;
        exellent: SimplePaletteColorOptions;
        very_good: SimplePaletteColorOptions;
        good: SimplePaletteColorOptions;
        fair: SimplePaletteColorOptions;
        poor: SimplePaletteColorOptions;
        bad: SimplePaletteColorOptions;
    }

    interface PaletteColor {
        lighter?: string;
        darker?: string;
    }

    interface SimplePaletteColorOptions {
        lighter?: string;
        darker?: string;
    }
}

const getDesignToken = (mode: PaletteMode) => ({
    palette: {
        primary: {
            main: "#00A76F",
            lighter: "#DEF1E3",
            light: "#5BE49B",
            dark: "#007867",
            darker: "#004B50",
            contrastText: "#FBFEF9",
        },
        secondary: {
            main: "#8E33FF",
            lighter: "#EFD6FF",
            light: "#C684FF",
            dark: "#5119B7",
            darker: "#27097A",
            contrastText: "#FBFEF9",
        },
        success: {
            main: "#22C55E",
            lighter: "#D3FCD2",
            light: "#77ED8B",
            dark: "#118D57",
            darker: "#065E49",
            contrastText: "#fff",
        },
        info: {
            main: "#00B8D9",
            lighter: "#CAFDF5",
            light: "#61F3F3",
            dark: "#006C9C",
            darker: "#003768",
            contrastText: "#fff",
        },
        warning: {
            main: "#FFAB00",
            lighter: "#FFF5CC",
            light: "#FFD666",
            dark: "#B76E00",
            darker: "#7A4100",
            contrastText: "#fff",
        },
        error: {
            main: "#FF5630",
            lighter: "#FFE9D5",
            light: "#FFAC82",
            dark: "#B71D18",
            darker: "#7A0916",
            contrastText: "#fff",
        },
        star: {
            main: "#FAC30F",
        },

        exellent: { main: "#229B00" },
        very_good: { main: "#62B500" },
        good: { main: "#A5D742" },
        fair: { main: "#FFDD00" },
        poor: { main: "#FF5733" },
        bad: { main: "#FF0000" },

        mode,
        ...(mode === "light"
            ? {
                  text: {
                      primary: "#252627",
                      secondary: "#424242",
                  },
                  background: {
                      default: "#FAFAFA",
                      paper: "#FAFAFA",
                  },
              }
            : {
                  divider: "#004282",
                  text: {
                      primary: "#F8F8F8",
                      secondary: "#E7E4E4",
                  },
                  background: {
                      default: "#272727",
                      paper: "#272727",
                  },
              }),
    },
    typography: {
        fontFamily: [nunitoFontFamily, ptFontFamily].join(","),
        h1: {
            fontFamily: ptFontFamily,
            fontWeight: 200,
            fontSize: "1.625rem",
        },
        h2: {
            fontFamily: ptFontFamily,
            fontWeight: 600,
            fontSize: "1.375rem",
        },
        h3: {
            fontFamily: nunitoFontFamily,
            fontWeight: 700,
            fontSize: "1.2rem",
        },
        h4: {
            fontFamily: nunitoFontFamily,
            fontWeight: 300,
        },
        h5: {
            fontFamily: nunitoFontFamily,
            fontWeight: 300,
        },
        h6: {
            fontFamily: nunitoFontFamily,
            fontWeight: 300,
        },
        subtitle1: {
            fontFamily: ptFontFamily,
            fontSize: "1.825rem",
            fontWeight: 400,
        },
        subtitle2: {
            fontFamily: ptFontFamily,
            fontWeight: 400,
        },
        body1: {
            fontFamily: nunitoFontFamily,
            fontSize: "1.1rem",
            fontWeight: 500,
        },
        body2: {
            fontFamily: nunitoFontFamily,
            fontWeight: 700,
        },
        button: {
            fontFamily: nunitoFontFamily,
            fontWeight: 900,
        },
        caption: {
            fontFamily: ptFontFamily,
            fontSize: "1rem",
            fontWeight: 800,
        },
        overline: {
            fontFamily: ptFontFamily,
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
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    fontSize: "1rem",
                },
            },
        },
    },
});

export default getDesignToken;
