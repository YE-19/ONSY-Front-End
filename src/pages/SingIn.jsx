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
                      <h1 className=" text-2xl font-bold mt-0 text-black "> Welcome back </h1>
                    <p className='text-gray-600 text-xl  mb-2'>Continue your mental wellness journey</p>
                    </div>
                  
                    <Label for='email'className='font-medium '>Email address</Label>
                    <Input {...register("email")} label="email" type="email" className={`p-3 px-4 rounded-xl bg-white`} >
                     
                    </Input>
                    {errors.email?  <p className="text-red-900">{errors.email.message}</p> :null   }
        
                    <Label for='password' className='font-medium '>password</Label>
                    <Input {...register("password")} label="password" type="password" className={`p-3 px-4 rounded-xl bg-white`} >
                   
                    </Input>
                    {errors.password?  <p className="text-red-900">{errors.password.message}</p> :null   }
        
                    
        
                     
                     <p className='text-gray-500 text-center'>or signin with</p>
                      <Input label="signup with google" type="text" className={`p-3 px-4 rounded-xl text-gray-800`} >
                      
                    </Input>
        
                    <Button type="submit" isLoading={isSubmitting} className={`bg-cyan-800 w-100 mx-auto rounded-xl py-6`}>
                     
                      Login
                    </Button>
                    <p className='text-gray-500 text-center'>don't have an account? <Link to={'/SignUp'} className='text-cyan-900 font-medium '> Signup</Link> </p>
                  </form>
                   <div className="py-20"></div>
                </div>
              </section>
        
        
        
        
        </div>
        
            </div>
            </div>
          
        </>
  )
}

export default SingIn