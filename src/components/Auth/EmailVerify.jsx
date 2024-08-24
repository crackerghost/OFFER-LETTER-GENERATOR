import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Navbar from './Navbar/Navbar';

function EmailVerify() {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(otp.length>3){
        alert('success')
        console.log(otp)
    }else{
        alert('invalid')
    }
   
  };

  return (
    <div className="leftContainer w-1/2 flex flex-col items-center">
      <Navbar />
      <form onSubmit={handleSubmit} className="h-[50%] flex flex-col justify-evenly items-center">
        {/* Form Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify Email Address</h1>
          <p className="text-gray-400 my-2 font-bold">Enter OTP sent to your email address.</p>
        </div>
        {/* OTP Input */}
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle={{
            width: '3rem', // Set a fixed width for better visibility
            height: '3rem', // Set a fixed height for better visibility
            margin: '0 0.5rem', // Add some margin for spacing
            fontSize: '1.5rem', // Increase font size for better visibility
            borderRadius: '0.5rem', // Slightly round the corners
            border: '1px solid #ccc', // Add a light border for definition
            textAlign: 'center', // Center the text in each input
            outline: 'red',
        
          }}
          inputType='tel'
          renderSeparator={<span className='w-2'></span>} // Adjust width as needed
          renderInput={(props) => <input {...props} />}
        />
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200">
          Verify
        </button> 
      </form>
    </div>
  );
}

export default EmailVerify;
