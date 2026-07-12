/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "collex-dark": "#0f172a",
        "collex-darker": "#020617",
        "collex-teal": "#14b8a6",
      },
    },
  },
  plugins: [],
};
