import React from "react";
import { Link } from "react-router-dom";
import heroimg from '../assets/heroimg.png';

const Hero = () => {
  return (
    <div className="relative w-full">
    
      <img src={heroimg} alt="Hero" className="w-full h-screen object-cover" />
<div className="bg-black opacity-30 absolute inset-0"></div>
<div className="absolute top-0 p-10 text-4xl  z-40 text-white font-bold font-serif">RASKHAAS</div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <p className="mainfont text-3xl md:text-5xl text-white uppercase">
          Meet our industry expert
        </p>

        {/* Divider Lines */}    <div className="flex space-x-3 pt-3">
          <div className="h-0.5 w-4 md:w-20 bg-white"></div>
          <div className="h-0.5 w-20 md:w-40 bg-white"></div>
          <div className="h-0.5 w-8 md:w-20 bg-white"></div>
          <div className="h-0.5 w-4 md:w-10 bg-white"></div>
        </div>

       
        <div className="md:max-w-4xl  ">
          <p className="text-md text-gray-100 mb-10 mt-8">
          Connect with experienced professionals from various fields and gain valuable insights. Book a free consultation and take the next step in your journey with expert guidance.
          </p>

        
          <Link 
            to={'/all-users'} 
            className="bg-white  text-[#2c7f75] font-bold px-10 py-2 mt-4 rounded-md hover:bg-gray-200 transition"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
