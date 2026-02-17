import { useState } from "react";
import api from "../../axios";
import { Link } from "react-router";

export const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) return alert("Passwords mismatch");
        try {
            await api.post("/api/auth/signup", formData);
            alert("Account created successfully.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
            {/* Subtle blue ambient glow */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-blue-50/50 to-transparent -z-10" />

            <div className="max-w-md w-full p-12 bg-white border border-blue-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <header className="text-center mb-10">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold">The Collection</span>
                    <h2 className="text-3xl font-serif text-slate-900 mt-2 italic">Create Account</h2>
                </header>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {["name", "email", "password", "confirm_password"].map((field) => (
                        <div key={field} className="relative group">
                            <input
                                type={field.includes("password") ? "password" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field.replace("_", " ").toUpperCase()}
                                className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all duration-500 text-xs tracking-widest"
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full mt-8 bg-blue-600 py-4 px-6 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">
                            Join the Circle
                        </span>
                    </button>
                </form>

                <footer className="mt-10 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                        Already a member? <Link to="/login" className="text-blue-500 font-bold ml-1">Sign In</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};