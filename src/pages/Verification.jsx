import React from 'react'
import myImage from '../assets/mint-backg.jpg'
import { Button, } from "@heroui/react";
import { Link } from "react-router-dom";

export default function Verification() {
  return (
      <section  style={{ backgroundImage: `url(${myImage})` }} className="h-screen bg-center " >
        <div className='pt-40'>
            <form className="w-145 h-150 mx-auto shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6   mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold content-center py-20 " style={{ backgroundImage: `url(${myImage})` }}  >    
              <div>
                <h1 className=" text-[40px] font-bold mt-0 text-black text-center "> OTP verification </h1>
                <p className='text-gray-600 text-center font-normal text-[24px] mb-2'>Enter the code from the email we sent to  <br></br><span className='text-black'>ao****@g***.com</span> </p>
              </div>
              <div className='flex flex-row gap-2 justify-around p-10'>
              <div className='w-16.5 h-16.5 content-center items-center rounded-2xl text-center text-3xl bg-cyan-800 text-white font-bold'>
                7
              </div>
              <div className='w-19.5 h-19.5 content-center items-center text-3xl bg-cyan-800 rounded-2xl text-white font-bold'>
                0
              </div>
              <div className='p-4 px-6 text-3xl bg-cyan-800 rounded-2xl text-white font-bold'>
                9
              </div>
              <div className='p-4 px-6 text-3xl bg-cyan-800 rounded-2xl text-white font-bold'>
                -
              </div>
            </div>
            <Button type="submit"  className={`bg-cyan-800 w-100 mx-auto rounded-xl py-6`}> 
              Login
            </Button>
            <p className='text-gray-500 text-center'>resend again in <Link to={'/SignUp'} className='text-cyan-900 font-medium '> 9 sec</Link> </p>
          </form>
        </div>
      </section>          
  )
}