import React, { useState } from 'react'
import myImage from '../assets/mint-backg.jpg'
import { Button, Label } from "@heroui/react";
import { Input } from '@heroui/react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from "../schemas/signup.schema";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/Group.png"
import aro from "../assets/Vector.png"
import { registerUser } from '../services/authService';

const SignUp = () => {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      gender: "", 
      password: "",
      confirmPassword: "",
    },
    mode: 'onBlur'
  });

  const calculateAge = (dob) => {
    const birthday = new Date(dob);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  async function onSubmitForm(data) {
    setError(false); 
    
    try {
      const finalData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        age: calculateAge(data.dateOfBirth),
        gender: data.gender,
        password: data.password,
        confirmPassword: data.confirmPassword
      };

      const result = await registerUser(finalData);
      toast.success("Account created successfully!");
      
      navigate('/verification', { state: { email: finalData.email } }); 
      
      console.log("Success Result:", result);

    } catch (err) {
      setError(true);
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
      console.error("API Error:", err);
    }
  }

  return (
    <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center ">
      <div className='pt-40 px-40 '>
        <div className="max-width-100 md:max-w-2/3 lg:max-w-1/2 mx-auto " >
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-12 mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold" 
            style={{ backgroundImage: `url(${myImage})` }} >
            
            <div className='text-[#147E8F] font-labrada text-[64px] mx-10 text-center'> ONSY </div>
            
            <div>
              <h1 className=" text-[32px] font-bold mt-0 text-black "> Create an account </h1>
              <p className='text-[#5F5F5F] font-semibold text-xl mb-2'>Let's personalize your experience</p>
            </div>

            <div className='flex flex-col gap-2 px-19 font-semibold'>
              <div className='flex flex-row justify-between w-96'>
                <div className='flex flex-col'>
                  <Label htmlFor='firstName' className=' mb-1'>First name</Label>
                  <Input {...register("firstName")} type="text" className={`py-3 w-43 h-14 text-[16px] font-semibold rounded-xl border border-[#147E8F]`} placeholder='Sara' />
                  {errors.firstName && <p className="text-red-900 ">{errors.firstName.message}</p>}
                </div>

                <div className='flex flex-col'>
                  <Label htmlFor='lastName' className=' mb-1 font-semibold'>Last name</Label>
                  <Input {...register("lastName")} type="text" className={`py-3 w-43 h-14 font-semibold text-[16px] rounded-xl border border-[#147E8F]`} placeholder='Ahmed' />
                  {errors.lastName && <p className="text-red-900 ">{errors.lastName.message}</p>}
                </div>
              </div>

              <Label htmlFor='email' className='font-semibold'>Email address</Label>
              <Input {...register("email")} type="email" className={`p-3 h-14 w-96 rounded-[10px] text-[16px] font-semibold border border-[#147E8F]`} placeholder='your@email.com' />
              {errors.email && <p className="text-red-900">{errors.email.message}</p>}

              <Label htmlFor='gender' className='font-semibold'>Gender</Label>
              <select 
                {...register("gender")} 
                className={`p-2 h-14 w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F] bg-[#FFFFFF] `}
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <p className="text-red-900">{errors.gender.message}</p>}

              <Label htmlFor='password' dangerouslySetInnerHTML={{__html: 'Password'}} className='font-semibold ' />
              <Input {...register("password")} type="password" className={`p-3 h-14 w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} placeholder='Min 8 characters' />
              {errors.password && <p className="text-red-900">{errors.password.message}</p>}

              <Label htmlFor='confirmPassword' dangerouslySetInnerHTML={{__html: 'Confirm Password'}} className='font-semibold' />
              <Input {...register("confirmPassword")} type="password" className={`p-3 h-14 w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} placeholder='Min 8 characters' />
              {errors.confirmPassword && <p className="text-red-900">{errors.confirmPassword.message}</p>}

              <Label htmlFor='dateOfBirth' className='font-semibold '>Date of Birth</Label>
              <Input {...register("dateOfBirth")} type="date" className={`p-3 h-14 w-96 text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} />
              {errors.dateOfBirth && <p className="text-red-900">{errors.dateOfBirth.message}</p>}

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

              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitting}
                className={`bg-[#036464E5] h-14 w-96 rounded-[10px] py-6 hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#264444e5] transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >           
                {isSubmitting ? "Creating Account..." : "Continue"}
              </Button>
            </div>
            <p className='text-[#111111] text-center mt-4'>Already have an account? <Link to={'/SignIn'} className='text-onsy-secondary font-semibold underline underline-offset-4 hover:text-[#264444e5] transition-all duration-300 ease-in-out '> Sign in</Link> </p>
          </form>
          <div className="py-20"></div>
        </div>
      </div>
    </section>
  )
}

export default SignUp;



