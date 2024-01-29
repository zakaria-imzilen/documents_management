import Login from "../pages/auth/Login";
import Home from "../pages/Home"

export const publicRoutes = [
    {
        id: "login",
        path: "/login",
        element: <Login />
    }
]

export const privateRoutes = [
    {
        id: "home",
        path: "/",
        element: <Home />
    }
]