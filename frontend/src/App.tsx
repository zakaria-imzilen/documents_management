import React, { useState } from "react";
import "./App.css";
import { privateRoutes, publicRoutes } from "./utils/routes";
import Routes from "./components/Routes";
import { BrowserRouter, Route, Routes as RoutesWrapper } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { IUserStateConn, IUserStateNotConn } from "./types/user.types";
import UserContext from "./context/user.context";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";

function App() {
  const [userState, setUserState] = useState<
    IUserStateConn | IUserStateNotConn
  >({
    isConnected: false,
    data: null,
  });

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      <BrowserRouter>
        <Routes routes={publicRoutes} />

        <RoutesWrapper>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            {/* <Routes routes={privateRoutes} /> */}
          </Route>

        </RoutesWrapper>
      </BrowserRouter>

      <Toaster />
    </UserContext.Provider>
  );
}

export default App;
