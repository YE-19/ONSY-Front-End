import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const MainNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinkBase = "rounded-3xl px-3 transition-all duration-300 ease-in-out border-2 hover:scale-120 hover:border-onsy-primary focus:outline-none";
  const navLinkActive = "border-[#5AA8B1] "; 

  return (
    <section className='w-full absolute top-0 px-24 h-20 gap-4 flex justify-between items-center backdrop-blur z-20'>
      {/* Logo */}
      <div 
        className='text-[#147E8F] font-labrada text-[48px] font-semibold mx-10 cursor-pointer transition-all duration-300 ease-in-out  hover:scale-110'
        onClick={() => navigate("/")}
      >
        ONSY
      </div>

      {/* Navigation Links */}
      <nav className='links font-medium flex gap-4 items-center'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`
          }
        > 
          Home       
        </NavLink>

        <NavLink 
          to="/Speak" 
          className={({ isActive }) => 
            `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`
          }
        >
          Speak with <span className='text-cyan-800'> ONSY</span> 
        </NavLink>

        <NavLink 
          to="/Dashboard" 
          className={({ isActive }) => 
            `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink 
          to="/E-Motiv" 
          className={({ isActive }) => 
            `${navLinkBase} ${isActive ? navLinkActive : 'border-transparent text-[#111111]'}`
          }
        >
          E-Motiv
        </NavLink>
      </nav>

      {/* Auth Button */}
      <button 
        onClick={() => navigate("/SingIn")}
        className={`h-12 border border-black rounded-xl text-white cursor-pointer w-45.25 font-semibold  transition-all duration-300 ease-in-out  hover:scale-110 ${
          isHomePage ? 'bg-transparent' : 'bg-[#036464E5]'
        }`}
      >
        Log in
      </button>
    </section>
  )
}

export default MainNav