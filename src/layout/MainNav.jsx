import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const MainNav = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
      <>
      <section className=' w-full absolute top-0 px-24 gap-4 flex justify-between items-center flex-row content-between backdrop-blur z-10'>
          <div 
          className='text-[#147E8F]  font-labrada text-[48px] font-semibold mx-10 cursor-pointer'
          onClick={() => navigate("/")}
          >
            ONSY
          </div>
          <nav className='links font-medium flex gap-8' >
            <NavLink to="/"> 
              Home       
            </NavLink>
            <NavLink to="/Speak">
              Speak with <span className='text-cyan-800'> ONSY</span> 
            </NavLink>
            <NavLink to="/Dashboard">
              Dashboard
            </NavLink>
            <NavLink to="/E-Motiv">
              E-Motiv
            </NavLink>
            <NavLink to="/Settings">
              Settings
            </NavLink>
          </nav>
          <button 
          onClick={() => navigate("/SingIn")}
          className={`h-12 border border-black rounded-xl text-white cursor-pointer transition-all w-45.25 ${
          isHomePage 
          ? ' bg-transparent' 
          : ' bg-[#036464E5]'
          }`}
          >
            Log in
          </button>
        </section>
      </>
  )
}

export default MainNav