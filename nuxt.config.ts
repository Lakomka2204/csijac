// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-csurf',
    '@pinia/nuxt',
  ],
  i18n:{
    vueI18n: "./i18n.config.ts",
    langDir:'lang',
    strategy:"no_prefix",
    locales:[
      {
        code:"en-US",
        iso:"us",
        file:"us.json",
        name:"English",
        isCatchallLocale:true,
      },
      {
        code:"ru-RU",
        iso:"ru",
        file:"ru.json",
        name:"русский",
      },
      {
        code:"ja-JP",
        iso:"jp",
        file:"jp.json",
        name:"日本語"
      }
    ],
    defaultLocale:'en-US'
  },
  pages: true,
  pinia: {
    storesDirs: ['./stores/**'],
  },
  csurf:{
    methodsToProtect: ['POST',"PUT","PATCH","DELETE"],
    cookieKey:"csrf",
  },
  tailwindcss:{
    viewer:false
  }
})
