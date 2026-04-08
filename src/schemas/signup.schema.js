import * as z from "zod";


  export const registerSchema= z.object({
      name:z.string().nonempty('name is required').min(3,'name must be at least 3 characters').max(10,'name must be no more than 10 characters'),
      username:z.string().nonempty('username is required').min(5,'username must be at least 5 characters').max(10,'username must be no more than 10 characters'),
      email:z.string().nonempty('email is required').email('enter a valid email'),
      password:z.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'enter a valid password'),
      rePassword:z.string().nonempty('please confirm password'),
      dateOfBirth:z.string().nonempty('date of birth is required').refine((date)=>{
        let currentYear= new Date().getFullYear();
        let selectedYear=new Date(date).getFullYear();
        let age= currentYear-selectedYear;
        return age >= 18;
        },"age is required to be no less than 18" )
      ,
      gender:z.enum(['female','male'],'choose female or male')
     }).refine((data)=>data.password === data.rePassword,{
        message:'password not matched',
        path:['rePassword']
     }
        ) 
  