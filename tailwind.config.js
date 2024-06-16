/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '90': '90%',
        '80': '80%',
        '70': '70%',
        '60': '60%',
        '15': '15%',
        '10': '10%'
      },
    },
  },
  plugins: [],
}

