const fg = require("fast-glob");
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

const LOCALES_PATH = path.join(__dirname, "locales");
const DEFAULT_LANG = "en";
const TARGET_LANG = "pl";

async function extractKeysFromCode() {
  const files = await fg(["**/*.{js,jsx,ts,tsx}"], {
    cwd: process.cwd(),
    ignore: ["node_modules"],
  });

  const keys = new Set();

  for (const file of files) {
    const content = await fs.readFile(path.join(process.cwd(), file), "utf8");
    const regex = /t\(['"`]([^'"`]+)['"`]\)/g;
    let match;
    while ((match = regex.exec(content))) {
      keys.add(match[1]);
    }
  }

  console.log("Pliki do sprawdzenia:", files);
  return Array.from(keys);
}

async function loadTranslations(lang) {
  const filePath = path.join(LOCALES_PATH, `${lang}.json`);
  try {
    return await fs.readJSON(filePath);
  } catch (err) {
    return {};
  }
}

async function translateText(text, from = DEFAULT_LANG, to = TARGET_LANG) {
  const url = `https://lingva.ml/api/v1/${from}/${to}/${encodeURIComponent(text)}`;
  const res = await axios.get(url);
  return res.data.translation;
}

async function saveTranslations(lang, data) {
  const filePath = path.join(LOCALES_PATH, `${lang}.json`);
  await fs.writeJSON(filePath, data, { spaces: 2 });
}

(async () => {
  const allKeys = await extractKeysFromCode();
  const en = await loadTranslations(DEFAULT_LANG);
  const pl = await loadTranslations(TARGET_LANG);

  let updatedEN = { ...en };
  let updatedPL = { ...pl };

  for (const key of allKeys) {
    if (!updatedEN[key]) {
      updatedEN[key] = key;
    }

    if (!updatedPL[key]) {
      const translated = await translateText(updatedEN[key]);
      console.log(`Translation: ${key} => ${translated}`);
      updatedPL[key] = translated;
    }
  }

  await saveTranslations(DEFAULT_LANG, updatedEN);
  await saveTranslations(TARGET_LANG, updatedPL);

  console.log("✅ Translation updated!");
})();
