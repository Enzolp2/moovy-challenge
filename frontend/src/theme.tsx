// theme.tsx

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        background: {
            default: "#DCE0E2", // --background-color
        },
        primary: {
            main: "#F2911B", // --main-color
            light: "hsl(34, 100%, 87%)", // --main-light
            dark: "hsl(34, 100%, 47%)" // --main-dark
        },
        text: {
            primary: "hsl(0, 0%, 10%)", // Dark text
            secondary: "hsl(0, 0%, 50%)" // Light text
        },
        success: {
            main: "#0ACF83", // --green-color
        },
        error: {
            main: "#FE6D8E" // --red-color
        },
        warning: {
            main: "#FCC419" // --yellow-color
        },
    },
});

export default theme;
