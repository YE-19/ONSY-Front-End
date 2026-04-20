import React, { useState } from 'react'
import { Input, Button, Label } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { forgotPasswordApi } from '../services/authService';
import myImage from '../assets/mint-backg.jpg'
import { toast } from 'react-toastify';

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ForgetP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setError: setFormFieldError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotSchema), 
    defaultValues: {
      email: "",
    },
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
    <section style={{ backgroundImage: `url(${myImage})` }} className="bg-cover bg-center min-h-screen flex flex-col justify-center py-10 lg:py-0">

      <div className='px-4 lg:px-40'>
        <div className="w-full max-w-full lg:max-w-1/2 mx-auto">
          
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-4 lg:px-6 py-12 mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold" 
            style={{ backgroundImage: `url(${myImage})` }} 
          >
            <div className='text-[#147E8F] font-labrada text-5xl lg:text-[64px] lg:mx-10 text-center'> ONSY </div>
            
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-[32px] font-bold mt-0 text-black"> Forgot your password </h1>
              <p className='text-[#5F5F5F] font-semibold text-lg lg:text-xl mb-2'>Please enter your email to reset the password</p>
            </div>

            <div className='flex flex-col gap-2 px-2 lg:px-19 font-semibold pb-10'>
                <Label htmlFor='email' className='font-semibold'>Email address</Label>
                <Input 
                  {...register("email")} 
                  type="email" 
                  isInvalid={!!errors.email}
                  className={`p-3 h-14 w-full lg:w-96 rounded-[10px] text-[16px] font-semibold border border-[#147E8F]`} 
                  placeholder='your@email.com' 
                />
                {errors.email && <p className="text-red-900">{errors.email.message}</p>}
                
                <Button 
                    type="submit" 
                    isLoading={isSubmitting} 
                    disabled={isSubmitting}
                    className={`bg-[#036464E5] h-14 w-full lg:w-96 rounded-[10px] py-6 hover:shadow-[0_0_15px_3px_#FFFFFF80] hover:bg-[#264444e5] transition-all duration-300 ease-in-out text-white ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >           
                    {isSubmitting ? "Processing..." : "Reset Password"}
                </Button>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}

export default ForgetP;