import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { Input } from "@material-tailwind/react";
import { gsap } from "gsap";
import Typewriter from 'typewriter-effect';

function SignUp() {

    useEffect(() => {
        const fireAnimation = gsap.fromTo('.man',{
            y:'10px'
        }, {
          y: '30px',
          duration: 1,
          repeat: -1,
          yoyo: true, 
        });
    
        
        return () => {
          fireAnimation.kill();
        };
      }, []);

     

  return (
    <div>
      <div className="signupContainer flex h-[100vh]">
        {/* Left Container */}
        <div className="leftContainer w-1/2 flex flex-col items-center">
          <Navbar />
          <form className="h-[50%] flex flex-col justify-evenly items-center ">
            {/* Form Heading */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign Up to Get Started</h1>
              <p className="text-gray-400 my-2 font-bold">Enter your email address to proceed.</p>
            </div>
            {/* Email Input */}
            <Input 
              className="rounded-md" 
              variant="outlined" 
              label="Email Address" 
              placeholder="Email Address" 
              color="blue" 
            />
            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 w-[100%] text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200">
              Proceed
            </button>
            {/* Sign In Link */}
            <p>
              Already have an account? 
              <a href="/sign-in" className="text-blue-600 p-2 cursor-pointer">Sign In</a>
            </p>
          </form>
        </div>
        {/* Right Container */}
        <div className="rightContainer w-1/2 bg-customBlack flex justify-center text-center items-center">
          <div className="flex flex-col text-white text-2xl font-bold p-4 w-full items-center">
            {/* Typewriter Effect */}
            <h1 className=''>New Age Documents</h1>
            <Typewriter
              options={{
                strings: [`that Will Change the Way You Work`, 'for Powerful External & Internal Wikis|', 'that Will Change the Way You Work|'],
                autoStart: true,
                loop: true,
              }}
            />
            {/* Display Images */}
            <img className='man ' src="/assets/3d-icon/man.png" alt="3D Fire" />
            
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
