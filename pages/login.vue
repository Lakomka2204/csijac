<template>
  <input class="bg-black" placeholder="usr" v-model="usr" type="text"/>
  <br>
  <input class="bg-black" placeholder="pass" v-model="pass" type="text"/>
  <br>
  <h2>Response</h2>
  <div>
    {{ decodeResponse(data) }}
  </div>
  <h2>Error</h2>
  <div>
    {{ error }}
  </div>
  <button @click="async () => await refresh()">Refresh</button>
</template>
<script lang="ts" setup>
const usr = ref('');
const pass = ref('');
const loginBody = computed(() => encodeResponse({
  user: usr.value,
  password: pass.value
}))
const {csrf} = useCsrf();

const {data, execute, refresh, error} = useFetch('/api/auth',{
  body: loginBody,
  method:"POST",
  immediate:false,
  watch:false,
  headers: {
    "csrf-token":csrf
  }
});

await execute();

</script>
