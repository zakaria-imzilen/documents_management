import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./utils/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={Router} />
);
