import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#395B64"
        },
        secondary: {
            main: '#A5C9CA'
        },
        dark: {
            main: '#2C3333'
        },
        light: {
            main: '#E7F6F2'
        }
    },
    background: {
        paper: '#E7F6F2',
    }
});

export default theme;