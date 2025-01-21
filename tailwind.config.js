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
        primary: "#3a60cd",
        secondary: "#2e3236",
        accent: "#c92c2c",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        accentTwo: "#F15733",
        dark: "#2e3236",
        light: "#fad0c6",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
