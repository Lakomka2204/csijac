<template>
    <nav>
        <NuxtLink to="/">CSIJAC</NuxtLink>
        <ul>
            <li>
                <NuxtLink to="/about">{{ $t("home") }}</NuxtLink>
            </li>
        </ul>
    </nav>
    <slot />
</template>

<script lang="ts" setup>

</script>

<style scoped src="./layout.css"/>