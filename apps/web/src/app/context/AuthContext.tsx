"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    isLoggedIn: boolean;
    firstName: string;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setFirstName: (firstName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("tkn");
        if (token) {
            axios.get(process.env.NEXT_PUBLIC_BASE_API_URL+"/user-profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setIsLoggedIn(true);
                setFirstName(response.data.data.namaDepan);
            })
            .catch(error => {
                setIsLoggedIn(false);
            });
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, firstName, setIsLoggedIn, setFirstName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
