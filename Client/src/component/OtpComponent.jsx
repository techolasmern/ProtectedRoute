import { useState } from "react";
import api from "../../axios";

export const OtpComponent = ({ email, callback }) => {

    const [formData, setFormData] = useState({
        email,
        otp: 0
    })

    const handleChange = e => {
        setFormData(prev => ({ ...prev, otp: parseFloat(e.target.value) }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await api.post("/api/mail/otp/verify", formData);
            if (response.data.ok) {
                callback();
            }
        } catch (e) {
            console.log(e.response || e.message);
        }
    }

    return <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
        <div className="absolute top-0 right-0 w-full h-1/2 bg-linear-to-b from-blue-50/50 to-transparent -z-10" />

        <div className="max-w-md w-full p-12 bg-white border border-blue-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <header className="text-center mb-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold">Welcome Back</span>
                <h2 className="text-3xl font-serif text-slate-900 mt-2 italic">Client Portal (OTP)</h2>
            </header>

            <form className="space-y-8" onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="otp"
                    value={formData.otp == 0 ? "" : String(formData.otp)}
                    onChange={handleChange}
                    placeholder="ENTER OTP"
                    className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all duration-500 text-xs tracking-widest"
                    required
                />

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 py-4 px-6 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-100 active:scale-[0.98]"
                >
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white">
                        VERIFY
                    </span>
                </button>
            </form>

           
        </div>
    </div>
};