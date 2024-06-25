import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/home"
import Library from "../pages/library"
import Search from "../pages/search"
import App from "../App"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home />},
            { path: "search", element: <Search />},
            { path: "my-library", element: <Library />},
        ]
    },

])