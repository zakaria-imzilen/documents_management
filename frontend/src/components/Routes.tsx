import React from "react";
import { Route, Routes as RoutesWrapper } from "react-router-dom";

interface IProps {
    routes: {
        id: string;
        path: string;
        element: React.JSX.Element;
    }[];
}

const Routes = ({ routes }: IProps) => {
    return (
        <RoutesWrapper>
            {routes.map((route) => (
                <Route index key={route.id} {...route} />
            ))}
        </RoutesWrapper>
    );
};

export default Routes;
