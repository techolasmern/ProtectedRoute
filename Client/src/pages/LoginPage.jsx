import { useState } from "react";
import api from "../../axios";
import { useNavigate, Link } from "react-router";

export const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/api/auth/login", formData);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Access Denied.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
            <div className="absolute top-0 right-0 w-full h-1/2 bg-linear-to-b from-blue-50/50 to-transparent -z-10" />

            <div className="max-w-md w-full p-12 bg-white border border-blue-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <header className="text-center mb-10">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold">Welcome Back</span>
                    <h2 className="text-3xl font-serif text-slate-900 mt-2 italic">Client Portal</h2>
                </header>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all duration-500 text-xs tracking-widest"
                        required
                    />

                    <div className="space-y-2">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="PASSWORD"
                            className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all duration-500 text-xs tracking-widest"
                            required
                        />
                        <div className="flex justify-end">
                            <button type="button" className="text-[9px] uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors">
                                Recover Access
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-600 py-4 px-6 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-100 active:scale-[0.98]"
                    >
                        <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">
                            Authenticate
                        </span>
                    </button>
                </form>

                <footer className="mt-10 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">
                        Request an account? <Link to="/signup" className="text-blue-500 font-bold ml-1">Join Now</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};