/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'dark-grey' : '#222222',
        'maplmsBg' : '#d8e5ec',
        // 'light-grey' : '#333333',
        // 'aquamarine' : '#7FFFD4',
        // 'pink' : '#FFC0CB',
        // 'orange' : '#FFA500',
        // 'cream' : '#FFF8DC',
        // 'black' : '#000000',
      },
    },
  },
  plugins: [],
}

