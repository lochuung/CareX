/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://thumbs.dreamstime.com/b/medical-concept-blue-background-doctor-s-desk-instruments-copy-space-133143854.jpg')",
      }
    },
  },
  plugins: [],
};
