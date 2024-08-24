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
    <div>Landing</div>
  )
}

export default Landing