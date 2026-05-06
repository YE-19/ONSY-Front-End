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
    <section className="flex overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      <motion.nav 
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="w-72 sm:w-80 h-screen flex flex-col gap-5 items-center pt-5 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="will-change-transform text-[#147E8F] dark:text-teal-400 pb-5 font-labrada text-[28px] lg:text-[40px] font-semibold cursor-pointer z-50 transition-colors"
          onClick={() => { navigate("/"); }}
        >
          ONSY
        </motion.div>

        <div className="flex flex-col gap-3 w-full px-4">
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="will-change-transform pl-4 text-slate-700 dark:text-slate-200 flex content-center items-center gap-3 h-11 w-full border border-[#036464] dark:border-teal-700 rounded-2xl cursor-pointer bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
          >
            <img src={victor1} alt="" />
            New chat
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="will-change-transform pl-4 text-slate-700 dark:text-slate-200 flex content-center items-center gap-3 h-11 w-full border border-[#036464] dark:border-teal-700 rounded-2xl cursor-pointer bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
            onClick={() => navigate('/Dashboard')}
          >
            <img src={victor2} alt="" />
            Dashboard
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="will-change-transform pl-4 text-slate-700 dark:text-slate-200 flex content-center items-center gap-3 h-11 w-full border border-[#036464] dark:border-teal-700 rounded-2xl cursor-pointer bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
            onClick={() => navigate('/Mood')}
          >
            <img src={victor2} alt="" />
            Mood
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="will-change-transform pl-4 text-slate-700 dark:text-slate-200 flex content-center items-center gap-3 h-11 w-full border border-[#036464] dark:border-teal-700 rounded-2xl cursor-pointer bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
            onClick={() => navigate('/EMotiv')}
          >
            <img src={victor3} alt="" />
            E-Motiv
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="will-change-transform pl-4 text-slate-700 dark:text-slate-200 flex content-center items-center gap-3 h-11 w-full border border-[#036464] dark:border-teal-700 rounded-2xl cursor-pointer bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
            onClick={() => navigate('/')}
          >
            <img src={victor4} alt="" />
            Profile
          </motion.button>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 4 }}
            whileTap={{ scale: 0.97 }}
            className="will-change-transform pl-4 text-slate-700 dark:text-slate-200 flex content-center items-center gap-3 h-11 w-full border border-[#036464] dark:border-teal-700 rounded-2xl cursor-pointer bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200"
            onClick={() => navigate('/')}
          >
            <img src={victor5} alt="" />
            Settings
          </motion.button>
        </div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full px-4 mt-2">
          <p className="flex justify-between text-lg font-semibold text-slate-800 dark:text-slate-200 pb-1">Chat history <img src={arrow} alt="" /></p>
          <motion.p whileHover={{ x: 5 }} className="flex gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm transition-colors">
            <img src={arrow} alt="" />You shared your feelings
          </motion.p>
          <motion.p whileHover={{ x: 5 }} className="flex gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm transition-colors">
            <img src={arrow} alt="" />You talked about stress
          </motion.p>
          <motion.p whileHover={{ x: 5 }} className="flex gap-1.5 cursor-pointer text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm transition-colors">
            <img src={arrow} alt="" />You checked your mood
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full px-4 mt-auto mb-6">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-4 flex flex-col gap-2 border border-slate-200 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-200">Free plan</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Unlock advanced features for better care.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="will-change-transform h-9 w-36 mx-auto mt-1 bg-gradient-to-r from-[#036464] to-teal-500 dark:from-teal-700 dark:to-teal-500 text-center text-white rounded-lg cursor-pointer font-semibold text-sm transition-all hover:shadow-md hover:shadow-teal-500/30"
            >
              Upgrade
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      <motion.div 
        variants={mainContentVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 h-screen bg-gradient-to-br from-[#147E8F] via-teal-700 to-cyan-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300"
      >
      </motion.div>
    </section>
    </>
  )
}

export default SpeakChatBot