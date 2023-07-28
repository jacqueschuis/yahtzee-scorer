/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Prompt", "Helvetica", "Arial", "sans-serif"],
    },
    colors: {
      blue: {
        100: "hsl(197,100%,95%)",
        200: "hsl(197,60%,83%)",
        300: "hsl(197,60%,70%)",
        400: "hsl(197,50%,56%)",
        500: "hsl(197,50%,45%)",
        600: "hsl(197,50%,32%)",
        700: "hsl(197,60%,24%)",
        800: "hsl(197,60%,13%)",
        900: "hsl(197,100%,8%)",
      },
      teal: {
        100: "hsl(173,95%,90%)",
        300: "hsl(173,70%,60%)",
        500: "hsl(173,80%,39%)",
        700: "hsl(173,80%,24%)",
        900: "hsl(173,100%,10%)",
      },
      orange: {
        100: "hsl(12,100%,90%)",
        300: "hsl(12,90%,75%)",
        500: "hsl(12,76%,40%)",
        700: "hsl(12,84%,34%)",
        900: "hsl(12,100%,14%)",
      },
      extend: {},
    },
  },
  plugins: [],
};
