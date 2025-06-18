import React from "react";
import logo from "../assets/images/logo.png";
import { HiMagnifyingGlass, HiMoon, HiSun } from "react-icons/hi2";
import { useTheme } from "../context/theme/useTheme";

function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-[50px] h-[50px] object-contain" />
          <span className="text-xl font-bold hidden sm:block dark:text-white">
            Gaming Store
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input type="text" placeholder="Search Games..."
              className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 
                       border border-transparent focus:border-blue-500 dark:focus:border-blue-400 
                       outline-none transition-all duration-300
                       text-gray-900 dark:text-gray-100
                       placeholder-gray-500 dark:placeholder-gray-400"
            />
            <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>

        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
          {darkMode ? (
            <HiSun className="text-2xl text-yellow-500" />
          ) : (
            <HiMoon className="text-2xl text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
