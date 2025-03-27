import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

const DarkModeToggle = () => {
  const { theme, changeTheme } = useContext(ThemeContext)!;

  useEffect(() => {
    const html = document.documentElement;
    if (theme?.isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      className="w-28 block text-center px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      onClick={() => changeTheme()}
    >
      {theme?.isDarkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeToggle;
