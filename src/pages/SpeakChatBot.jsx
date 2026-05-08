import React, { useState } from 'react';
import { motion } from 'framer-motion'
import victor1 from '../assets/Vector1.png'
import victor2 from '../assets/Vector2.png'
import victor3 from '../assets/Vector3.png'
import victor4 from '../assets/Vector4.png'
import victor5 from '../assets/Vector5.png'
import arrow from '../assets/mdi_arrow.png'
import { useNavigate } from 'react-router-dom';
import { chatService } from '../services/chatService';

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

  const [userInput, setUserInput] = useState(""); // لتخزين ما يكتبه المستخدم
  const [messages, setMessages] = useState([]);  // لتخزين سجل المحادثة
  const [loading, setLoading] = useState(false); // حالة انتظار الرد

  const handleSend = async () => {
    if (!userInput.trim()) return; // منع الإرسال لو الكلام فاضي

    const newMsg = { role: "user", text: userInput };
    setMessages((prev) => [...prev, newMsg]);
    setUserInput(""); // مسح الخانة بعد الإرسال
    setLoading(true);

    try {
      const data = await chatService.sendMessage(userInput);
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("حدث خطأ في الإرسال:", error);
    } finally {
      setLoading(false);
    }
  };
  // --- نهاية الـ Logic ---

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
  className="flex-1 h-screen flex flex-col items-center justify-between p-8 text-white relative overflow-hidden"
  style={{
    background: `
      radial-gradient(circle at bottom, rgba(255, 255, 255, 0.7) 0%, transparent 70%),
      radial-gradient(circle at top right, rgba(255, 255, 255, 0.6) 0%, transparent 60%),
      linear-gradient(180deg, #147E8F 0%, #0D5864 100%)
    `,
    backgroundBlendMode: 'screen'
  }}
>

  <div 
    style={{
      position: 'absolute',
      bottom: '-150px', 
      left: '50%',
      transform: 'translateX(-50%)',
      width: '1142px', 
      height: '446px',
      backgroundColor: '#FFFFFF',
      opacity: '0.64', 
      filter: 'blur(213px)', 
      borderRadius: '50%', 
      pointerEvents: 'none'
    }}
 ></div>
  {/* اللوجو الكبير في النصا */}
<div className="flex-1 flex flex-col items-center justify-center mb-60">
  <h1 
    className="font-labrada font-[600] text-white opacity-150 leading-none tracking-normal"
    style={{ fontSize: '128px' }}
  >
    ONSY
  </h1>
  <p 
  className="font-inter font-[600] text-black opacity-90 tracking-wide mt-6 text-center"
  style={{ fontSize: '32px', lineHeight: '100%' }}
>
  I'm here to listen, what's going on?
</p>
</div>

{/*  صندوق الشات - Chat Input Container */}
<div className="w-full flex justify-center px-4 absolute bottom-[180px] z-20"> {/* رفعنا الـ bottom من 100 لـ 180 */}
  <div 
    style={{ 
      width: '850px',         
      height: '90px',           
      backgroundColor: '#FEFDFE', 
      borderRadius: '30px',   
    }}
    className="flex items-center px-6 shadow-xl relative border border-white/20"
  >
    {/* أيقونة الإضافة (+) */}
    <button className="text-slate-400 hover:text-[#147E8F] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>

    {/* حقل النص - Input Field */}
    <input 
      type="text" 
      placeholder="Let's talk—what's been on your mind?" 
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      className="flex-1 bg-transparent border-none focus:ring-0 text-[#147E8F] placeholder-slate-400 px-4 font-inter font-[500]"
      style={{ 
        fontSize: '22px',     
        lineHeight: '100%' 
      }}
    />

    {/* زر الإرسال ة */}
<button
  className="bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-1.5 px-5 py-2.5 h-[46px]"
  onClick={handleSend}
  disabled={loading}
>
  {/* أيقونة الطائرة الورقية */}
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-4 w-4 rotate-[50deg]" 
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
  
  {/* كلمة Send واحدة فقط مع حالة التحميل */}
  <span className="font-semibold text-sm">
    {loading ? "..." : "Send"}
  </span>
</button>
  </div>
</div>
    
    
</motion.div>
    </section>
    </>
  )
}

export default SpeakChatBot