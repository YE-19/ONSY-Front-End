import React from 'react'
import  { useContext } from 'react'
import { Input } from "@heroui/react";
import { Button ,Label} from "@heroui/react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { loginSchema } from '../schemas/login.schema';
import myImage from '../assets/mint-backg.jpg'
import google from "../assets/Group.png"
import aro from "../assets/Vector.png"

const SingIn = () => {

let[isError,setError]=useState(false);
let[isLoading,setLoading]=useState(false);
let navigate=useNavigate()   

  const { register, handleSubmit,formState:{errors,isSubmitting}} = useForm({
    resolver:zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode:'onBlur'
  });

  async function onSubmitForm(data) {
    setError(false)
    setLoading(false)
  try{
    let response= await sendLoginData(data)
    setLoading(true)
    toast.success("logged in")
    navigate('/')
    setToken(response.data.token);
    localStorage.setItem('token',response.data.token);
  }
  catch(err){
    setError(true)
    toast.error('enter valid data')
  }
  }

  return (
      <>
      <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center h-300 py-40 " >
        <div className="" >
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-12  rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold w-147  m-auto" style={{ backgroundImage: `url(${myImage})` }}  >
                <div className='text-[#147E8F]  font-labrada text-[64px]  mx-10 text-center'>
            ONSY
          </div>
            <div className='mb-8'>
              <h1 className=" text-[32px] font-bold mt-0 text-black "> Welcome back </h1>
            <p className='text-[#5F5F5F] font-semibold text-xl  mb-2'>Continue your mental wellness journey</p>
          </div>
          <div className='flex  flex-col gap-2 px-19 font-semibold'>
            <Label for='email'className='mb-1 font-semibold '>Email address</Label>
                          <Input {...register("email")} label="email" type="email" className={`p-3 h-14 w-96  rounded-[10px] font-semibold border border-[#147E8F]`}  placeholder='your@email.com'>

            </Input>
            {errors.email?  <p className="text-red-900">{errors.email.message}</p> :null   }

            <Label for='password' className='mb-1 font-semibold '>password</Label>
            <Input {...register("password")} label="password" type="password"  className={`p-3 h-14 w-96  rounded-[10px] font-semibold border border-[#147E8F]`}  placeholder='********' >
            
            </Input>
            {errors.password?  <p className="text-red-900">{errors.password.message}</p> :null   }
            <p className='text-end cursor-pointer text-onsy-secondary -mt-2.5 mb-6 underline underline-offset-4'>Forgot password?</p>
            <Button type="submit" isLoading={isSubmitting}  className={`bg-[#036464E5] h-14 w-96 rounded-[10px] py-6`}>
              
              Login
            </Button>
            <div className='flex gap-1 items-center m-auto'>
              <div className='h-px w-28 bg-onsy-secondary'></div>
              <p className='text-[#111111] font-normal text-center my-3 text-[16px]'>Or sign up with</p>
              <div className='h-px w-28 bg-onsy-secondary'></div>
              </div>
            <div  className='p-3 px-5 h-14 w-96 rounded-[10px] bg-[#FFFFFF] flex justify-between items-center cursor-pointer' >
              <div className='flex items-center gap-2'>
              <img src={google}/>
              <p className='font-semibold text-[#5F5F5F]'>Sign up with Google</p>
              </div>
              <img src={aro} className='w-4 h-4'/>
            </div>

          </div>
            <p className='text-[#111111] text-center mt-4'>don't have an account? <Link to={'/SignUp'} className='text-onsy-secondary font-semibold underline underline-offset-4 '> Signup</Link> </p>
          </form>
            <div className="py-20"></div>
        </div>   
      </section>        
      </>
  )
}

export default SingIn