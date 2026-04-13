import React, { useState } from 'react'
import myImage from '../assets/mint-backg.jpg'
import { Button, Label } from "@heroui/react";
import { Input } from '@heroui/react';
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { registerSchema } from "../schemas/signup.schema";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/Group.png"
import aro from "../assets/Vector.png"

const SingUp = () => {
let[isError,setError]=useState(false);
let[isLoading,setLoading]=useState(false);
let navigate=useNavigate()   

  const { register, handleSubmit,formState:{errors,isSubmitting},control } = useForm({
    resolver:zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    mode:'onBlur'
  });

   async function onSubmitForm(data) {
    setError(false)
    setLoading(false)
    try{
    let response= await sendRegisterData(data)
    setLoading(true)
    toast.success("signed in!")
    navigate('./SingIn')
   console.log(response)
    }
   catch(err){
  setError(true)
  toast.error('enter valid data')
   }
  }

  return (

      <section  style={{ backgroundImage: `url(${myImage})` }} 
      className="bg-cover bg-center " >

 <div className='pt-40 px-40 '>
        <div className="max-width-100 md:max-w-2/3 lg:max-w-1/2 mx-auto " >
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-12  mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold" style={{ backgroundImage: `url(${myImage})` }}  >
               <div className='text-[#147E8F]  font-labrada text-[64px]  mx-10 text-center'>
            ONSY
          </div>
            <div>
              <h1 className=" text-[32px] font-bold mt-0 text-black "> Create an account </h1>
            <p className='text-[#5F5F5F] font-semibold text-xl  mb-2'>Let's personalize your experience</p>
            </div>
            <div className='flex  flex-col gap-2 px-19 font-semibold'>
            <div className='flex flex-row justify-between w-96'>
             <div className='flex flex-col'>
               <Label for='name' className=' mb-1'>First name</Label>
                <Input
                {...register("name")} label="name"  labelPlacement="outside" type="text" className={`py-3 w-43 h-14 font-semibold rounded-xl border border-[#147E8F]`} placeholder='Sara'  >
                </Input>
              {errors.name ?  <p className="text-red-900 ">{errors.name.message}</p> :null   }
             </div>
            <div className='flex flex-col'>
              <Label for='lastName' className=' mb-1 font-semibold'>Last name</Label>
             <Input
              {...register("username")} label="lastName" type="text"  className={`py-3 w-43 h-14 font-semibold rounded-xl border border-[#147E8F]`} placeholder='Ahmed' >
             
            </Input>
            {errors.username ?  <p className="text-red-900 ">{errors.username.message}</p> :null   }
            </div>
            </div>
            <Label for='email'className='font-semibold'>Email address</Label>
            <Input {...register("email")} label="email" type="email" className={`p-3 h-14 w-96  rounded-[10px] font-semibold border border-[#147E8F]`}  placeholder='your@email.com' >
             
            </Input>
            {errors.email?  <p className="text-red-900">{errors.email.message}</p> :null   }

            <Label for='password' className='font-semibold '>password</Label>
            <Input {...register("password")} label="password" type="password" className={`p-3 h-14 w-96  rounded-[10px] font-semibold border border-[#147E8F]`}  placeholder='Min 8 characters' >
           
            </Input>
            {errors.password?  <p className="text-red-900">{errors.password.message}</p> :null   }

            <Label for='rePassword' className='font-semibold'>rewrite your password</Label>
            <Input
              {...register("rePassword")} label="rePassword" type="password" className={`p-3 h-14 w-96  rounded-[10px] font-semibold border border-[#147E8F]`}  placeholder='Min 8 characters' >
          
            </Input>
             {errors.rePassword?  <p className="text-red-900">{errors.rePassword.message}</p> :null   }

             <Label for='dateOfBirth' className='font-semibold '>Date of Birth</Label>
            <Input
              {...register("dateOfBirth")} label="date of birth" type="date" className={`p-3 h-14 w-96  rounded-[10px] font-semibold border border-[#147E8F]`}  placeholder='mm/dd/yyyy'>
              
            </Input>
             {errors.dateOfBirth?  <p className="text-red-900">{errors.dateOfBirth.message}</p> :null   }
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
            <Button type="submit" isLoading={isSubmitting} className={`bg-[#036464E5] h-14 w-96 rounded-[10px] py-6`}>
              Continue
            </Button>
            </div>
            <p className='text-[#111111] text-center mt-4'>Already have an account? <Link to={'/SingIn'} className='text-onsy-secondary font-semibold underline underline-offset-4 '>  Sign in</Link> </p>
          </form>
           <div className="py-20"></div>
        </div>
      </div>
    </section>
  )
}

export default SingUp