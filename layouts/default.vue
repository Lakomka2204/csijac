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
                    <NuxtLink to="/login">{{ $t("nav.login") }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <slot />
    </main>

    <footer>
        <ul>
            <li @click="s" class="theme">
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
                <span>{{ lcl }}</span>
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
function changeLang(code : string) {
    //todo this
}
function s() {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
        document.documentElement.classList.add("light")
    }
    else {
        document.documentElement.classList.remove("light")
        document.documentElement.classList.add("dark")
    }
}
</script>

<style scoped src="./default.css"/>