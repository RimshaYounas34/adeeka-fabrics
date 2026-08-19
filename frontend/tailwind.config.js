/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5EFE4",
        creamdark: "#EDE4D3",
        charcoal: "#1A1712",
        gold: "#B08D3E",
        goldlight: "#C9A85C",
        maroon: "#5C1A1A",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        body: ["'Cormorant Garamond'", "serif"],
        sans: ["'Jost'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
