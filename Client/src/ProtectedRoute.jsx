import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export const ProtectedRoute = ({ children }) => {

    const [isValid, setIsValid] = useState(null);
    const token = localStorage.getItem("token");

    const updateIsValid = (bool) => {
        setTimeout(() => {
            setIsValid(bool);
        }, 2500);
    };

    useEffect(() => {
        if (!token) {
            return updateIsValid(false);
        }

        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp < Math.floor(Date.now() / 1000);
            
            if (isExpired) {
                localStorage.removeItem("token"); // Clean up the expired token
                return updateIsValid(false);
            } else {
                return updateIsValid(true);
            }
        } catch (e) {
            return updateIsValid(false);
        }
    }, [token]);

    if (isValid === null) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-2 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-medium animate-pulse">
                    Verifying Credentials
                </span>
            </div>
        );
    }

    return isValid ? children : <Navigate to="/login" replace />;
};