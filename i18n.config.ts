export default defineI18nConfig(async () => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: await import("./lang/en.json"),
    ru: await import("./lang/ru.json")
  }
}))