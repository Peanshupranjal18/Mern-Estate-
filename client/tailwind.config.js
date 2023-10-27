// this is basically going to check the indexedDB.html file
// and also all the files with these extensions inside
// the src folder any tailwind css class is going to be detected
// css equivalent of that is going to be created

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
