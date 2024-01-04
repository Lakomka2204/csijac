export default defineI18nConfig(async () => ({
  legacy: false,
  locale: 'us',
  messages: {
    us: await import("./lang/us.json"),
    ru: await import("./lang/ru.json")
  }
}))