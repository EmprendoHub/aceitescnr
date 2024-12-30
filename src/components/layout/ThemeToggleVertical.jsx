"use client";
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { BsSunFill } from "react-icons/bs";

const ThemeToggleVertical = ({ className }) => {
  const [darkMode, setDarkMode] = useState(false);
  // useEffect(() => {
  //   if (localStorage) {
  //     const theme = localStorage?.getItem("theme");
  //     if (theme && theme === "dark") setDarkMode(true);
  //   }
  // }, []);

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
      className={`fixed z-[666] w-4 h-12 right-0 top-1/2 flex flex-col justify-between items-center dark:bg-dark bg-primary cursor-pointer rounded-full p-1 ${className}`}
      onClick={() => setDarkMode(!darkMode)}
    >
      <FaMoon className="text-white" size={9} />
      <div
        className="absolute bg-white dark:bg-gray-200 w-3 h-3 rounded-full shadow-md transform transition-transform duration-300"
        style={darkMode ? { top: "4px" } : { bottom: "4px" }}
      ></div>
      <BsSunFill className=" text-amber-500" size={9} />
    </div>
  );
};

export default ThemeToggleVertical;
