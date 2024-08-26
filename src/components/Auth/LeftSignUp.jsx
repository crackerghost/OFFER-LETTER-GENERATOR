import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import { Input } from '@material-tailwind/react';
import axios from 'axios';
import url from '../../utils/api';
import { Link } from 'react-router-dom';

function LeftSignUp({ page }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [opt,setOpt] = useState(localStorage.getItem('page'))

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    sendEmail();
  };
  const pages = (page)=>{
    localStorage.setItem('page',page)
    setOpt(page)
}
  const sendEmail = async () => {
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="leftContainer w-1/2 flex flex-col items-center">
      <Navbar />
      <form onSubmit={handleSubmit} className="h-[50%] flex flex-col justify-evenly items-center">
        {/* Form Heading */}
        <div className="text-center">
        {opt=="signup"? <h1 className="text-3xl font-bold">Sign Up to Get Started</h1>:<h1 className="text-3xl font-bold">Welcome Back! Please Sign In</h1>}
         
          <p className="text-gray-400 my-2 font-bold">Enter your email address to proceed.</p>
        </div>
        {/* Email Input */}
        <Input
          className="rounded-md"
          variant="outlined"
          label="Email Address"
          placeholder="Email Address"
          color="blue"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white transition-all duration-200 ${loading ? 'bg-blue-300 cursor-wait' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center animate-spin">
              <img width={"25px"} src="/assets/arrows.png" alt="" />
            </span>
          ) : (
            'Proceed'
          )}
        </button>
        {/* Sign In Link */}

       {opt=="signup"? <p>
          Already have an account?{' '}
          <Link to="/auth/proceed" onClick={()=>{
                    pages('signin')
                  }} className="text-blue-600 p-2 cursor-pointer">
          Sign In
          </Link>
         
        </p>: <p>
          Dont have an account?{' '}
          <Link to="/auth/proceed" onClick={()=>{
                    pages('signup')
                  }}  className="text-blue-600 p-2 cursor-pointer">
          Sign Up
          </Link>
      
        </p>}
      </form>
    </div>
  );
}

export default LeftSignUp;
