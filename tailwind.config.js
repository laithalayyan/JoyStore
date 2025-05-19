const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Define your primary font stack (e.g., for English/Latin text)
        // If you added Inter from Google Fonts:
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        // If you want to use Tailwind's default sans-serif for Latin:
        // sans: defaultTheme.fontFamily.sans,

        // Define your Arabic font using the name Google Fonts uses
        alexandria: ['"Alexandria"', ...defaultTheme.fontFamily.sans], // Use "Alexandria"
      },
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
