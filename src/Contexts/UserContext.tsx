import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    token: string;
}

interface UserContextType {
    user: User | null;
    login: (user: User, userToken: string) => void;
    logout: () => void;
}

const defaultContext: UserContextType = {
    user: null,
    login: () => { },
    logout: () => { },
};

const UserContext = createContext<UserContextType>(defaultContext);

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const Navigate = useNavigate();

    function login(user: User, userToken: string) {
        const updatedUser = { ...user, token: userToken };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
        Navigate('/');
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data from localStorage', error);
                setUser(null);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext };
