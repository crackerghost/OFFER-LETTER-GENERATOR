/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =withMT({
  content: ["./src/**/*.{html,jsx,js}"],
  
  theme: {
    extend: {

      screens: {
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily:{
        'quicksand' : 'Quicksand, sans-serif;'
      },
      borderRadius:{
        'md' : '3px'
      },
      backgroundImage:{
        'customBlack': 'radial-gradient(at center top, rgba(216, 209, 212, 1.0) -180%, rgba(1, 1, 1, 1.0) 80%)'
      }
      
    },
   
    
    
  },
  plugins: [],
}
)
