<template>
  <div class="dropdown-wrapper">
    <slot name="button" :onClick="toggleDropdown"></slot>
    <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <template v-if="isOpen">
        <ul class="dropdown-list" :class="`dd-appear-${appearance ? appearance : 'below'}`">
          <slot name="dropdown" :onClick="toggleDropdown"></slot>
        </ul>
      </template>
    </Transition>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
// below - dd-appear-below
// left - dd-appear-left
// right - dd-appear-right
// top - dd-appear-top
defineProps(['appearance']);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

</script>
  
  <style scoped src="./dropdown.css"/>
  