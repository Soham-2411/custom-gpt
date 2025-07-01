/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#171717',
        chatarea: '#242424',
        input: "#2f2f2f",
        query: "#353a56"
      }
    },
  },
  plugins: [],
}

