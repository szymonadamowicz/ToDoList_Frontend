import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../App";

function LanguageToggle() {
  const { i18n }: any = useTranslation();
  const { theme, changeLanguage } = useContext(ThemeContext)!;

  const handleChange = () => {
    const newLang = theme?.language ? "en" : "pl";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    changeLanguage();
  };

  return (
    <button
      onClick={handleChange}
      className="w-32 sm:w-24 block text-center px-3 py-1 rounded bg-cyan-500 dark:bg-cyan-700 font-semibold text-white"
    >
      {theme?.language ? "Polski" : "English"}
    </button>
  );
}

export default LanguageToggle;
