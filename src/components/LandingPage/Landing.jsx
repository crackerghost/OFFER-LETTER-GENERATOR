import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Logo from "../Common/Logo";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const [showMain, setShowMain] = useState(false);
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const headerContentRef = useRef(null);
  const floatRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Logo animation sequence
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 300 }, // Start from bottom
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 } // Animate to center
      );

      gsap.to(logoRef.current, {
        opacity: 0,
        y: -300,
        duration: 1,
        ease: "power2.in",
        delay: 2, // Animate out to the top
      });
    }

    const timer = setTimeout(() => {
      setShowMain(true);
    }, 3000); // Show main content after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showMain) return;

    // Navbar animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.5 }
      );
    }

    // Black background content animation
    if (headerContentRef.current) {
      gsap.fromTo(
        headerContentRef.current,
        { opacity: 0, y: 500 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
      );
    }

    // Scroll-triggered animations for sections
    sectionRefs.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%", // Trigger when the top of the section hits 80% of the viewport height
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, [showMain]);

  useEffect(() => {
    // Consolidated floating animation for images
    floatRefs.forEach((ref) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { y: "10px" },
          {
            y: "30px",
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        );
      }
    });

    return () => {
      // Properly kill GSAP animations on component unmount
      floatRefs.forEach((ref) => {
        if (ref.current) {
          gsap.killTweensOf(ref.current);
        }
      });
    };
  }, []);

  const page = (page)=>{
         localStorage.setItem('page',page)
  }
  return (
    <div className="overflow-x-hidden">
      <style>
        {`
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #555; /* Dark grey */
            border-radius: 10px;
          }

          .section {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
          }

          .section.in-view {
            opacity: 1;
            transform: translateY(0);
          }
        `}
      </style>

      {!showMain ? (
        <div className="flex items-center bg-[--bggrey--] justify-center min-h-screen">
          <div
            ref={logoRef}
            className="logo text-3xl font-bold text-white text-center w-full flex flex-col justify-center items-center"
          >
            <Logo width={"600"} height={"150"} />
            <p>360Forge</p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center bg-gray-200">
          <nav
            ref={navRef}
            className="nav mt-4 flex justify-between w-[95%] rounded-3xl bg-white items-center p-3"
          >
            <div className="flex text-xl justify-start items-center font-bold w-[10%]">
              <Logo width={"241"} height={"50"} />
              <p>360Forge</p>
            </div>
            <ul className="flex w-[60%] font-bold space-x-6 text-sm cursor-pointer">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
            <div className="w-[15%] flex justify-between items-center">
              <Link
                to="/auth/proceed"
                className="border-[1px] p-2 text-sm rounded-xl w-[40%] flex justify-center items-center"
                onClick={()=>{
                  page('signin')
                }}
              >
                <button className="">Sign In</button>
              </Link>

              <Link
                to="/auth/proceed"
                className="bg-black text-white p-2 text-sm rounded-xl w-[50%] flex justify-center items-center"
                onClick={()=>{
                  page('signup')
                }}
              >
                <button className="">Get Started</button>
              </Link>
            </div>
          </nav>
          <header
            ref={headerContentRef}
            className="header header-content bg-customBlack text-white h-[100vh] w-[95%] rounded-3xl mx-4 mt-5"
          >
            <div className="flex items-center justify-center h-full text-center">
              <div className="h-full p-4 flex flex-col justify-around">
                <img
                  ref={floatRefs[0]}
                  className="float -translate-y-[20%] -translate-x-[100%]"
                  src="./assets/3d-icon/3d-fire.png"
                  alt=""
                />
                <img
                  ref={floatRefs[1]}
                  className="float2"
                  src="./assets/3d-icon/chart.png"
                  alt=""
                />
              </div>
              <div className="flex h-full flex-col justify-evenly items-center">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-[50%] bg-gray-600 backdrop-blur-xl border border-gray-200 rounded-xl p-2">
                    <Typewriter
                      options={{
                        strings: [
                          `Generate Professional Offer Letters`,
                          `Quickly and Easily`,
                          `Tailored for Your Hiring Needs`,
                          `Streamline Your Recruitment Process`,
                          `Craft Customizable Letters in Minutes`,
                        ],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </div>
                  <h1 className="text-[52px] font-bold mb-2">
                    Create Customized Offer Letters <br /> in Minutes{" "}
                  </h1>
                  <p className="text-sm text-gray-500 mb-4">
                    Say goodbye to manual drafting! Our Offer Letter Generator
                    helps you create professional, customized offer letters in
                    minutes.<br></br> Designed for busy HR teams, it ensures
                    accuracy, consistency, and a seamless hiring experience for
                    new employees.
                  </p>
                </div>
                <div className="flex w-[20vw] justify-evenly">
                  <Link to="/auth/proceed"
                   onClick={()=>{
                    page('signup')
                  }}
                  className="border-[1px] bg-white text-black font-bold p-4 text-sm rounded-xl w-[45%]">
                  <button>
                    Get Started
                  </button>
                  </Link>
                  <Link className="border-[1px] font-bold p-4 text-sm rounded-xl w-[45%]">
                  <button >
                    How it Works
                  </button>
                  </Link>
                 
                </div>
              </div>
              <div className="h-full flex flex-col justify-evenly">
                <img
                  ref={floatRefs[2]}
                  className="float3"
                  src="./assets/3d-icon/mag.png"
                  alt=""
                />
                <img
                  ref={floatRefs[3]}
                  className="float4 -translate-x-[100px] translate-y-[10%]"
                  src="./assets/3d-icon/pad.png"
                  alt=""
                />
              </div>
            </div>
          </header>

          {/* Separate sections that appear on scroll */}
          <div ref={sectionRefs[0]} className="section">
            <div>
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="text-lg mt-2">
                We offer a variety of services to cater to your needs.
              </p>
            </div>
          </div>

          <div ref={sectionRefs[1]} className="section">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">Service One</h3>
                <p className="text-lg">Description of service one.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">Service Two</h3>
                <p className="text-lg">Description of service two.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow-lg w-full md:w-1/3">
                <h3 className="text-2xl font-bold mb-4">Service Three</h3>
                <p className="text-lg">Description of service three.</p>
              </div>
            </div>
          </div>

          <div ref={sectionRefs[2]} className="section">
            <div>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="text-lg mt-2">We would love to hear from you!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
