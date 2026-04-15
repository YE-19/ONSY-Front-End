import axiosInstance from '../utils/axiosInstance';
import { setToken } from '../utils/cookieUtils';

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', otpData);
    if (response.data.token) setToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post('/auth/signin', credentials);
    if (response.data.token) {
        setToken(response.data.token);
    }
    return response.data;
   };

export const resendOtp = async (email) => {
    const response = await axiosInstance.post('/auth/resend-otp', { email });
    return response.data;
  };