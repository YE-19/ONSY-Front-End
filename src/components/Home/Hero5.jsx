import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero5 = () => {

  const navigate = useNavigate();

  return (
      <section className='w-full h-auto py-20 lg:py-0 lg:h-80 bg-[#147E8F] relative overflow-hidden flex items-center justify-center lg:content-center'>
        
        <span className='hidden lg:block w-125 h-125 bg-[#FFFFFF73] blur-[250px] rounded-full absolute lg:right-304 '></span>
        <span className='hidden lg:block w-125 h-125 bg-[#FFFFFF73] blur-[250px] rounded-full absolute lg:left-304'></span>   
        
        <div className='px-6 lg:px-60 flex flex-col items-center gap-10 lg:gap-16 z-10'>
          
          <h2 className='text-3xl lg:text-5xl font-bold font-labrada text-[#FEFDFE] text-center leading-tight'>
            You're not alone. Let's talk With <span className='text-4xl lg:text-6xl text-[#111111]'>ONSY.</span> 
          </h2>

          <div className='flex flex-col lg:flex-row text-xl lg:text-2xl font-bold gap-6 lg:gap-10 w-full items-center justify-center'>
            <button 
              className='w-full max-w-[336px] lg:w-84 h-16 rounded-2xl bg-[#036464E5] text-[#111111] shadow-[0_0_15px_3px_#FFFFFF80] cursor-pointer transition-all duration-300 ease-in-out hover:scale-105'
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </button>
            <button 
              className='w-full max-w-[336px] lg:w-84 h-16 rounded-2xl text-white border border-[#111111] cursor-pointer transition-all duration-300 ease-in-out hover:scale-105'
              onClick={() => navigate("/SignIn")}
            >
              Log In
            </button>
          </div>
        </div>
      </section>
  )
}

export default Hero5