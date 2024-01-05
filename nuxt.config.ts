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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lcl_redirected",
      alwaysRedirect: true,
      redirectOn: 'root'
    }
  },
  pages: true,
  pinia: {
    storesDirs: ['./stores/**'],
  },
  csurf:{
    methodsToProtect: ['POST',"PUT","PATCH","DELETE"],
    cookieKey:"csrf",
  }
})
