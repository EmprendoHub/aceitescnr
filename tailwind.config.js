/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: "#ED3237",
        secondary: "#2e3236",
        accent: "#F0AA44",
        accentTwo: "#F15733",
        dark: "#2e3236",
        light: "#fad0c6",
      },
      fontFamily: {
        primary: ["Oswald", "sans-serif"],
        secondary: ["Montserrat", "sans-serif"],
      },

      colors: {
        primary: "#ED3237",
        secondary: "#2e3236",
        accent: "#F0AA44",
        accentTwo: "#F15733",
        dark: "#2e3236",
        light: "#fad0c6",
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(to bottom right, #1984b1 0%,  #2e7cbf 100%)",
        "secondary-gradient":
          "linear-gradient(to bottom right, #be185d 0%,  #d97706 100%)",
        "dark-gradient":
          "linear-gradient(to bottom right, #0D121B 0%, #4EA4B2 100%)",
        "light-gradient":
          "linear-gradient(to bottom right, #e1e6ed 0%, #f0f1f2 100%)",
      },
      screens: {
        max2xl: {
          max: "1600px",
        },
        maxxlg: {
          max: "1400px",
        },
        maxlg: {
          max: "1200px",
        },
        maxmd: {
          max: "960px",
        },
        maxmdsm: {
          max: "700px",
        },
        maxsm: {
          max: "521px",
        },
        maxxsm: {
          max: "420px",
        },
        maxxxs: {
          max: "374px",
        },
        minxlg: {
          min: "1400px",
        },
        minlg: {
          min: "1200px",
        },
        minmd: {
          min: "960px",
        },
        minmdsm: {
          min: "700px",
        },
        minsm: {
          min: "521px",
        },
        minxsm: {
          min: "420px",
        },
        minxxs: {
          min: "374px",
        },
      },
    },
  },
  plugins: [],
};
