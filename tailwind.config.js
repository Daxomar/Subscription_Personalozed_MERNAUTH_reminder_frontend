import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4f46e5",   // main brand color
          "secondary": "#9333ea", // secondary brand color
          "accent": "#22c55e",    // for highlights
          "neutral": "#1f2937",   // neutral elements like cards
          "base-100": "#ffffff",  // main background
          "info": "#3b82f6",      // info state
          "success": "#10b981",   // success state
          "warning": "#f59e0b",   // warning state
          "error": "#ef4444",     // error state
        },
      },
    ],
  },
};


// export default {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }