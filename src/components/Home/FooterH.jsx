import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaRegEnvelope, FaPhoneAlt } from 'react-icons/fa';

const FooterH = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8 px-6 md:px-24 font-gabarito text-[#667085]">
      {/* Top Section: Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        
        {/* Column 1: Brand & Socials */}
        <div className="lg:col-span-1">
          <h2 className="text-[#147E8F] font-labrada text-5xl font-bold mb-4">ONSY</h2>
          <p className="mb-6 text-sm italic">“You Talk. We Understand.”</p>
          <div className="flex gap-4 text-onsy-primary">
            <FaFacebookF className="cursor-pointer hover:text-onsy-secondary transition-colors" />
            <FaTwitter className="cursor-pointer hover:text-onsy-secondary transition-colors" />
            <FaInstagram className="cursor-pointer hover:text-onsy-secondary transition-colors" />
            <FaLinkedinIn className="cursor-pointer hover:text-onsy-secondary transition-colors" />
            <FaYoutube className="cursor-pointer hover:text-onsy-secondary transition-colors" />
          </div>
        </div>

        {/* Column 2: Product */}
        <div>
          <h3 className="text-black font-bold mb-6 text-xl">Product</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Features</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Case studies</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Reviews</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Updates</li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-black font-bold mb-6 text-xl">Company</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">About</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Contact us</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Culture</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Blog</li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h3 className="text-black font-bold mb-6 text-xl">Support</h3>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Getting started</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Help center</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Server status</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Report a bug</li>
            <li className="hover:text-onsy-primary cursor-pointer transition-colors">Chat support</li>
          </ul>
        </div>

        {/* Column 5: Contacts us */}
        <div>
          <h3 className="text-black font-bold mb-6 text-xl">Contacts us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaRegEnvelope className="text-lg" />
              <span>contact@company.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-lg" />
              <span>(414) 687 - 5892</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright & Links */}
      <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
        <p>Copyright © 2026 ONSY</p>
        <div className="flex gap-2 mt-4 md:mt-0">
          <span>All Rights Reserved |</span>
          <a href="#" className="underline hover:text-onsy-primary">Terms and Conditions</a>
          <span>|</span>
          <a href="#" className="underline hover:text-onsy-primary">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterH