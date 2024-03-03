import React, { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import UserInterface from '@/interfaces/userInterface';
import { useNavigate} from "react-router-dom";

interface AuthContextType {
    user: UserInterface | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const api_base = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()

    useEffect(() => {
        const userItem = sessionStorage.getItem('user');
        if (userItem) {
            setUser(JSON.parse(userItem));
        }
    }, []);

    const login = async ({ username, password }: { username: string; password: string }) => {
        // send post request to /admin/login
        const response = await fetch(`${api_base}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        setUser({ username: data.data.username, token: data.token });
        sessionStorage.setItem('user', JSON.stringify({ username: data.data.username, token: data.token }));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
        // Use Navigate properly
        return navigate("/login")
    };

    const contextValue: AuthContextType = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
