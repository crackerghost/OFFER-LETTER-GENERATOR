import React, { useEffect, useState } from 'react';

import { gsap } from "gsap";
import Typewriter from 'typewriter-effect';
import LeftSignUp from './LeftSignUp';
import EmailVerify from './EmailVerify';

function SignUp() {
    
    const [page,setPage] = useState('')

    const changePage = (page)=>{
              setPage(page)
    }

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
        {page ==''? <LeftSignUp page={changePage}/>:<EmailVerify/>}
        
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
