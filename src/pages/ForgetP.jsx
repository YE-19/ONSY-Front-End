import React from 'react'
import myImage from '../assets/mint-backg.jpg'


const ForgetP = () => {
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
                    تحت الانشاء
                </h2>
            </div>
        </div>
  )
}

export default ForgetP