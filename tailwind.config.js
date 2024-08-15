/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#AD1FEA",
        "secondary-blue": "#4661E6",
        "secondary-indigo": "#3A4374",
        "pale-grey": "#F7F8FD",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
