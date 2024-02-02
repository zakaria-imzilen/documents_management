import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import App from "../App";

export const publicRoutes = [
    {
        id: "login",
        path: "/login",
        element: <Login />,
    },
];

export const privateRoutes = [
    {
        id: "home",
        path: "/",
        element: <Home />,
    },
];

export const Router = createBrowserRouter(
    createRoutesFromElements(<Route path="*" element={<App />} />)
);
