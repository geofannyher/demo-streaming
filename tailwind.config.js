/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px)

      md: "768px",
      // => @media (min-width: 768px)

      lg: "1024px",
      // => @media (min-width: 1024px)

      xl: "1280px",
      // => @media (min-width: 1280px)

      "2xl": "1536px",
      // => @media (min-width: 1536px)
    },
    extend: {
      colors: {
        main: "#fefeff",
        second: "#5751c8",
        text: "#2c2363",
        bgtext: "#F9DC5C",
      },
    },
  },
  plugins: [],
};
