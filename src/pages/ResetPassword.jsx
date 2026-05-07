import React, { useState } from 'react'
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
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must not exceed 20 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/, "Password must include uppercase, lowercase, and a special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

  const email = location.state?.email;
  const otp = location.state?.otp; 

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: 'onBlur'
  });

  async function onSubmitForm(data) {
    if (!email || !otp) {
      toast.error("Session expired. Please start from Forgot Password again.");
      navigate("/ForgetP");
      return;
    }
    try {
      const finalData = { email: email, otp: otp, password: data.password, confirmPassword: data.confirmPassword };
      await ResetPasswordApi(finalData);
      toast.success("Password updated successfully!");
      setIsLoading(true); 
      setTimeout(() => { navigate('/SignIn'); }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);
    }
  }

  if (isLoading) {
    return <Loading head={"Your password has been updated."} prag={"Taking you to sign in…"} />;
  }

  const inputCls = "w-full h-14 px-4 text-base rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 focus:bg-white dark:focus:bg-slate-700 focus:border-teal-500 dark:focus:border-teal-400 outline-none transition-all duration-300 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 px-4 py-24 transition-colors duration-300">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl px-8 py-12 shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/60 flex flex-col gap-6 transition-all duration-300"
        >
          <div className="text-teal-600 dark:text-teal-400 font-labrada text-4xl sm:text-5xl text-center font-bold tracking-tight">ONSY</div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Set a new password</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg mt-2">Create a new password. Ensure it differs from previous ones for security</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</Label>
              <div className="relative">
                <Input {...register("password")} type={showPassword ? "text" : "password"} className={inputCls} placeholder="Min 8 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 focus:outline-none">{showPassword ? "Hide" : "Show"}</button>
              </div>
              {errors.password && <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 font-medium">{errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm Password</Label>
              <div className="relative">
                <Input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} className={inputCls} placeholder="Min 8 characters" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 focus:outline-none">{showConfirmPassword ? "Hide" : "Show"}</button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
            </div>

            <Button 
              type="submit" 
              isLoading={isSubmitting} 
              disabled={isSubmitting}
              className={`w-full h-14 rounded-xl bg-gradient-to-r from-[#036464] to-teal-500 dark:from-teal-700 dark:to-teal-500 text-white font-bold text-base shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all duration-300 mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword;