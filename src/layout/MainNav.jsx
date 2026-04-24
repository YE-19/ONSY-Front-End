import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../utils/cookieUtils';

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSpeakPage = location.pathname === '/Speak';

  const navLinkBase = "rounded-3xl px-3 transition-all duration-300 ease-in-out border-2 hover:scale-120 hover:border-onsy-primary focus:outline-none";
  const navLinkActive = "border-[#5AA8B1] "; 

  const isAuthenticated = !!getToken(); 

  const handleAuthAction = () => {
    if (isAuthenticated) {
      navigate("/SignOut"); 
    } else {
      navigate("/SignIn");
    }
  };

  return (
    <section className={`w-full absolute top-0 px-6 lg:px-24 h-20 flex justify-between items-center backdrop-blur z-50 border-b border-b-[#d4c7c7a9] ${isSpeakPage ? 'hidden h-0' : ''}`}>
      
      {/* 1. Logo (On the Left) */}
      <div 
        className='text-[#147E8F] font-labrada text-[30px] lg:text-[48px] font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 z-50'
        onClick={() => { navigate("/"); setIsOpen(false); }}
      >
        ONSY
      </div>

      {/* 2. Hamburger Button (In the Absolute Center) */}
      <div className='lg:hidden absolute left-1/2 -translate-x-1/2 z-50'>
        <button onClick={() => setIsOpen(!isOpen)} className='flex flex-col gap-1.5 focus:outline-none p-2'>
          <span className={`h-1 w-8 bg-[#147E8F] rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
          <span className={`h-1 w-8 bg-[#147E8F] rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-1 w-8 bg-[#147E8F] rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </button>
      </div>

      {/* 3. Desktop Navigation Links (Hidden on Mobile) */}
      <nav className='links font-medium hidden lg:flex gap-4 items-center'>
        <NavLink to="/" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`}> Home </NavLink>
        <NavLink to="/Speak" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`}> Speak with <span className='text-cyan-800'> ONSY</span> </NavLink>
        <NavLink to="/Dashboard" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`}> Dashboard </NavLink>
        <NavLink to="/EMotiv" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`}> E-Motiv </NavLink>
        <NavLink to="/Mood" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`}> Mood </NavLink>
      </nav>

      {/* 4. Auth Button (On the Right) */}
      <div className='z-50'>
        <button 
          onClick={handleAuthAction}
          className={`h-10 lg:h-12 border border-black rounded-xl lg:text-white text-black cursor-pointer px-4 lg:w-45.25 font-semibold transition-all duration-300 ease-in-out hover:scale-110 ${
            isHomePage ? 'bg-transparent text-black' : 'bg-[#036464E5] text-white'
          }`}
        >
          {isAuthenticated ? "Log out" : "Log in"}
        </button>
      </div>

      {/* 5. Mobile Dropdown Menu (Slides from Top) */}
      <div className={`
        absolute top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center gap-4 pt-24 pb-10
        lg:hidden z-40
        ${isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `${navLinkBase} w-[80%] text-center py-2 ${isActive ? navLinkActive : 'border-transparent'}`}> Home </NavLink>
        <NavLink to="/Speak" onClick={() => setIsOpen(false)} className={({ isActive }) => `${navLinkBase} w-[80%] text-center py-2 ${isActive ? navLinkActive : 'border-transparent'}`}> Speak with ONSY </NavLink>
        <NavLink to="/Dashboard" onClick={() => setIsOpen(false)} className={({ isActive }) => `${navLinkBase} w-[80%] text-center py-2 ${isActive ? navLinkActive : 'border-transparent'}`}> Dashboard </NavLink>
        <NavLink to="/EMotiv" onClick={() => setIsOpen(false)} className={({ isActive }) => `${navLinkBase} w-[80%] text-center py-2 ${isActive ? navLinkActive : 'border-transparent'}`}> E-Motiv </NavLink>
        <NavLink to="/Mood" onClick={() => setIsOpen(false)} className={({ isActive }) => `${navLinkBase} w-[80%] text-center py-2 ${isActive ? navLinkActive : 'border-transparent'}`}> Mood </NavLink>
      </div>

    </section>
  )
}

export default MainNav