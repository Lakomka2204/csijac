import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
export const useSettingsStore = defineStore("settings", () => {
  const _theme = useLocalStorage("theme", "light");
  const _locale = useLocalStorage("locale", useBrowserLocale());

  const { locale: sysLocale } = useI18n({ useScope: "global" });

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
  function toggleLanguage(newLang: string) {
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
