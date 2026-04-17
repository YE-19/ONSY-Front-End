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
  .min(8, "The password must have (Minimum 8 characters, Maximum 20 characters, One uppercase letter, One lowercase letter, One number)")
  .max(20, "The password must have (Minimum 8 characters, Maximum 20 characters, One uppercase letter, One lowercase letter, One number)") 
  .regex(/[A-Z]/, "The password must have (Minimum 8 characters, Maximum 20 characters, One uppercase letter, One lowercase letter, One number)")
  .regex(/[a-z]/, "The password must have (Minimum 8 characters, Maximum 20 characters, One uppercase letter, One lowercase letter, One number)")
  .regex(/[0-9]/, "The password must have (Minimum 8 characters, Maximum 20 characters, One uppercase letter, One lowercase letter, One number)"),
    
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});