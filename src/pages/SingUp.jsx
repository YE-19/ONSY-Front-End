import React, { useState } from 'react'
import myImage from '../assets/mint-backg.jpg'
import { Button, Label } from "@heroui/react";
import { Input } from '@heroui/react';
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { registerSchema } from "../schemas/signup.schema";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";






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
    <div>
<div  style={{ backgroundImage: `url(${myImage})` }} 
      className="bg-cover bg-center " >

<div className='p-40'>
  
 <section>
        <div className="max-width-100 md:max-w-2/3 lg:max-w-1/2 mx-auto" >
        
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="bg-white shadow-2xl p-12  mt-1 rounded-2xl flex flex-col gap-4" style={{ backgroundImage: `url(${myImage})` }}  >
               <div className='text-[#147E8F]  font-labrada text-[48px] font-semibold mx-10 text-center'>
            ONSY
          </div>
            <div>
              <h1 className=" text-2xl font-bold mt-0 text-black "> Create an account </h1>
            <p className='text-gray-600 text-xl  mb-2'>Let's personalize your experience</p>
            </div>
            <div className='flex flex-row justify-around'>
             <div className='flex flex-col'>

               <Label for='name' className='font-medium mb-1'>First name</Label>
            <Input
              {...register("name")} label="name"  labelPlacement="outside" type="text" className={`p-3 px-4 rounded-xl`}  >
              
            </Input>
            {errors.name ?  <p className="text-red-900 ">{errors.name.message}</p> :null   }
             </div>
            <div className='flex flex-col'>
              <Label for='lastName' className='font-medium mb-1'>Last name</Label>
             <Input
              {...register("username")} label="lastName" type="text"  className={`p-3 px-4`}  >
             
            </Input>
            {errors.username ?  <p className="text-red-900 ">{errors.username.message}</p> :null   }
            </div>
            </div>
            <Label for='email'className='font-medium '>Email address</Label>
            <Input {...register("email")} label="email" type="email" className={`p-3 px-4 rounded-xl`} >
             
            </Input>
            {errors.email?  <p className="text-red-900">{errors.email.message}</p> :null   }

            <Label for='password' className='font-medium '>password</Label>
            <Input {...register("password")} label="password" type="password" className={`p-3 px-4 rounded-xl`} >
           
            </Input>
            {errors.password?  <p className="text-red-900">{errors.password.message}</p> :null   }

            <Label for='rePassword' className='font-medium'>rewrite your password</Label>
            <Input
              {...register("rePassword")} label="rePassword" type="password" className={`p-3 px-4 rounded-xl`} >
          
            </Input>
             {errors.rePassword?  <p className="text-red-900">{errors.rePassword.message}</p> :null   }

             <Label for='dateOfBirth' className='font-medium '>Date of Birth</Label>
            <Input
              {...register("dateOfBirth")} label="date of birth" type="date" className={`p-3 px-4 rounded-xl`} >
              
            </Input>
             {errors.dateOfBirth?  <p className="text-red-900">{errors.dateOfBirth.message}</p> :null   }

             <p className='text-gray-500 text-center'>or signup with</p>
              <Input label="signup with google" type="text" className={`p-3 px-4 rounded-xl text-gray-800`} >
              
            </Input>

            <Button type="submit" isLoading={isSubmitting} className={`bg-cyan-800 w-100 mx-auto rounded-xl py-6`}>
             
              Continue
            </Button>
            <p className='text-gray-500 text-center'>Already have an account? <Link to={'/SingIn'} className='text-cyan-900 font-medium '> Login..</Link> </p>
          </form>
           <div className="py-20"></div>
        </div>
      </section>




</div>

    </div>
    </div>
  )
}

export default SingUp