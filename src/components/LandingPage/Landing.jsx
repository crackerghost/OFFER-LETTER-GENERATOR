import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const [showMain, setShowMain] = useState(false);
  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Logo animation sequence
    gsap.fromTo(
      ".logo",
      { opacity: 0, y: 300 }, // Start from bottom
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 } // Animate to center
    );

    gsap.to(
      ".logo",
      { opacity: 0, y: -300, duration: 1, ease: "power2.in", delay: 3 } // Animate out to the top
    );

    const timer = setTimeout(() => {
      setShowMain(true);
    }, 4000); // Show main content after 4 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showMain) return;

    // Navbar animation
    gsap.fromTo(
      ".nav",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    // Black background content animation
    gsap.fromTo(
      ".header-content",
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
    );

    // Scroll-triggered animations for sections
    sectionRefs.forEach((ref) => {
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
    });
  }, [showMain]);

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
        <div className="flex items-center justify-center min-h-screen">
          <div className="logo text-5xl font-bold">Your Logo</div>
        </div>
      ) : (
        <div>
          <nav className="nav flex justify-between items-center p-6">
            <div className="text-3xl font-bold">Your Logo</div>
            <ul className="flex space-x-6 text-xl">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </nav>
          <header className="header bg-black text-white h-[80vh] py-32 rounded-lg mx-4 md:mx-20 mt-10">
  <div className="flex items-center justify-center h-full text-center">
    <div>
      <h1 className="text-4xl font-bold mb-2">Welcome to Our Website</h1>
      <p className="text-xl mb-4">We provide the best services for you.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Get Started
      </button>
    </div>
  </div>
</header>




          {/* Separate sections that appear on scroll */}
          <div ref={sectionRefs[0]} className="section">
            <div>
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="text-lg mt-2">We offer a variety of services to cater to your needs.</p>
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
              <p className="text-lg mt-2">Reach out to us for more information.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
