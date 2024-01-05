<template>
  <div>
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
const {data} = useCsrfFetch('/api/auth',{method:"POST"});

</script>
