import React, { useState, useEffect, useRef } from 'react'
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
import { registerUser, googleSignup } from '../services/authService';

const SignUp = () => {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const googleBtnRef = useRef(null);

  const { register, handleSubmit, setError: setFormError, formState: { errors, isSubmitting } } = useForm({
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

  const handleGoogleResponse = async (response) => {
    try {
      const result = await googleSignup(response.credential);
      toast.success("Signed up with Google successfully!");
      console.log("Google Success:", result);
      navigate('/dashboard'); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Google sign up failed";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "367829066840-ip9nn34hpd5n5vbuobvlo8l2v4ihmhg8.apps.googleusercontent.com",
        callback: handleGoogleResponse,
        locale: "en",
      });

      window.google.accounts.id.renderButton(
        googleBtnRef.current,
        { 
          theme: 'outline', 
          size: 'large', 
          width: window.innerWidth < 1024 ? window.innerWidth - 80 : "384",  
          height: "56", 
          shape: "rectangular",
          text: "signup_with", 
          logo_alignment: "left"
        }
      );
    }
  }, []);

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
      const lowCaseMsg = errorMessage.toLowerCase();
      if (lowCaseMsg.includes("email") || lowCaseMsg.includes("exists") || lowCaseMsg.includes("used")) {
        setFormError("email", { type: "manual", message: errorMessage });
      } else if (err.response?.data?.errors) {
        Object.keys(err.response.data.errors).forEach((key) => {
          setFormError(key, { type: "manual", message: err.response.data.errors[key] });
        });
      } else {
        toast.error(errorMessage);
      }
      console.error("API Error:", err);
    }
  }

  return (
    <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center min-h-screen">
      <div className='pt-20 lg:pt-40 px-4 lg:px-40 '>
        <div className="w-full max-w-150 lg:max-w-none lg:w-fit mx-auto " >
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-10 lg:py-12 mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold" 
            style={{ backgroundImage: `url(${myImage})` }} >
            
            <div className='text-[#147E8F] font-labrada text-5xl lg:text-[64px] lg:mx-10 text-center'> ONSY </div>
            
            <div className="text-center lg:text-left">
              <h1 className=" text-2xl lg:text-[32px] font-bold mt-0 text-black "> Create an account </h1>
              <p className='text-[#5F5F5F] font-semibold text-lg lg:text-xl mb-2'>Let's personalize your experience</p>
            </div>

            <div className='flex flex-col gap-2 px-0 lg:px-19 font-semibold'>
              
              {/* Names row: Vertical on Mobile, Horizontal on Desktop */}
              <div className='flex flex-col lg:flex-row justify-between gap-4 lg:gap-0 w-full lg:w-96'>
                <div className='flex flex-col w-full lg:w-43'>
                  <Label htmlFor='firstName' className=' mb-1'>First name</Label>
                  <Input {...register("firstName")} type="text" className={`py-3 w-full h-14 text-[16px] font-semibold rounded-xl border border-[#147E8F]`} placeholder='Sara' />
                  {errors.firstName && <p className="text-red-900 text-sm">{errors.firstName.message}</p>}
                </div>

                <div className='flex flex-col w-full lg:w-43'>
                  <Label htmlFor='lastName' className=' mb-1 font-semibold'>Last name</Label>
                  <Input {...register("lastName")} type="text" className={`py-3 w-full h-14 font-semibold text-[16px] rounded-xl border border-[#147E8F]`} placeholder='Ahmed' />
                  {errors.lastName && <p className="text-red-900 text-sm">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="w-full lg:w-96">
                <Label htmlFor='email' className='font-semibold'>Email address</Label>
                <Input {...register("email")} type="email" className={`p-3 h-14 w-full rounded-[10px] text-[16px] font-semibold border border-[#147E8F]`} placeholder='your@email.com' />
                {errors.email && <p className="text-red-900 text-sm">{errors.email.message}</p>}
              </div>

              <div className="w-full lg:w-96">
                <Label htmlFor='gender' className='font-semibold'>Gender</Label>
                <select 
                  {...register("gender")} 
                  className={`p-2 h-14 w-full text-[16px] rounded-[10px] font-semibold border border-[#147E8F] bg-[#FFFFFF] `}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-900 text-sm">{errors.gender.message}</p>}
              </div>

              <div className="w-full lg:w-96">
                <Label htmlFor='password' dangerouslySetInnerHTML={{__html: 'Password'}} className='font-semibold' />
                <div className="relative w-full">
                  <Input 
                    {...register("password")} 
                    type={showPassword ? "text" : "password"} 
                    className={`p-3 h-14 w-full text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} 
                    placeholder='Min 8 characters' 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#264444e5] transition-all duration-300 ease-in-out"
                  >
                    {showPassword ? "Hide" : "Show"} 
                  </button>
                </div>
                {errors.password && <p className="text-red-900 text-sm">{errors.password.message}</p>}
              </div>

              <div className="w-full lg:w-96">
                <Label htmlFor='confirmPassword' dangerouslySetInnerHTML={{__html: 'Confirm Password'}} className='font-semibold' />
                <div className="relative w-full">
                  <Input 
                    {...register("confirmPassword")} 
                    type={showConfirmPassword ? "text" : "password"} 
                    className={`p-3 h-14 w-full text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} 
                    placeholder='Min 8 characters' 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#264444e5] transition-all duration-300 ease-in-out"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-900 text-sm">{errors.confirmPassword.message}</p>}
              </div>

              <div className="w-full lg:w-96">
                <Label htmlFor='dateOfBirth' className='font-semibold '>Date of Birth</Label>
                <Input {...register("dateOfBirth")} type="date" className={`p-3 h-14 w-full text-[16px] rounded-[10px] font-semibold border border-[#147E8F]`} />
                {errors.dateOfBirth && <p className="text-red-900 text-sm">{errors.dateOfBirth.message}</p>}
              </div>

              <div className='flex gap-1 items-center m-auto w-full lg:w-96 justify-center'>
                <div className='h-px w-full max-w-28 bg-onsy-secondary'></div>
                <p className='text-[#111111] font-normal text-center my-3 text-[14px] lg:text-[16px] whitespace-nowrap px-2'>Or sign up with</p>
                <div className='h-px w-full max-w-28 bg-onsy-secondary'></div>
              </div>

              <div className='p-3 px-5 h-14 w-full lg:w-96 rounded-[10px] bg-[#FFFFFF] flex justify-between items-center cursor-pointer hover:shadow-[0_0_15px_3px_#FFFFFF80] transition-all duration-300 ease-in-out'>
                <div className='flex items-center gap-2'>
                  <img src={google} alt="google" />
                  <p className='font-semibold text-[#5F5F5F] text-sm lg:text-base'>Sign up with Google</p>
                </div>
                <img src={aro} className='w-4 h-4' alt="arrow" />
              </div>

              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitting}
                className={`bg-[#036464E5] mt-4 h-14 w-full lg:w-96 rounded-[10px] py-6 text-white font-semibold hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#264444e5] transition-all duration-300 ease-in-out ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >           
                {isSubmitting ? "Creating Account..." : "Continue"}
              </Button>
            </div>
            <p className='text-[#111111] text-center mt-4'>Already have an account? <Link to={'/SignIn'} className='text-onsy-secondary font-semibold underline underline-offset-4 hover:text-[#264444e5] transition-all duration-300 ease-in-out '> Sign in</Link> </p>
          </form>
          <div className="py-10 lg:py-20"></div>
        </div>
      </div>
    </section>
  )
}

export default SignUp;