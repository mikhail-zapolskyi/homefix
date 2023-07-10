import { Nunito, PT_Sans } from "next/font/google";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


// Main fonts will be nunito light + pt sans regular

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

const theme = createTheme({
	palette: {
		primary: {
			main: "#009FFD",
			light: "#FBFEF9",
			dark: "#252627"
		},
		secondary: {
			main: "#837A75",
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		fontFamily: [nunito.style.fontFamily, pt.style.fontFamily].join(','),
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
});

export default theme;
