import React, { useState } from 'react'
import { removeToken } from '../utils/cookieUtils';
import { useNavigate } from "react-router-dom";
import Loading from './Loading';
import { logoutUserApi } from '../services/authService';

const SingOut = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutUserApi(); 
            removeToken(); 
            toast.success("Logged out successfully");
            setTimeout(() => {
                navigate("/"); 
            }, 1500);
        } catch (err) {
            removeToken();
            navigate("/");
            console.error("Signout error:", err);
        }
    };

    if (loading) {
        return (
            <Loading 
                head={"You're now logged out."}
                prag={"Taking you home…"} 
            />
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 p-4 transition-colors duration-300">
            <div className="max-w-md w-full mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/60 p-10 flex flex-col gap-5">
                <div className="text-teal-600 dark:text-teal-400 font-labrada text-4xl font-bold text-center">ONSY</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 leading-tight text-center">
                    Confirm log out
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg text-center">
                    Some data may be lost after logging out
                </p>
                <div className="flex gap-4 mt-2">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold hover:from-red-600 hover:to-rose-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 cursor-pointer"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SingOut;