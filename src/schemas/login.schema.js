import * as z from "zod";


  export const loginSchema= z.object({
      email:z.string().nonempty('email is required').email('enter a valid email'),
      password:z.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'enter a valid password'),
      
     }
        ) 