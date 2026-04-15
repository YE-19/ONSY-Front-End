import * as z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  
  dateOfBirth: z.string().min(1, "Date of birth is required").refine((date) => {
    const currentYear = new Date().getFullYear();
    const selectedYear = new Date(date).getFullYear();
    const age = currentYear - selectedYear;
    return age >= 18;
  }, "You must be at least 18 years old"),

  gender: z.string().min(1, "Please select your gender").refine(
    (val) => ["male", "female"].includes(val),
    "Please select a valid gender"
  ),

  password: z
  .string()
  .min(8, "Minimum 8 characters")
  .max(20, "Maximum 20 characters") 
  .regex(/[A-Z]/, "One uppercase letter")
  .regex(/[a-z]/, "One lowercase letter")
  .regex(/[0-9]/, "One number")
  .regex(/[^A-Za-z0-9]/, "One special character"),
    
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});