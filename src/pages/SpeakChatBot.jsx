import React from 'react'
import { motion } from 'framer-motion'
import victor1 from '../assets/Vector1.png'
import victor2 from '../assets/Vector2.png'
import victor3 from '../assets/Vector3.png'
import victor4 from '../assets/Vector4.png'
import victor5 from '../assets/Vector5.png'
import arrow from '../assets/mdi_arrow.png'
import { useNavigate } from 'react-router-dom';

const sidebarVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1, 
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const mainContentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } 
  },
}

const SpeakChatBot = () => {
  const navigate = useNavigate();

  return (
    <>
    <section className='flex overflow-hidden'>
      <motion.nav 
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className='w-90 h-screen flex flex-col gap-5 items-center pt-4'
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='will-change-transform text-[#147E8F] pb-7 font-labrada text-[30px] lg:text-[48px] font-semibold cursor-pointer z-50'
          onClick={() => { navigate("/"); /* setIsOpen(false); */ }}
        >
          ONSY
        </motion.div>

        <div className='flex flex-col gap-4'>
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer'
          >
            <img src={victor1} alt="" />
            New chat
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer'
            onClick={ () => navigate('/Dashboard')}
          >
            <img src={victor2} alt="" />
            Dashboard
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer'
            onClick={ () => navigate('/Mood')}
          >
            <img src={victor2} alt="" />
            Mood
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer'
            onClick={ () => navigate('/EMotiv')}
          >
            <img src={victor3} alt="" />
            E-Motiv
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer'
            onClick={ () => navigate('/')}
          >
            <img src={victor4} alt="" />
            Profile
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform pl-4 text-[#111111] flex content-center items-center gap-3 h-10 w-64 border border-[#036464E5] rounded-4xl cursor-pointer'
            onClick={ () => navigate('/')}
          >
            <img src={victor5} alt="" />
            Settings
          </motion.button>
        </div>

        <motion.div variants={itemVariants} className='flex flex-col gap-5 w-64 mt-4'>
          <p className='flex justify-between text-[20px] pb-2'>Chat history <img src={arrow} alt="" /></p>
          <motion.p whileHover={{ x: 5 }} className='flex gap-1.5 cursor-pointer text-[#5F5F5F] hover:text-black'>
            <img src={arrow} alt="" />You shared your feelings
          </motion.p>
          <motion.p whileHover={{ x: 5 }} className='flex gap-1.5 cursor-pointer text-[#5F5F5F] hover:text-black'>
            <img src={arrow} alt="" />You talked about stress
          </motion.p>
          <motion.p whileHover={{ x: 5 }} className='flex gap-1.5 cursor-pointer text-[#5F5F5F] hover:text-black'>
            <img src={arrow} alt="" />You checked your mood
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className='w-64 h-32 p-4 bg-[#D2D2D25E] rounded-3xl flex flex-col gap-1 mt-auto mb-6'>
          <h2 className='font-semibold'>Free plan</h2>
          <p className='text-[12px] text-[#5F5F5F] font-medium'>Unlock advanced features for better care.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='will-change-transform h-9 w-40 mx-auto mt-2 bg-[#036464E5] text-center text-white rounded-[6px] cursor-pointer'
          >
            Upgrade
          </motion.button>
        </motion.div>
      </motion.nav>

      <motion.div 
        variants={mainContentVariants}
        initial="hidden"
        animate="visible"
        className='w-screen h-screen bg-[#147E8F]'
      >
      </motion.div>
    </section>
    </>
  )
}

export default SpeakChatBot