import React, { useState, useEffect } from 'react'
import myImage from '../assets/mint-backg.jpg'
import { Button } from "@heroui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { verifyOtp, resendOtp } from '../services/authService';
import OtpInput from 'react-otp-input';

export default function Verification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isSuccess, setIsSuccess] = useState(false);

  const email = location.state?.email || "your email";

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (otp.length < 4) {
      toast.error("Please enter the 4-digit code");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp({ email, otp });
      setIsSuccess(true); 
      setTimeout(() => {
        navigate('/'); 
      }, 2500);

    } catch (err) {
      const msg = err.response?.data?.message || "Invalid OTP code";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendOtp(email);
      toast.success("A new code has been sent!");
      setTimer(30); 
    } catch (err) {
      toast.error("Failed to resend. Try again later.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <section style={{ backgroundImage: `url(${myImage})` }} className="h-screen bg-center bg-cover flex items-center justify-center relative">
      
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-appearance-in">
          <div className="bg-white p-10 rounded-[31px] border-[3px] border-[#036464] text-center shadow-2xl max-w-sm mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#036464] mb-2">Welcome to ONSY!</h2>
            <p className="text-gray-600 font-medium">Your account is verified. <br/> Redirecting you to home page...</p>
          </div>
        </div>
      )}

      <div className='w-full'>
        <form 
          onSubmit={handleVerify}
          className="w-145 mx-auto shadow-[0_0_66.6px_0_rgba(0,0,0,0.3)] px-6 mt-1 rounded-[31px] flex flex-col gap-4 border-[3px] border-[#036464E5] font-semibold content-center py-20 bg-white/10 backdrop-blur-md" 
          style={{ backgroundImage: `url(${myImage})` }}
        >
          <div className="mb-6">
            <h1 className="text-[40px] font-bold mt-0 text-black text-center">OTP verification</h1>
            <p className='text-gray-600 text-center font-normal text-[24px] mb-2'>
              Enter the code from the email we sent <br /> to <span className='text-black font-semibold'>{email}</span>
            </p>
          </div>

          <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType="text" 
            renderSeparator={<span className="w-4"></span>} 
            renderInput={(props) => (
              <input
                {...props}
                type="text"
                className="w-20! h-20! text-3xl font-bold text-white bg-[#036464] rounded-[20px] outline-none focus:ring-4 focus:ring-cyan-500  transition-all shadow-lg"
              />
            )}
          />
          </div>

          <Button 
            type="submit" 
            isLoading={isLoading}
            disabled={isSuccess}
            className="bg-[#036464E5] w-96 h-14 mx-auto rounded-xl py-6 mt-8 text-white text-xl hover:bg-[#264444e5] transition-all duration-300 ease-in-out font-bold"
          >
            {isLoading ? "Checking..." : "Verify & Login"}
          </Button>

          <p className='text-gray-500 text-center mt-6'>
            Didn't receive code?{" "}
            <button 
              type="button" 
              onClick={handleResend}
              disabled={timer > 0 || isResending}
              className={`font-bold underline ml-1 transition-all ${timer > 0 || isResending ? 'text-gray-400 no-underline cursor-not-allowed' : 'text-[#036464E5] cursor-pointer hover:text-[#264444e5]'}`}
            >
              {isResending ? "Sending..." : timer > 0 ? `Resend in ${timer}s` : "Resend Now"}
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}