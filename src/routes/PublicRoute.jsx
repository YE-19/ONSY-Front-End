import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/cookieUtils';
import myImage from '../assets/mint-backg.jpg';

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  if (token) {
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
            You are already logged in!
          </h2>
          <div className='flex items-center  gap-3 mt-1'>
            <p className="text-[#5F5F5F] font-semibold text-xl">Taking you home…</p>
            <svg className="h-6 w-6 animate-spin text-[#036464E5]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
              <path d="M2 12a10 10 0 0110-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  return children;
};

export default PublicRoute;