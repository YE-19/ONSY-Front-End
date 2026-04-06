import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero5 = () => {

  const Navigate = useNavigate

  return (
      <section className='w-full h-80 bg-[#147E8F] relative overflow-hidden content-center'>
        <span className='w-125 h-125 bg-[#FFFFFF73] blur-[250px] rounded-full  absolute  right-304 '></span>
        <span className='w-125 h-125 bg-[#FFFFFF73] blur-[250px] rounded-full  absolute left-304'></span>   
        <div className=' px-60 flex flex-col items-center gap-16'>
          <h2 className='text-5xl font-bold font-labrada text-white text-center'>You're not alone. Let's talk With <span className='text-black text-6xl'>ONSY.</span> </h2>
          <div className='flex text-2xl font-bold gap-10'>
            <button 
            className='w-84 h-16 rounded-2xl bg-[#036464E5] shadow-[0_0_15px_3px_#FFFFFF80] cursor-pointer'
            onClick={Navigate("/SingIn")}
            >
              Sign Up
            </button>
            <button 
            className='w-84 h-16 rounded-2xl text-white border border-[#111111] cursor-pointer'
            onClick={Navigate("/SingUp")}
            >
              Long In
            </button>
          </div>
        </div>
      </section>
  )
}

export default Hero5