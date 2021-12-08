const withPWA = require('next-pwa');
const withAntdLess = require('next-plugin-antd-less');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const runtimeCaching = require('next-pwa/cache');
const antdVariables = require('./src/styles/antd-variables');

/** @type {import('next').NextConfig} */
module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const config = {
    swcMinify: false,
    pwa: {
      dest: 'public',
      disable: isDev,
      runtimeCaching,
      buildExcludes: [/middleware-manifest.json$/],
    },
    reactStrictMode: true,
    images: {
      domains: [
        'localhost',
      ],
    },
    modifyVars: antdVariables,
    i18n: {
      locales: ['en', 'fr'],
      localeDetection: false,
      defaultLocale: 'en',
    },
  };

  return withAntdLess(withPWA(config));
};
