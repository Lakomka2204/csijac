<template>
  <form @submit.prevent="async () => await loginFetch.execute()">
    <input
    placeholder="usr"
    v-model="loginBody.username"
    type="text"
    :disabled="loginPending"/>
    <br>
    <input placeholder="pass" v-model="loginBody.password" type="password"
    :disabled="loginPending"/>
    <br>
    <div class="text-rose-500">
      {{ loginFetch.error.value?.statusMessage }}
    </div>
    <div v-if="loginFetch.status.value == 'success'" class="text-green-500">Login success</div>
    <input type="submit" value="Login" :disabled="loginPending"/>
  </form>
  <button @click="logout">LOGOUT</button>
</template>
<script lang="ts" setup>
const A1 = useCookie("A1");
function logout() {
  console.log('called logout');
  A1.value = null;
}
const loginBody = reactive({
  username:'',
  password:''
});
const logEncBody = computed(() => encodeResponse(loginBody));

const {csrf} = useCsrf();
const loginFetch = useFetch('/api/auth/login',{
  body: logEncBody,
  method:"POST",
  immediate:false,
  watch:false,
  headers: {
    "csrf-token":csrf
  }
});
const loginPending = computed(() => loginFetch.status.value == "pending");


</script>
<style scoped src="../index.css"/>