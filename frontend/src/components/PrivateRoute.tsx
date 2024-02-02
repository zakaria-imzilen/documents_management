import { useContext, useEffect } from "react";
import userContext from "../context/user.context";
import { Navigate } from "react-router-dom";
import useSocketConn from "../hooks/useSocketConn";
import SocketContext from "../context/socket.context";
import { useQuery } from "@tanstack/react-query";
import { User_Login } from "../utils/api";
import toast from "react-hot-toast";
import Layout from "./Layout";

const PrivateRoute = () => {
    const consumingUserContext = useContext(userContext);
    if (!consumingUserContext) throw new Error("User Context not provided");

    const { userState, setUserState } = consumingUserContext;

    const { isLoading, error, data } = useQuery({
        queryKey: ["login_token"],
        queryFn: User_Login,
    });

    useEffect(() => {
        toast.promise(User_Login(), {
            loading: "Logging in...",
            success: "Welcome back",
            error: "Session expired!",
        });
    }, []);

    useEffect(() => {
        if (data) setUserState({ isConnected: true, data: data.user });
    }, [data]);

    const socketConnection = useSocketConn();
    if (userState.isConnected)
        return (
            <SocketContext.Provider value={socketConnection}>
                <Layout />
            </SocketContext.Provider>
        );

    if (isLoading) {
        return null;
    }

    if (data) return null;

    if (error) return <Navigate to={"/login"} />;
};

export default PrivateRoute;
