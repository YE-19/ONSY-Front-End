import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero1 = () => {

  const navigate = useNavigate();

  return (
    <section className=" pt-20 position-absolute top-0 bg-hero bg-cover bg-center h-screen w-full">
        <div className='m-30 flex gap-4 flex-col'>
         <h1 className=' text-[80px] font-medium w-147 h-72 leading-24 font-Gabarito text-6xl bg-linear-to-br from-[#020103] via-onsy-primary to-onsy-secondary bg-clip-text text-transparent animate-text-flow'>Ai That Helps Your Mental Health </h1>
          <p className='font-medium mt-8 text-[24px]'>Open up, express your feelings, and get AI <br></br>support to understand emotions, reduce stress, <br></br>and build a healthier mindset.</p>
          <button onClick={() => navigate("/SignUp")} className='cursor-pointer w-45 h-12 bg-[#036464E5] text-[#111111] rounded-xl font-semibold text-[#FFFFFF] transition-all duration-300 ease-in-out  hover:scale-110'>Get Started</button>
      </div>
      </section>
  )
}

export default Hero1