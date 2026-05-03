import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bgl from '../../assets/hero5l.png'
import bgr from '../../assets/hero5r.png'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const imageLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const imageRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const Hero5 = () => {

  const navigate = useNavigate();

  return (
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // الأنيميشن يشتغل لما 30% من السكشن يظهر
        className='w-full h-auto py-20 lg:py-0 lg:h-80 bg-[#147E8F] relative overflow-hidden flex items-center justify-center lg:content-center'
      >
        <motion.img variants={imageLeftVariants} src={bgr} alt="" className='absolute left-0 hidden md:block will-change-transform'/>
        <motion.img variants={imageRightVariants} src={bgl} alt="" className='absolute right-0 hidden md:block will-change-transform'/>
        
        <motion.div 
          variants={containerVariants}
          className='px-6 lg:px-60 flex flex-col items-center gap-10 lg:gap-16 z-10'
        >
          <motion.h2 
            variants={itemVariants}
            className='will-change-transform text-3xl lg:text-5xl font-bold font-labrada text-[#FEFDFE] text-center leading-tight'
          >
            You're not alone. Let's talk With <span className='text-4xl lg:text-6xl text-[#111111]'>ONSY.</span> 
          </motion.h2>

          <div className='flex flex-col lg:flex-row text-xl lg:text-2xl font-bold gap-6 lg:gap-10 w-full items-center justify-center'>
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='will-change-transform w-full max-w-84 lg:w-84 h-16 rounded-2xl bg-[#036464E5] text-[#111111] shadow-[0_0_15px_3px_#FFFFFF80] cursor-pointer'
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </motion.button>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='will-change-transform w-full max-w-84 lg:w-84 h-16 rounded-2xl text-white border border-[#111111] cursor-pointer'
              onClick={() => navigate("/SignIn")}
            >
              Log In
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
  )
}

export default Hero5