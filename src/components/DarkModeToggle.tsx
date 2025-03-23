import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    console.log("Dark mode:", isDark);

  }, [isDark]);

  return (
    <button
      className="w-28 block text-center px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeToggle;
