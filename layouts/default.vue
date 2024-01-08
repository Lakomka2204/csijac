<template>
    <header>

        <nav>
            <ul>
                <li>
                    <NuxtLink to="/">
                        <span class="logo">
                            C<span>loud</span>
                            S<span>torage</span>
                            I<span>s</span>
                            J<span>ust</span>
                            A<span>nother</span>
                            C<span>omputer</span>
                        </span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login">{{ $t("login") }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <slot />
    </main>

    <footer>
        <ul>
            <li @click="changeTheme" class="theme">
                <div>
                    <img src="@/assets/svg/sun.svg" alt="light" class="ic hidden dark:block" />
                    <img src="@/assets/svg/moon.svg" alt="dark" class="ic block dark:hidden" />
                </div>
            </li>
            <li>
                <Dropdown appearance="top">
                    <template #button="{ onClick }">
                        <img @click="onClick" :src="getFlag(currentLocale.iso)" :alt="currentLocale.code" />
                    </template>
                    <template #dropdown="{onClick}">
            <li v-for="lcl in availableLocales" class="selopt"
            @click="() => {onClick(); changeLang(lcl.code)}">
                <img :src="getFlag(lcl.iso)" :alt="lcl.code" />
                <span>{{ lcl.name }}</span>
            </li>
            </template>
            </Dropdown>
            </li>
        </ul>
    </footer>
</template>

<script lang="ts" setup>
import getFlag from '@/utils/getFlag';
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
const { locale, locales } = useI18n();
const availableLocales = computed(() => locales.value as LocaleObject[]);
const currentLocale = computed(() => availableLocales.value.filter(x => x.code == locale.value)[0]);
const settingsStore = useSettingsStore();
onMounted(() => {
    settingsStore.init();
})
function changeLang(code : string | undefined) {
    settingsStore.toggleLanguage(code);
}
function changeTheme() {
    if (settingsStore.theme == "dark")
        settingsStore.toggleTheme("light")
    else
        settingsStore.toggleTheme("dark");
}
</script>

<style scoped src="./default.css"/>