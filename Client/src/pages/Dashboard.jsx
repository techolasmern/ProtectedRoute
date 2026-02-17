import { useNavigate } from "react-router";

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
            <nav className="bg-white/80 backdrop-blur-md border-b border-blue-50 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold italic font-serif">C</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900">
                            The Collection
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-blue-600 transition-colors duration-300"
                    >
                        Sign Out
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-8 py-16">
                <div className="relative p-12 bg-white rounded-3xl border border-blue-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />

                    <div className="relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-blue-500 font-semibold">
                            Member Access Verified
                        </span>
                        <h1 className="text-5xl font-serif italic text-slate-900 mt-4 mb-6 tracking-tighter">
                            Welcome back, Distinguished Guest
                        </h1>
                        <p className="max-w-lg text-slate-500 leading-relaxed text-sm tracking-wide">
                            Your profile is currently active within the inner circle. Explore your
                            exclusive dashboard and manage your private preferences.
                        </p>

                        <div className="mt-10 flex space-x-4">
                            <button className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-slate-200">
                                View Portfolio
                            </button>
                            <button className="border border-slate-200 text-slate-900 text-[10px] uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-full hover:bg-slate-50 transition-all duration-500">
                                Settings
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-48 border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 uppercase tracking-widest text-[9px]">
                            Premium Content Block {item}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};