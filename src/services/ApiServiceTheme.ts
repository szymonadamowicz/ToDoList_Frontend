import { useState, useEffect } from "react";
import { ThemeModel } from "../types/Types";
import { changeThemeApi, fetchThemeApi } from "../api/ApiCallsTheme";

export const useThemeService = () => {
  const [theme, setTheme] = useState<ThemeModel>();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {

      const data = await fetchThemeApi();

      if (!data) {
        return;
      }

      setTheme(data);
    };

    fetchData();
  }, [refresh]);

  const changeTheme = async () => {
    await changeThemeApi();
    setRefresh(refresh+1)
  };

  return {
    theme,
    changeTheme,
  };
};
