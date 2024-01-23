import { useState } from "react";
import "./App.css";
import { publicRoutes } from "./utils/routes";
import Routes from "./components/Routes";
import {
  BrowserRouter,
  Route,
  Routes as RoutesWrapper,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { IUserStateConn, IUserStateNotConn } from "./types/user.types";
import UserContext from "./context/user.context";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [userState, setUserState] = useState<
    IUserStateConn | IUserStateNotConn
  >({
    isConnected: false,
    data: null,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ userState, setUserState }}>
        <BrowserRouter>
          <Routes routes={publicRoutes} />

          <RoutesWrapper>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </RoutesWrapper>
        </BrowserRouter>

        <Toaster />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
