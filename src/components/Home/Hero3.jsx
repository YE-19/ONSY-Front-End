import React from 'react'
import icon from '../../assets/iconP.png';

const Hero3 = () => {
  return (
      <section className='w-full  bg-[#147E8F] py-5 px-30 relative overflow-hidden'>
      <span className='w-[500px] h-[500px] bg-[#FFFFFF73] blur-[250px] rounded-full absolute top-[-52px] left-[1050px]'></span>
      <span className='w-[500px] h-[500px] bg-[#FFFFFF73] blur-[250px] rounded-full absolute top-[-93px] left-[-188px]'></span>     
      <span className='w-[500px] h-[500px] bg-[#FFFFFF73] blur-[250px] rounded-full absolute top-[709px] left-[-221px]'></span>
      <span className='w-[500px] h-[500px] bg-[#FFFFFF73] blur-[250px] rounded-full absolute top-[732px] left-[549px]'></span>
      <span className='w-[500px] h-[500px] bg-[#FFFFFF73] blur-[250px] rounded-full absolute top-[709px] left-[1067px]'></span>   
        <div className='flex justify-between'>
          <div className='flex flex-col gap-12 w-154.75 relative z-10'>
            <h2 className=' font-gabarito text-6xl w-154.75 flex flex-col gap-8 pt-8'>
              <b>
                Your Personal
              </b>
              <b className='text-white'>
                Mental Companion
              </b>
              <b>
                Is Always Here
              </b>
            </h2>
            <p className=' text-[28px] text-white'>More than a chatbot — ONSY listens deeply, understands context, detects hidden emotions, and adapts its responses to what you truly need in the moment.</p>
            <div className='flex flex-col gap-12'>
              <div className=' p-7 w-154.75 h-40.5 bg-[#FEFDFE] border-[0.5px] border-onsy-primary shadow-md shadow-[#618475] rounded-2xl'>
                <h3 className='py-1.5 text-2xl font-sans font-semibold' >2. Learns Over Time</h3>
                <p className='py-1.5 text-[#5F5F5F]'>Every conversation builds a deeper model of who you are — your triggers, your patterns, your growth.                </p>
              </div>
              <div className=' p-7 w-154.75 h-40.5 bg-[#FEFDFE] border-[0.5px] border-onsy-primary shadow-md shadow-[#618475] rounded-2xl'>
                <h3 className='py-1.5 text-2xl font-sans font-semibold' >1. Emotion-Aware Responses</h3>
                <p className='py-1.5 text-[#5F5F5F]'>The AI detects anxiety, sadness, or joy in your words and responds appropriately — never robotic, always human.</p>
              </div>
              <div className=' p-7 w-154.75 h-40.5 bg-[#FEFDFE] border-[0.5px] border-onsy-primary shadow-md shadow-[#618475] rounded-2xl'>
                <h3 className='py-1.5 text-2xl font-sans font-semibold' >3. Private & Secure</h3>
                <p className='py-1.5 text-[#5F5F5F]'>End-to-end encrypted. Your thoughts stay yours — never shared, never trained on without consent.</p>
              </div>
            </div>
          </div>
          <div className='flex-col mt-88 w-146'>
            <div className='flex my-3'>
              <div className='bg-[#618475] w-16 h-16 rounded-4xl  flex justify-center items-center'><p className='text-5xl pb-1.5 text-white font-semibold'>ONSY</p></div>
              <div className='w-104  bg-[#618475] rounded-b-2xl rounded-r-2xl ml-10 mt-8 text-[#FFFFFF] p-3'>Good morning! I noticed from your brainwave data that your focus is lower than usual today. How are you feeling? 🌤️</div>
            </div>
            <div className=' justify-self-end-safe flex gap-10 my-3'>
              <div className='w-104  bg-white rounded-b-2xl rounded-l-2xl mt-8 p-3'>Honestly, I didn't sleep well and I'm anxious about my presentation</div>
              <img src={icon} alt="Icon 1" className=" w-18 h-18 " />
            </div>
            <div className='flex my-3'>
              <div className='bg-[#618475] w-16 h-16 rounded-4xl  flex justify-center items-center'><p className='text-5xl pb-1.5 text-white font-semibold'>ONSY</p></div>
              <div className='w-104 text-[#FFFFFF]  bg-[#618475] rounded-b-2xl rounded-r-2xl ml-10 mt-8 p-3'>That's completely understandable. Pre-presentation anxiety is your mind preparing you — it means you care. Let's do a quick breathing exercise to ground you first. Ready?</div>
            </div>
            <div className=' justify-self-end-safe flex gap-10 my-3'>
              <div className='w-104 p-3 pl-6 bg-white rounded-b-2xl rounded-l-2xl mt-8 '>Yes please, I could use that right now</div>
              <img src={icon} alt="Icon 1" className=" w-18 h-18 " />
            </div>
            <div className='flex my-3'>
              <div className='bg-[#618475] w-16 h-16 rounded-4xl  flex justify-center items-center'><p className='text-5xl pb-1.5 text-white font-semibold'>ONSY</p></div>
              <div className='w-104 text-[#FFFFFF] p-3 bg-[#618475] rounded-b-2xl rounded-r-2xl ml-10 mt-8 '>Inhale for 4 counts… hold for 4… exhale for 6. You've got this. 💙</div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero3