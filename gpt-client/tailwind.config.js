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
        chatarea: '#212121',
        input: "#2f2f2f",
        query: "#303030"
      }
    },
  },
  plugins: [],
}

