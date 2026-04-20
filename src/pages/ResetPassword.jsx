import React, { useState } from 'react'
import myImage from '../assets/mint-backg.jpg';
import { Button, Label, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import * as z from "zod";
import { useNavigate, useLocation } from "react-router-dom"; 
import { ResetPasswordApi } from '../services/authService';
import Loading from './Loading';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetSchema = z.object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/, 
        "Password must include uppercase, lowercase, and a special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const email = location.state?.email;
  const otp = location.state?.otp; 

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: 'onBlur'
  });

  async function onSubmitForm(data) {
    if (!email || !otp) {
      toast.error("Session expired. Please start from Forgot Password again.");
      navigate("/ForgetP");
      return;
    }

    try {
      const finalData = {
        email: email,
        otp: otp,
        password: data.password,
        confirmPassword: data.confirmPassword 
      };

      await ResetPasswordApi(finalData);
      
      toast.success("Password updated successfully!");
      setIsLoading(true); 

      setTimeout(() => {
        navigate('/SignIn');
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);
    }
  }

  if (isLoading) {
    return (
      <Loading 
        head={"Your password has been updated."}
        prag={"Taking you to sign in…"} 
      />
    );
  }

  return (
    <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center h-screen">
      <div className='pt-40 px-40'>
        <div className="max-width-100 md:max-w-2/3 lg:max-w-1/2 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 py-10 lg:py-12 mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold w-full lg:w-fit mx-auto"
            style={{ backgroundImage: `url(${myImage})` }}
          >
            <div className='text-[#147E8F] font-labrada text-5xl lg:text-[64px] lg:mx-10 text-center'>
              ONSY
            </div>
            <div className="text-center px-0 lg:text-start">
              <h1 className="text-2xl lg:text-[32px] font-bold mt-0 text-black">
                Set a new password
              </h1>
              <p className='text-[#5F5F5F] font-semibold text-lg lg:text-xl mb-2'>
                Create a new password. Ensure it differs from previous ones for security
              </p>
            </div>

            <div className='flex flex-col gap-2 px-0 lg:px-19 font-semibold pb-6 lg:pb-10'>
              <Label htmlFor='password'>Password</Label>

              <div className="relative w-full lg:w-96">
                <Input 
                  {...register("password")} 
                  type={showPassword ? "text" : "password"} 
                  className="p-3 h-14 w-full text-[16px] rounded-[10px] font-semibold border border-[#147E8F]"
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

              <Label htmlFor='confirmPassword'>Confirm Password</Label>

              <div className="relative w-full lg:w-96">
                <Input 
                  {...register("confirmPassword")} 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="p-3 h-14 w-full text-[16px] rounded-[10px] font-semibold border border-[#147E8F]"
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

              <Button 
                type="submit" 
                isLoading={isSubmitting} 
                disabled={isSubmitting}
                className={`bg-[#036464E5] h-14 w-full lg:w-96 mt-3 rounded-[10px] py-6 hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#264444e5] transition-all duration-300 ease-in-out text-white font-bold ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword;