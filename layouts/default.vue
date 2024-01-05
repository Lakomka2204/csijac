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
                    <img src="@/assets/svg/sun.svg" class="ic hidden dark:block" />
                    <img src="@/assets/svg/moon.svg" class="ic block dark:hidden" />
                </div>
            </li>
            <li>
                <Dropdown appearance="top">
                    <template #button="{ onClick }">
                        <img @click="onClick" :src="getFlag(locale)" />
                    </template>
                    <template #dropdown="{onClick}">
            <li v-for="lcl in availableLocales" class="selopt"
            @click="() => {onClick(); changeLang(lcl)}">
                <img :src="getFlag(lcl)" />
                <span>{{ $t(lcl) }}</span>
            </li>
            </template>
            </Dropdown>
            </li>
        </ul>
    </footer>
</template>

<script lang="ts" setup>
import getFlag from '@/utils/getFlag';
const { locale, availableLocales } = useI18n();
const settingsStore = useSettingsStore();
onMounted(() => {
    settingsStore.init();
})
function changeLang(code : string) {
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