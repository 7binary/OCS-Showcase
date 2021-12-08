import { Select } from 'antd';
import { useRouter } from 'next/router';

import cls from './language-select.module.css';
import { Language } from 'src/components';

const languageOptions: {key: Language, label: string}[] = [
  { key: 'en', label: 'English' },
  { key: 'fr', label: 'Français' },
];

export const LanguageSelect = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const swapLanguage = (nextLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return (
    <Select
      defaultValue={router.locale}
      onChange={swapLanguage}
      bordered={false}
      className={cls.select}
    >
      {languageOptions.map(lang => (
        <Select.Option value={lang.key} key={lang.key}>{lang.label}</Select.Option>
      ))}
    </Select>
  );
};
