import React, { useEffect, useRef, useState } from 'react';

function Landing() {
  const [showMain, setShowMain] = useState(false);
  const sectionRefs = [useRef(null), useRef(null)];
  const [inView, setInView] = useState([false, false]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 3000); // 3 seconds delay for logo animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const options = {
      threshold: 0.3, // Adjust this value as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.findIndex(ref => ref.current === entry.target);
          if (index !== -1) {
            setInView(prevState => {
              const newState = [...prevState];
              newState[index] = true;
              return newState;
            });
          }
        }
      });
    }, options);

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <style>
        {`
          @keyframes logoUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-100%);
            }
          }

          @keyframes fadeInLeft {
            0% {
              opacity: 0;
              transform: translateX(-100%);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInTop {
            0% {
              opacity: 0;
              transform: translateY(-100%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInBottom {
            0% {
              opacity: 0;
              transform: translateY(100%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scrollAppearBottom {
            0% {
              opacity: 0;
              transform: translateY(50px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scrollAppearLeft {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-logoUp {
            animation: logoUp 1s ease-out forwards;
          }

          .animate-fadeInLeft {
            animation: fadeInLeft 1s ease-out forwards;
          }

          .animate-fadeInTop {
            animation: fadeInTop 1s ease-out forwards;
          }

          .animate-fadeInBottom {
            animation: fadeInBottom 1s ease-out forwards;
          }

          .animate-scrollAppearBottom {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s ease-out, transform 1s ease-out;
          }

          .animate-scrollAppearLeft {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 1s ease-out, transform 1s ease-out;
          }

          .animate-scrollAppearBottom.in-view {
            opacity: 1;
            transform: translateY(0);
          }

          .animate-scrollAppearLeft.in-view {
            opacity: 1;
            transform: translateX(0);
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background-color: black;
            border-radius: 10px;
          }

          /* Fullscreen sections */
          .section {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .section:not(.in-view) {
            opacity: 0;
          }
        `}
      </style>

      {!showMain ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-logoUp text-5xl font-bold">Your Logo</div>
        </div>
      ) : (
        <div>
          <nav className="animate-fadeInLeft flex justify-between items-center p-6">
            <div className="text-3xl font-bold">Your Logo</div>
            <ul className="flex space-x-6 text-xl">
              <li className="animate-fadeInLeft">Home</li>
              <li className="animate-fadeInLeft delay-100">About</li>
              <li className="animate-fadeInLeft delay-200">Services</li>
              <li className="animate-fadeInLeft delay-300">Contact</li>
            </ul>
          </nav>

          <header className="animate-fadeInTop bg-black text-white py-16 rounded-lg mx-4 md:mx-20 mt-10">
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl font-bold mb-2">Welcome to Our Website</h1>
              <p className="text-xl mb-4">We provide the best services for you.</p>
              <button className="animate-fadeInBottom bg-blue-500 text-white px-4 py-2 rounded-lg">
                Get Started
              </button>
            </div>
          </header>

          <section
            ref={sectionRefs[0]}
            id="section-1"
            className={`section animate-scrollAppearBottom ${inView[0] ? 'in-view' : ''}`}
          >
            <div>
              <h2 className="text-3xl font-bold">Our Services</h2>
              <p className="text-lg mt-2">We offer a variety of services to cater to your needs.</p>
            </div>
          </section>

          <section
            ref={sectionRefs[1]}
            id="section-2"
            className={`section animate-scrollAppearLeft ${inView[1] ? 'in-view' : ''}`}
          >
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
          </section>
        </div>
      )}
    </div>
  );
}

export default Landing;
