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
    <input id="log" type="radio" v-model="method" value="0"/>
    <label for="log">Login</label>
    <input id="reg" type="radio" v-model="method" value="1"/>
    <label for="reg">Register</label>
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
const method = ref('');
const loginBody = computed(() => encodeResponse({
  username: usr.value,
  password: pass.value,
  method: method.value
}));
const {csrf} = useCsrf();
const pending = computed(() => status.value == "pending");
const {execute, error, status} = useFetch('/api/auth/authenticate',{
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