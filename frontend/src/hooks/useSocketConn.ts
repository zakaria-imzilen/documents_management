import { useEffect, useState } from "react"
import { apiBaseURL } from "../utils/api";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

export default () => {
    const socketIO = io("http://localhost:5001");
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

    useEffect(() => {
        socketIO.on("connect", () => {
            setIsSocketConnected(true)
            console.log("✅ Socket Connected Successfuly");
            toast.success("✅ Real-time server is connected Successfuly")
        });

        socketIO.on("connect_error", (err) => {
            // the reason of the error, for example "xhr poll error"
            console.log(err.message);
        });

        () => socketIO.off("connect");
    }, []);


    return { isSocketConnected, socketIO };
}