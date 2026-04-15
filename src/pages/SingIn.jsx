import React, { useState } from 'react'
import { Input, Button, Label } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from '../schemas/login.schema';
import { loginUser } from '../services/authService';
import myImage from '../assets/mint-backg.jpg'
import google from "../assets/Group.png"
import aro from "../assets/Vector.png"

const SingIn = () => {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onBlur'
  });

  async function onSubmitForm(data) {
    setError(false);
    try {
      await loginUser(data);
      
      toast.success("Welcome back to ONSY!");
      
      navigate('/');
      
    } catch (err) {
      setError(true);
      const errorMessage = err.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
    }
  }

  return (
    <>
      <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center h-300 py-40">
        <div>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-12 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold w-147 m-auto" 
            style={{ backgroundImage: `url(${myImage})` }}
          >
            <div className='text-[#147E8F] font-labrada text-[64px] mx-10 text-center'>
              ONSY
            </div>
            <div className='mb-8'>
              <h1 className="text-[32px] font-bold mt-0 text-black"> Welcome back </h1>
              <p className='text-[#5F5F5F] font-semibold text-xl mb-2'>Continue your mental wellness journey</p>
            </div>
            
            <div className='flex flex-col gap-2 px-19 font-semibold'>
              <Label htmlFor='email' className='mb-1 font-semibold'>Email address</Label>
              <Input 
                {...register("email")} 
                type="email" 
                className={`p-3 h-14 w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} 
                placeholder='your@email.com' 
              />
              {errors.email && <p className="text-red-900">{errors.email.message}</p>}

              <Label htmlFor='password' title='password' className='mb-1 font-semibold'>password</Label>
              <Input 
                {...register("password")} 
                type="password" 
                className={`p-3 h-14 w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} 
                placeholder='********' 
              />
              {errors.password && <p className="text-red-900">{errors.password.message}</p>}
              
              <p className='text-end cursor-pointer text-onsy-secondary -mt-2.5 mb-6 underline underline-offset-4 hover:text-[#264444e5] transition-all duration-300 ease-in-out'>Forgot password?</p>
              
              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitting}
                className={`bg-[#036464E5] h-14 w-96 rounded-[10px] py-6 hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#264444e5] transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >           
                {isSubmitting ? "Loading..." : "Log in"}
              </Button>
              
              <div className='flex gap-1 items-center m-auto'>
                <div className='h-px w-28 bg-onsy-secondary'></div>
                <p className='text-[#111111] font-normal text-center my-3 text-[16px]'>Or sign up with</p>
                <div className='h-px w-28 bg-onsy-secondary'></div>
              </div>

              <div className='p-3 px-5 h-14 w-96 rounded-[10px] bg-[#FFFFFF] flex justify-between items-center cursor-pointer hover:shadow-[0_0_15px_3px_#FFFFFF80] transition-all duration-300 ease-in-out'>
                <div className='flex items-center gap-2'>
                  <img src={google} alt="google" />
                  <p className='font-semibold text-[#5F5F5F]'>Sign up with Google</p>
                </div>
                <img src={aro} className='w-4 h-4' alt="arrow" />
              </div>
            </div>

            <p className='text-[#111111] text-center mt-4'>don't have an account? <Link to={'/SignUp'} className='text-onsy-secondary font-semibold underline underline-offset-4 hover:text-[#264444e5] transition-all duration-300 ease-in-out '> Signup</Link> </p>
          </form>
          <div className="py-20"></div>
        </div>
      </section>
    </>
  )
}

export default SingIn;