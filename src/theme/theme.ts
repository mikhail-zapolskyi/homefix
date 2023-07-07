import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
	palette: {
		primary: {
			main: "#009FFD",
		},
		secondary: {
			main: "#837A75",
			light: "#BEB6B2",
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
});

export default theme;
