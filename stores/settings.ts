import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useSettingsStore = defineStore("settings", () => {
  const { locale: sysLocale } = useI18n({ useScope: "global" });
  const _theme = useLocalStorage("theme", "light");
  let defaultLocale;
  if (process.client)
    defaultLocale = useBrowserLocale();
  else
    defaultLocale = sysLocale.value;
  const _locale = useLocalStorage("locale", defaultLocale);
  const theme = computed(() => _theme.value);
  const locale = computed(() => _locale.value);
  function changeTheme(oldT:string,newT:string) {
    document.documentElement.classList.remove(oldT);
    document.documentElement.classList.add(newT);
  }
  function toggleTheme(newTheme: string) {
    if (theme.value == newTheme) return;
    changeTheme(theme.value,newTheme);
    _theme.value = newTheme;
  }
  function toggleLanguage(newLang: string | undefined) {
    if (!newLang) return;
    if (locale.value == newLang) return;
    sysLocale.value = _locale.value = newLang;
  }
  function init() {
    changeTheme('p',theme.value);
    sysLocale.value = locale.value!;
  }
  return {
    theme,
    locale,
    toggleLanguage,
    toggleTheme,
    init
  };
});
