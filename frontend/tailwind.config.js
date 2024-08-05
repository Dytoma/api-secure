/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        dmSans: ['DM Sans', 'sans-serif']
      },
      colors: {
        'lightBlue': 'hsla(223, 67%, 58%, 1)',
        'lightGrey': 'hsla(209, 5%, 40%, 1)'
      },
      backgroundImage: {
        'noise': "url('/noise.png')"
      }
    },
  },
  plugins: [],
};
