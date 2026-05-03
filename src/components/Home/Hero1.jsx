import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// ── إعدادات حركة العناصر ──────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // تأخير بسيط بين ظهور كل عنصر والذي يليه
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const Hero1 = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 position-absolute bg-hero lg:bg-hero bg-cover bg-center h-screen w-full max-md:bg-none">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='m-30 flex gap-4 flex-col md:m-16 lg:m-30 max-md:m-0 max-md:mt-32 max-md:items-center max-md:text-center max-md:px-4'
      >
        
        <motion.h1 
          variants={itemVariants}
          className='text-[80px] md:text-6xl lg:text-[80px] font-medium w-147 h-72 leading-24 font-Gabarito text-6xl bg-linear-to-br from-[#020103] via-onsy-primary to-onsy-secondary bg-clip-text text-transparent animate-text-flow max-md:text-4xl max-md:w-auto max-md:h-auto max-md:leading-tight'
        >
          Ai That Helps Your Mental Health 
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className='font-medium mt-8 lg:mt-8 text-lg lg:text-[24px] max-w-xl'
        >
          Open up, express your feelings, and get AI <br className='hidden lg:block'></br>
          support to understand emotions, reduce stress, <br className='hidden lg:block'></br>
          and build a healthier mindset.
        </motion.p>
        
        <motion.button 
          variants={itemVariants}
          onClick={() => navigate("/SignIn")} 
          className='cursor-pointer w-45 h-12 bg-[#036464E5] sm:w-45 text-[#FFFFFF] rounded-xl font-semibold transition-all duration-300 ease-in-out hover:scale-110'
        >
          Get Started
        </motion.button>
        
      </motion.div>
    </section>
  )
}

export default Hero1