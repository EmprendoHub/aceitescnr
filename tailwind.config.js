/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        accentTwo: "#F15733",
        dark: "#2e3236",
        light: "#eeeeee",
      },
      fontFamily: {
        primary: ["Oswald", "sans-serif"],
        secondary: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        accentTwo: "#F15733",
        dark: "#2e3236",
        light: "#fad0c6",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(to bottom right, #1d4ed8 0%,  #2e1065 100%)",
        "secondary-gradient":
          "linear-gradient(to bottom right, #4c80e3 0%,  #21559c 100%)",
        "dark-gradient":
          "linear-gradient(to bottom right, #c92c2c 0%, #972f21 100%)",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
