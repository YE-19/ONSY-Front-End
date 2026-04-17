import React from 'react'
import icon1 from '../../assets/Frame 55 1.png';
import icon2 from '../../assets/Frame 55 2.png'; 
import icon3 from '../../assets/Frame 55 3.png';

const Hero2 = () => {
  return (
    <section className='pt-12 px-10 h-148.25 bg-[#FEFDFE]'>
        <h1 className='font-semibold text-[48px] text-center mb-2'>How It Works </h1>
        <p className='text-[#5F5F5F] text-center mb-7'>
          ONSY uniquely combines AI conversation, behavioral  <br></br>tracking, and biometric brainwave data to give you the <br></br> deepest self-understanding possible.
          </p> 
          <div className='flex flex-row items-center justify-around px-14 mb-20'>
            <div className='w-94.5 h-62 border-[0.5px] border-onsy-primary py-6 px-14 flex flex-col rounded-xl content-center items-center gap-3  transition-all duration-300 ease-in-out  hover:-translate-y-2'>
            <img src={icon1} alt="Icon 1" className=" w-12 h-12" />
              <h3 className='font-semibold text-2xl -mt-2 text-[#111111] '>1.Talk to ChatBot</h3>
              <p className='text-[#5F5F5F] text-center'>Chat about your day, vent, or reflect in a safe, private space designed to understand your tone.</p>
            </div>
            <div className='w-94.5 h-62 border-[0.5px] border-onsy-primary py-6 px-14 flex flex-col rounded-xl content-center items-center gap-3  transition-all duration-300 ease-in-out  hover:-translate-y-2'>
            <img src={icon2} alt="Icon 2" className=" w-12 h-12" />
              <h3 className='font-semibold text-2xl -mt-2 text-[#111111] '>2. Track your mood</h3>
              <p className='text-[#5F5F5F] text-center'>Our AI analyzes sentiment and emotional patterns over time seamlessly in the  background.</p>
            </div>
            <div className='w-94.5 h-62 border-[0.5px] border-onsy-primary py-6 px-14 flex flex-col rounded-xl content-center items-center gap-3  transition-all duration-300 ease-in-out  hover:-translate-y-2'>
            <img src={icon3} alt="Icon 3" className=" w-12 h-12" />
              <h3 className='font-semibold text-2xl -mt-2 text-[#111111] '>3. Get insights</h3>
              <p className='text-[#5F5F5F] text-center'>Receive personalized tips to improve your mental wellbeing based on your tracked data.
              </p>
            </div>
        </div>
    </section>
  )
}

export default Hero2