import React from 'react'
import victor1 from '../assets/Vector1.png'
import victor2 from '../assets/Vector2.png'
import victor3 from '../assets/Vector3.png'
import victor4 from '../assets/Vector4.png'
import victor5 from '../assets/Vector5.png'
import arrow from '../assets/mdi_arrow.png'
import { useNavigate } from 'react-router-dom';

const SpeakChatBot = () => {

  const navigate = useNavigate();

  return (
    <>
    <section className='flex'>
      <nav className=' w-90 h-screen flex flex-col gap-5  items-center pt-4'>
        <div 
          className= 'text-[#147E8F] pb-7 font-labrada text-[30px] lg:text-[48px] font-semibold cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 z-50'
          onClick={() => { navigate("/"); setIsOpen(false); }}
        >
          ONSY
        </div>
        <div className=' flex flex-col gap-4'>
          <button 
          className='pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110'
          >
            <img src={victor1} alt="" />
            New chat
          </button>
          <button 
          className='pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110'
          onClick={ () => navigate('/Dashboard')}
          >
            <img src={victor2} alt="" />
            Dashboard
          </button>
          <button 
          className='pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110'
          onClick={ () => navigate('/Mood')}
          >
            <img src={victor2} alt="" />
            Mood
          </button>
          <button 
          className='pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110'
          onClick={ () => navigate('/EMotiv')}
          >
            <img src={victor3} alt="" />
            E-Motiv
          </button>
          <button 
          className='pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110'
          onClick={ () => navigate('/')}
          >
            <img src={victor4} alt="" />
            Profile
          </button>
          <button 
          className='pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-110'
          onClick={ () => navigate('/')}
          >
            <img src={victor5} alt="" />
            Settings
          </button>
        </div>
        <div className='flex flex-col gap-5 w-64 '>
          <p className='flex justify-between text-[20px] pb-2'>Chat history <img src={arrow} alt="" /></p>
          <p className='flex gap-1.5 cursor-pointer transition-all duration-300 ease-in-out hover:underline'><img src={arrow} alt="" />You shared your feelings</p>
          <p className='flex gap-1.5 cursor-pointer transition-all duration-300 ease-in-out hover:underline'><img src={arrow} alt="" />You talked about stress</p>
          <p className='flex gap-1.5 cursor-pointer transition-all duration-300 ease-in-out hover:underline'><img src={arrow} alt="" />You checked your mood</p>
        </div>
        <div className='w-64 h-32 p-4 bg-[#D2D2D25E] rounded-3xl flex flex-col gap-1'>
          <h2>Free plan</h2>
          <p className='text-[12px] text-[#5F5F5F] font-medium'>Unlock advanced features for better care.</p>
          <button className='h-9 w-40 mx-auto bg-[#036464E5] text-center text-white rounded-[6px] cursor-pointer transition-all duration-300 ease-in-out hover:scale-105'>
            Upgrade
          </button>
        </div>
      </nav>
      <div className='w-screen h-screen bg-[#147E8F]'>

      </div>
    </section>
    </>
  )
}

export default SpeakChatBot