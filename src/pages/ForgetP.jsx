import React, { useState } from 'react'
import { Input, Button, Label } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { forgotPasswordApi } from '../services/authService';
import { toast } from 'react-toastify';

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ForgetP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setError: setFormFieldError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotSchema), 
    defaultValues: { email: "" },
    mode: 'onBlur'
  });

  async function onSubmitForm(data) {
    try {
      await forgotPasswordApi(data);
      toast.success("Reset start");
      setLoading(true); 
      navigate("/ForgetPOTP", { state: { email: data.email } }); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      const lowCaseMessage = errorMessage.toLowerCase()
      if (lowCaseMessage.includes("email") || lowCaseMessage.includes("user") || lowCaseMessage.includes("not found")) {
        setFormFieldError("email", { type: "manual", message: errorMessage });
      } else {
        toast.error(errorMessage);
      }
    }
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 px-4 py-24 transition-colors duration-300">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl px-8 py-12 shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.3)] border border-slate-100 dark:border-slate-700/60 flex flex-col gap-6 transition-all duration-300"
        >
          <div className="text-teal-600 dark:text-teal-400 font-labrada text-4xl sm:text-5xl text-center font-bold tracking-tight">ONSY</div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Forgot your password</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg mt-2">Please enter your email to reset the password</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email address</Label>
              <Input 
                {...register("email")} 
                type="email" 
                isInvalid={!!errors.email}
                className="w-full h-14 px-4 text-base rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 focus:bg-white dark:focus:bg-slate-700 focus:border-teal-500 dark:focus:border-teal-400 outline-none transition-all duration-300 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1.5 font-medium">{errors.email.message}</p>}
            </div>

            <Button 
              type="submit" 
              isLoading={isSubmitting} 
              disabled={isSubmitting}
              className={`w-full h-14 rounded-xl bg-gradient-to-r from-[#036464] to-teal-500 dark:from-teal-700 dark:to-teal-500 text-white font-bold text-base shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >           
              {isSubmitting ? "Processing..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ForgetP;