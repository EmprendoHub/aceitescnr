"use client";
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = ({ className }) => {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (Window) {
      const theme = localStorage?.getItem("theme");
      if (theme && theme === "dark") setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`relative w-12 h-5 flex items-center dark:bg-primary bg-dark cursor-pointer rounded-full p-1 ${className}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-gray-200 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300"
        style={darkMode ? { left: "4px" } : { right: "4px" }}
      ></div>
      <BsSunFill className="ml-auto text-accent" size={18} />
    </div>
  );
};

export default ThemeToggle;
