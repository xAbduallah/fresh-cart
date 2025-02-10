import React, { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { UserContext } from "../../Contexts/UserContext";
import { GlobalContext } from "../../Contexts/GlobalContext";

export default function RoutesProtector({ children, routeName }) {
    const { authenticated } = useContext(UserContext);
    const { loginRedirection } = useContext(GlobalContext);

    if (authenticated && routeName === "login") {
        if (loginRedirection)
            return <Navigate to={loginRedirection} />;
    }

    if (authenticated && ["login", "register", "forgetpassword"].includes(routeName)) {
        return <Navigate to="/" />;
    }

    const shouldLogin = ["cart", "checkout", "allorders"].includes(routeName);
    if (shouldLogin && !authenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
