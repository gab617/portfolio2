/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '95': '95%',
        '90': '90%',
        '80': '80%',
        '70': '70%',
        '60': '60%',
        '15': '15%',
        '10': '10%'
      },
    },
    display: ['print'],
    dropShadow: {
      '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
      ]
    }
  },
  plugins: [],
}

