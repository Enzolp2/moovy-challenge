import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Header = () => {
    const theme = useTheme();
    const location = useLocation(); // Hook do React Router para obter a localização atual
    const [selectedButton, setSelectedButton] = useState("");

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === "/my-library") {
            setSelectedButton("my-library");
        } else if (currentPath === "/search") {
            setSelectedButton("search");
        }
    }, [location]);

    const handleSelection = (buttonName: string) => {
        setSelectedButton(buttonName);
    };

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
            padding: "50px"
            }}>
            <Typography variant="h4" component="div" sx={{
                 color: theme.palette.primary.main,
                 fontWeight: 700,
                 marginRight: "100px",
                }}>
                Moovy
            </Typography>
            <Button 
                color={selectedButton === "my-library" ? "primary" : "inherit"} 
                component={Link}
                to="/my-library"
                onClick={() => handleSelection("my-library")}
                sx={{
                    fontSize: "1.2rem",
                    marginRight: "2rem",
                }}
                >
                My Library
            </Button>
            <Button
                color={selectedButton === "search" ? "primary" : "inherit"} 
                component={Link}
                to="/search"
                onClick={() => handleSelection("search")}
                sx={{
                    fontSize: "1.2rem",
                    marginRight: "2rem",
                }}
                >
                Search
            </Button>
        </Box>
    );
};

export default Header;
