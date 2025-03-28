import { useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageToggle() {
  const { i18n }: any = useTranslation();
  const [isEn, changeIsEn] = useState(true);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleChange = () => {
    changeIsEn((prev) => !prev);
    changeLanguage(isEn ? "en" : "pl");
  };

  return (
    <button
      onClick={() => handleChange()}
      className="w-28 block text-center px-3 py-1 rounded bg-gray-100 dark:bg-cyan-600 dark:text-white"
    >
      {isEn ? "Polski" : "English"}
    </button>
  );
}

export default LanguageToggle;
