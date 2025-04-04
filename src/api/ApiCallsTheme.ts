const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchThemeApi = async () => {
  try {
    const res = await fetch(`${baseUrl}/theme`);
    if (!res.ok) {
      console.log(`Fetching theme failed: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("fetchThemeApi error:", error);
  }
};

export const changeThemeApi = async () => {
  try {
    const res = await fetch(`${baseUrl}/theme/changeTheme`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.log(`chaning Theme failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("changeThemeApi error:", error);
  }
};

export const changeLanguageApi = async () => {
  try {
    const res = await fetch(`${baseUrl}/theme/changeLanguage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.log(`chaning Language failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("changeLanguageApi error:", error);
  }
};