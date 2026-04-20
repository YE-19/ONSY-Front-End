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
import Loading from './Loading';

const SingIn = () => {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setError: setFormFieldError, formState: { errors, isSubmitting } } = useForm({
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
      toast.success("Welcome back!");
      setLoading(true); 
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(true);
      const errorMessage = err.response?.data?.message || "Invalid email or password";
      const lowCaseMessage = errorMessage.toLowerCase();
      if (lowCaseMessage.includes("password")) {
        setFormFieldError("password", { type: "manual", message: errorMessage });
      } 
      else if (lowCaseMessage.includes("email") || lowCaseMessage.includes("user") || lowCaseMessage.includes("not found")) {
        setFormFieldError("email", { type: "manual", message: errorMessage });
      } 
      else {
        toast.error(errorMessage);
      }
    }
  }

  if (loading) {
    return (
        <Loading 
            head={"You're now logged in."}
            prag={"Taking you home…"} 
        />
    );
  } 

  return (
    <>
      {/* 1. السكشن: h-auto للموبايل و lg:h-300 للديسك توب، py-20 للموبايل و lg:py-40 للديسك توب */}
      <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center h-auto lg:h-300 py-20 lg:py-40 px-4 lg:px-0">
        <div>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-10 lg:py-12 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold w-full max-w-147 lg:w-147 m-auto" 
            style={{ backgroundImage: `url(${myImage})` }}
          >
            <div className='text-[#147E8F] font-labrada text-5xl lg:text-[64px] lg:mx-10 mx-10 text-center'>
              ONSY
            </div>
            <div className='mb-6 lg:mb-8 mt-4 text-center lg:text-left'>
              <h1 className="text-2xl lg:text-[32px] font-bold mt-0 text-black"> Welcome back </h1>
              <p className='text-[#5F5F5F] font-semibold text-lg lg:text-xl mb-2'>Continue your mental wellness journey</p>
            </div>
            

            <div className='flex flex-col gap-2 px-0 lg:px-19 font-semibold items-center lg:items-start'>
              <div className='w-full lg:w-96'>
                <Label htmlFor='email' className='mb-1 font-semibold block'>Email address</Label>
                <Input 
                  {...register("email")} 
                  type="email" 
                  className={`p-3 h-14 w-full lg:w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} 
                  placeholder='your@email.com' 
                />
                {errors.email && <p className="text-red-900 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="relative w-full lg:w-96"> 
                <Label htmlFor='password' title='password' className='mb-1 font-semibold block'>password</Label>
                <Input 
                  {...register("password")} 
                  type={showPassword ? "text" : "password"} 
                  className={`p-3 h-14 w-full lg:w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} 
                  placeholder='********' 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-11 text-gray-500 cursor-pointer hover:text-[#264444e5] transition-all duration-300 ease-in-out"
                >
                  {showPassword ? "Hide" : "Show"} 
                </button>
                {errors.password && <p className="text-red-900 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className='w-full lg:w-96'>
                <p onClick={() => navigate("/ForgetP")} className='text-end cursor-pointer text-onsy-secondary mt-1 mb-6 underline underline-offset-4 hover:text-[#264444e5] transition-all duration-300 ease-in-out'>Forgot password?</p>
              </div>
              
              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitting}
                className={`bg-[#036464E5] h-14 w-full lg:w-96 rounded-[10px] py-6 text-white hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#264444e5] transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >           
                {isSubmitting ? "Loading..." : "Log in"}
              </Button>
              
              <div className='flex gap-1 items-center m-auto w-full justify-center'>
                <div className='h-px w-16 lg:w-28 bg-onsy-secondary'></div>
                <p className='text-[#111111] font-normal text-center my-3 text-sm lg:text-[16px] whitespace-nowrap'>Or sign up with</p>
                <div className='h-px w-16 lg:w-28 bg-onsy-secondary'></div>
              </div>

              <div className='p-3 px-5 h-14 w-full lg:w-96 rounded-[10px] bg-[#FFFFFF] flex justify-between items-center cursor-pointer hover:shadow-[0_0_15px_3px_#FFFFFF80] transition-all duration-300 ease-in-out'>
                <div className='flex items-center gap-2'>
                  <img src={google} alt="google" />
                  <p className='font-semibold text-[#5F5F5F]'>Sign up with Google</p>
                </div>
                <img src={aro} className='w-4 h-4' alt="arrow" />
              </div>
            </div>
            <p className='text-[#111111] text-center mt-4'>don't have an account? <Link to={'/SignUp'} className='text-onsy-secondary font-semibold underline underline-offset-4 hover:text-[#264444e5] transition-all duration-300 ease-in-out '> Signup</Link> </p>
          </form>

        </div>
      </section>
    </>
  )
}

export default SingIn;