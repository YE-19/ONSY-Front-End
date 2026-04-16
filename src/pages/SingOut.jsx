import React, { useState } from 'react'
import myImage from '../assets/mint-backg.jpg';
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
        <div 
            style={{ backgroundImage: `url(${myImage})` }} 
            className="min-h-screen flex items-center justify-center text-white p-4 bg-cover bg-center"
        >
            <div 
                style={{ backgroundImage: `url(${myImage})` }} 
                className="max-w-md mx-auto shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold p-10 bg-white/20 backdrop-blur-sm"
            >
                <h2 className="text-[32px] font-bold mt-0 text-[#111111] leading-tight ">
                    To confirm log out
                </h2>
                <p className="text-[#5F5F5F] font-semibold text-xl ">
                    Some data may be lost after logging out
                </p>
                <button 
                    onClick={handleLogout}
                    className='bg-[#036464E5] text-white font-bold h-14 w-40 rounded-[10px] mx-auto mt-4 hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#be5b5b] transition-all duration-300 ease-in-out cursor-pointer'
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default SingOut;