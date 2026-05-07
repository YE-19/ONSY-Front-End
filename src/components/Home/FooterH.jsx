import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaRegEnvelope, FaPhoneAlt } from 'react-icons/fa';

const FooterH = () => {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 pt-16 pb-8 px-6 md:px-24 font-gabarito text-[#667085] dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-10 lg:mb-16">
        
        {/* Brand & Socials */}
        <div className="lg:col-span-1">
          <h2 className="text-[#147E8F] dark:text-teal-400 font-labrada text-4xl lg:text-5xl font-bold mb-4">ONSY</h2>
          <p className="mb-6 text-sm italic text-slate-500 dark:text-slate-400">"You Talk. We Understand."</p>
          <div className="flex gap-4 text-[#147E8F] dark:text-teal-400">
            <FaFacebookF className="cursor-pointer hover:text-[#036464] dark:hover:text-teal-300 transition-colors" />
            <FaTwitter className="cursor-pointer hover:text-[#036464] dark:hover:text-teal-300 transition-colors" />
            <FaInstagram className="cursor-pointer hover:text-[#036464] dark:hover:text-teal-300 transition-colors" />
            <FaLinkedinIn className="cursor-pointer hover:text-[#036464] dark:hover:text-teal-300 transition-colors" />
            <FaYoutube className="cursor-pointer hover:text-[#036464] dark:hover:text-teal-300 transition-colors" />
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-[#111111] dark:text-slate-200 font-bold mb-4 lg:mb-6 text-xl">Product</h3>
          <ul className="space-y-3 lg:space-y-4 text-sm">
            {['Features', 'Pricing', 'Case studies', 'Reviews', 'Updates'].map((item) => (
              <li key={item} className="hover:text-[#147E8F] dark:hover:text-teal-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[#111111] dark:text-slate-200 font-bold mb-4 lg:mb-6 text-xl">Company</h3>
          <ul className="space-y-3 lg:space-y-4 text-sm">
            {['About', 'Contact us', 'Careers', 'Culture', 'Blog'].map((item) => (
              <li key={item} className="hover:text-[#147E8F] dark:hover:text-teal-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-[#111111] dark:text-slate-200 font-bold mb-4 lg:mb-6 text-xl">Support</h3>
          <ul className="space-y-3 lg:space-y-4 text-sm">
            {['Getting started', 'Help center', 'Server status', 'Report a bug', 'Chat support'].map((item) => (
              <li key={item} className="hover:text-[#147E8F] dark:hover:text-teal-400 cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#111111] dark:text-slate-200 font-bold mb-4 lg:mb-6 text-xl">Contact us</h3>
          <ul className="space-y-3 lg:space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaRegEnvelope className="text-lg text-[#147E8F] dark:text-teal-400" />
              <span>contact@company.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-lg text-[#147E8F] dark:text-teal-400" />
              <span>(414) 687 - 5892</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] lg:text-xs tracking-wide">
        <p className="text-slate-500 dark:text-slate-500">Copyright © 2026 ONSY</p>
        <div className="flex flex-wrap justify-center gap-2 mt-4 md:mt-0 text-center">
          <span>All Rights Reserved |</span>
          <a href="#" className="underline hover:text-[#147E8F] dark:hover:text-teal-400 transition-colors">Terms and Conditions</a>
          <span className="hidden sm:inline">|</span>
          <a href="#" className="underline hover:text-[#147E8F] dark:hover:text-teal-400 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterH;