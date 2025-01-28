import React, { useContext } from "react";

import { Navigate } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext"

export default function RoutesProtector({ children, routeName }) {
    const { user } = useContext(UserContext);
    const isAuthenticated = user?.token.length > 64;

    console.log("Current routeName:", routeName);

    if (isAuthenticated && ["login", "register", "forgetpassword"].includes(routeName)) {
        return <Navigate to="/" />;
    }
    
    if (!isAuthenticated && routeName === "productdetails") {
        return <Navigate to="/login" />;
    }

    return children;
}
