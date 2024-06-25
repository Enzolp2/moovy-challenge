import "./App.css";
import Header from "./components/header/index";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

function App() {
  const theme = useTheme();
  return (
  <Box sx={{
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: 'column',
    minHeight: "100vh",
    }}>
    <Header />
    <Outlet />
  </Box>
  );
}

export default App;