import React, { useState } from 'react'
import Navbar from './Navbar/Navbar';
import { Input } from "@material-tailwind/react";
import axios from 'axios';
import url from '../../utils/api';

function LeftSignUp({page}) {
 
     const [email,setEmail] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        localStorage.setItem('email',email)
        sendEmail()
       
    }
    const sendEmail = async () => {
      try {
        const response = await axios.post(`${url.url}/sendEmailOtp`, {
          email: email
        });
    
        if (response.status === 200) {
          console.log('OTP sent successfully');
      
          page('verify'); 
        } else {
          console.log('Failed to send OTP');
       
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
    
      }
    };
  return (
    <div className="leftContainer w-1/2 flex flex-col items-center">
    <Navbar />
    <form onSubmit={handleSubmit} className="h-[50%] flex flex-col justify-evenly items-center ">
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
        type='email'
        value={email}
        required
        onChange={((e)=>{
         setEmail(e.target.value)
        })}
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
  )
}

export default LeftSignUp