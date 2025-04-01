import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import { useTranslation } from "react-i18next";

const DarkModeToggle = () => {
  const { theme, changeTheme } = useContext(ThemeContext)!;
  const { t }: any = useTranslation();

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
      className="w-full sm:w-[144px] block text-center px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 font-semibold dark:text-white"
      onClick={changeTheme}
    >
      {theme?.isDarkMode ? t("🌙 Dark mode") : t("☀️ Light mode")}
    </button>
  );
};

export default DarkModeToggle;
