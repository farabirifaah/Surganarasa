import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Ensure this path matches your project structure

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [sessionTimer, setSessionTimer] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                startSessionTimer();
            } else {
                clearSessionTimer();
            }
        });

        return () => {
            unsubscribe();
            clearSessionTimer();
        };
    }, []);

    const startSessionTimer = () => {
        clearSessionTimer(); // Clear any existing timer
        const timer = setTimeout(() => {
            auth.signOut();
        }, 60 * 60 * 1000); // 30 minutes in milliseconds
        setSessionTimer(timer);
    };

    const clearSessionTimer = () => {
        if (sessionTimer) {
            clearTimeout(sessionTimer);
            setSessionTimer(null);
        }
    };

    const resetSessionTimer = () => {
        startSessionTimer(); // Reset the timer on user activity
    };

    useEffect(() => {
        window.addEventListener('mousemove', resetSessionTimer);
        window.addEventListener('keydown', resetSessionTimer);

        return () => {
            window.removeEventListener('mousemove', resetSessionTimer);
            window.removeEventListener('keydown', resetSessionTimer);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
