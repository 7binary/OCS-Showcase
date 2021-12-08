import { useIntl } from 'react-intl';

export const messages = {
  en: {
    menuAthletes: 'Olympic Athletes',
    menuGames: 'Olympic Games',
    menuNews: 'News',
    menuLogout: 'Sign out',
    menuProfile: 'Profile',
    btnLogin: 'Sign In',
    footerCopyright: 'TM © 2021 – International Olympic Committee – All Rights Reserved.'
  },
  fr: {
    menuAthletes: 'Athlètes Olympiques',
    menuGames: 'Jeux Olympiques',
    menuNews: 'Infos',
    menuLogout: 'Se déconnecter',
    menuProfile: 'Profiler',
    btnLogin: 'Se connecter',
    footerCopyright: 'TM © 2021 – Comité International Olympique – Tous droits réservés.'
  },
};

messages.fr = { ...messages.en, ...messages.fr };

export type Language = keyof typeof messages;
export type MessageKey = keyof typeof messages.en;

export function useTranslate() {
  const intl = useIntl();

  return function (messageKey: MessageKey): string {
    return intl.formatMessage({ id: messageKey });
  };
}
