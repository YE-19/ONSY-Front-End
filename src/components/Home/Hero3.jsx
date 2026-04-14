import React from 'react';
import { motion } from 'framer-motion';
import icon from '../../assets/iconP.png';
import fram1 from '../../assets/frame1.png';
import fram2 from '../../assets/frame2.png';
import fram3 from '../../assets/frame3.png';
import fram4 from '../../assets/frame4.png';
import fram5 from '../../assets/frame5.png';

const Hero3 = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const imageFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } }
  };

  return (
    <section className='w-full bg-[#147E8F] py-5 px-30 relative overflow-hidden'>
      {/* Background Images - Fade In Only */}
      <motion.img initial="hidden" whileInView="visible" variants={imageFade} src={fram1} alt="" className='w-125 h-125 -top-1 right-0 overflow-hidden absolute' />
      <motion.img initial="hidden" whileInView="visible" variants={imageFade} src={fram2} alt="" className='w-125 h-125 bottom-0 left-0 overflow-hidden absolute' />
      <motion.img initial="hidden" whileInView="visible" variants={imageFade} src={fram3} alt="" className='w-125 h-125 -top-1 left-0 overflow-hidden absolute' />
      <motion.img initial="hidden" whileInView="visible" variants={imageFade} src={fram4} alt="" className='w-125 h-125 bottom-0 right-120 overflow-hidden absolute' />
      <motion.img initial="hidden" whileInView="visible" variants={imageFade} src={fram5} alt="" className='w-125 h-125 bottom-0 right-0 overflow-hidden absolute' />

      <div className='flex justify-between'>
        {/* Left Side: Content & Cards */}
        <motion.div 
          className='flex flex-col gap-12 w-154.75 relative z-10'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className='font-gabarito text-6xl w-154.75 flex flex-col gap-6 pt-8 text-[#111111] z-10'>
            <b>Your Personal</b>
            <b className='text-[#FEFDFE]'>Mental Companion</b>
            <b>Is Always Here</b>
          </motion.h2>

          <motion.p variants={fadeInUp} className='text-[28px] text-[#FEFDFE]'>
            More than a chatbot — ONSY listens deeply, understands context, detects hidden emotions, and adapts its responses to what you truly need in the moment.
          </motion.p>

          <div className='flex flex-col gap-9 z-10'>
            {/* Feature Cards with individual animation */}
            <motion.div variants={fadeInUp} className='p-7 w-154.75 h-40.5 bg-[#FEFDFE] border-[0.5px] border-onsy-primary shadow-md shadow-[#618475] rounded-2xl transition-all duration-300 ease-in-out  hover:-translate-y-2 '>
            <h3 className='py-1.5 text-2xl font-sans font-semibold text-[#111111]'>1. Emotion-Aware Responses</h3>
              <p className='py-1.5 text-[#5F5F5F]'>Every conversation builds a deeper model of who you are — your triggers, your patterns, your growth.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className='p-7 w-154.75 h-40.5 bg-[#FEFDFE] border-[0.5px] border-onsy-primary shadow-md shadow-[#618475] rounded-2xl  transition-all duration-300 ease-in-out  hover:-translate-y-2'>
              <h3 className='py-1.5 text-2xl font-sans font-semibold text-[#111111]'>2. Learns Over Time</h3>
              <p className='py-1.5 text-[#5F5F5F]'>The AI detects anxiety, sadness, or joy in your words and responds appropriately — never robotic, always human.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className='p-7 w-154.75 h-40.5 bg-[#FEFDFE] border-[0.5px] border-onsy-primary shadow-md shadow-[#618475] rounded-2xl  transition-all duration-300 ease-in-out  hover:-translate-y-2'>
              <h3 className='py-1.5 text-2xl font-sans font-semibold text-[#111111]'>3. Private & Secure</h3>
              <p className='py-1.5 text-[#5F5F5F]'>End-to-end encrypted. Your thoughts stay yours — never shared, never trained on without consent.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Chat Section */}
        <motion.div 
          className='flex-col mt-72 w-146 z-10'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Chat Bubble 1 */}
          <motion.div variants={fadeInUp} className='flex my-5'>
            <div className='bg-[#618475] w-16 h-16 rounded-4xl flex justify-center items-center'>
              <p className='text-5xl pb-1.5 text-white font-labrada'>ONSY</p>
            </div>
            <div className='w-104 bg-[#618475] rounded-b-2xl rounded-r-2xl ml-10 mt-8 text-[#FFFFFF] p-3'>
              Good morning! I noticed from your brainwave data that your focus is lower than usual today. How are you feeling? 🌤️
            </div>
          </motion.div>

          {/* User Bubble 1 */}
          <motion.div variants={fadeInUp} className='justify-self-end-safe flex gap-10 my-5'>
            <div className='w-104 bg-white rounded-b-2xl rounded-l-2xl mt-8 p-3 text-[#111111]'>
              Honestly, I didn't sleep well and I'm anxious about my presentation
            </div>
            <img src={icon} alt="Icon 1" className="w-18 h-18" />
          </motion.div>

          {/* Chat Bubble 2 */}
          <motion.div variants={fadeInUp} className='flex my-5'>
            <div className='bg-[#618475] w-16 h-16 rounded-4xl flex justify-center items-center'>
              <p className='text-5xl pb-1.5 text-white font-labrada'>ONSY</p>
            </div>
            <div className='w-104 text-[#FFFFFF] bg-[#618475] rounded-b-2xl rounded-r-2xl ml-10 mt-8 p-3'>
              That's completely understandable. Pre-presentation anxiety is your mind preparing you — it means you care. Let's do a quick breathing exercise to ground you first. Ready?
            </div>
          </motion.div>

          {/* User Bubble 2 */}
          <motion.div variants={fadeInUp} className='justify-self-end-safe flex gap-10 my-5'>
            <div className='w-104 p-3 pl-6 bg-white rounded-b-2xl rounded-l-2xl mt-8 text-[#111111]'>
              Yes please, I could use that right now
            </div>
            <img src={icon} alt="Icon 1" className="w-18 h-18" />
          </motion.div>

          {/* Chat Bubble 3 */}
          <motion.div variants={fadeInUp} className='flex my-5'>
            <div className='bg-[#618475] w-16 h-16 rounded-4xl flex justify-center items-center'>
              <p className='text-5xl pb-1.5 text-white font-labrada'>ONSY</p>
            </div>
            <div className='w-104 text-[#FFFFFF] p-3 bg-[#618475] rounded-b-2xl rounded-r-2xl ml-10 mt-8'>
              Inhale for 4 counts… hold for 4… exhale for 6. You've got this. 💙
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3;