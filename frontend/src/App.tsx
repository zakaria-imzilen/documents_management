import "./App.css";
import { privateRoutes, publicRoutes } from "./utils/routes";
import Routes from "./components/Routes";
import { Route, Routes as RoutesWrapper } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./context/UserProvider";
import ModalProvider from "./context/ModalProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ModalProvider>
          <Routes routes={publicRoutes} />

          <RoutesWrapper>
            <Route path="/" element={<PrivateRoute />}>
              {privateRoutes.map((privateRoute) => (
                <Route key={privateRoute.id} {...privateRoute} />
              ))}
            </Route>
          </RoutesWrapper>

          <Toaster />
        </ModalProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
