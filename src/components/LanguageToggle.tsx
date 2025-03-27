import { useTranslation } from 'react-i18next';

function LanguageToggle() {
  const { t, i18n }: any = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>

      <button onClick={() => changeLanguage('pl')}>Polski</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}

export default LanguageToggle;
