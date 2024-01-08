<template>
  <form @submit.prevent="async () => await execute()">

    <input
    placeholder="usr"
    v-model="usr"
    type="text"
    :disabled="pending"/>
    <br>
    <input placeholder="pass" v-model="pass" type="text"
    :disabled="pending"/>
    <br>
    <div class="text-rose-500">
      {{ error?.statusMessage }}
    </div>
    <div v-if="status == 'success'" class="text-green-500">Login success</div>
    <input type="submit" value="Login" :disabled="pending"/>
  </form>
</template>
<script lang="ts" setup>
const usr = ref('');
const pass = ref('');
const loginBody = computed(() => encodeResponse({
  user: usr.value,
  password: pass.value
}))
const {csrf} = useCsrf();
const pending = computed(() => status.value == "pending");
const {execute, error, status} = useFetch('/api/auth',{
  body: loginBody,
  method:"POST",
  immediate:false,
  watch:false,
  headers: {
    "csrf-token":csrf
  }
});

</script>
<style scoped src="./index.css"/>