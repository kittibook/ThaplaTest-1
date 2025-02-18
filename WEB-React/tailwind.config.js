/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-50px)' },
        },
      },
      animation: {
        jump: 'jump 1s infinite',
      },
    },
  },
  plugins: [require('daisyui'),],
}

