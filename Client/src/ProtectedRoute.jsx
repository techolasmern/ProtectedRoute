import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const isValid = decoded.exp * 1000 > Date.now();
            if (!isValid) {
                return <Navigate to="/login" />
            }
            return children;
        } catch (_e) {
            return <Navigate to="/login" />
        } 
    }
    return <Navigate to="/login" />
};