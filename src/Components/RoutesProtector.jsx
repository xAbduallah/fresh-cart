import React, { useContext } from "react";

import { Navigate } from 'react-router-dom';
import { UserContext } from "../Contexts/UserContext"

export default function RoutesProtector(props) {
    const { user } = useContext(UserContext);
    const isAuthenticated = user?.token.length > 64;
    const componentName = props.children?.type?.name;

    
    if (isAuthenticated && (componentName === "Login" || componentName === "Register" || componentName === "Forgetpassword")) {
        return <Navigate to="/" />;
    }

    if (!isAuthenticated && componentName === "ProductDetails") {
        return <Navigate to="/login" />;
    }

    return props.children;
}
