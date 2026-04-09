import React from 'react'
import myImage from '../assets/mint-backg.jpg'
import { Button, } from "@heroui/react";
import { Link } from "react-router-dom";

export default function Verification() {
  return (
    <div>
       <div>
               <div  style={{ backgroundImage: `url(${myImage})` }} 
                     className="bg-cover bg-center " >
               
               <div className='p-40'>
                 
                <section>
                       <div className="max-width-100 md:max-w-2/3 lg:max-w-1/2 mx-auto" >
                       
                         <form
                          
                           className="bg-white shadow-2xl p-12  mt-1 rounded-2xl flex flex-col gap-4" style={{ backgroundImage: `url(${myImage})` }}  >
                            
                           <div>
                             <h1 className=" text-2xl font-bold mt-0 text-black text-center "> OTP verification </h1>
                           <p className='text-gray-600 text-center  mb-2'>Enter the code from the email we sent to  <br></br><span className='text-black'>ao****@g***.com</span> </p>
                           </div>
                          <div className='flex flex-row gap-2 justify-around p-10'>
                            <div className='p-4 px-6 text-3xl bg-cyan-800 rounded-2xl text-white font-bold'>
                                7
                            </div>
                              <div className='p-4 px-6 text-3xl bg-cyan-800 rounded-2xl text-white font-bold'>
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
                          <div className="py-20"></div>
                       </div>
                     </section>
               
               
               
               
               </div>
               
                   </div>
                   </div>
                 
    </div>
  )
}
