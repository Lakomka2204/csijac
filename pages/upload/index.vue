<template>
  <div>
    <form @submit.prevent class="flex flex-col [&>*]:m-2">
      <input
      type="file"
      name="video"
      accept="video/*"
      @change="submitVideo"
      :disabled="pending" />
    </form>
    <p class="text-green-500" v-if="status == 'success'">Successfully uploaded file!</p>
    <p class="text-red-500">{{ error?.statusMessage }}</p>
    <button v-if="status != 'success'" @click="async () => await execute()">Upload</button>
  </div>
</template>

<script lang="ts" setup>
const { csrf } = useCsrf();
const videoFile = ref<File | null>(null);
const body = computed(() => {
  if (!videoFile.value) return null;
  const formData = new FormData();
  formData.append("file", videoFile.value);
  return formData;
})

const { status, error,data, execute} = await useFetch('/api/file/upload', {
  method:"PUT",
  body: body,
  immediate: false,
  watch: [body],
  headers: {
    'csrf-token': csrf,
  },
});
const pending = computed(() => status.value == 'pending');
watch(status,(newStatus) => {
  if (newStatus != 'success') return;
  data.value
})
async function submitVideo(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target.files || target.files.length == 0) return
    videoFile.value = target.files[0];
}
</script>

<style scoped src="../index.css"/>