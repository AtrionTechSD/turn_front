<template>
  <div class="w-full h-full bg-gray-700">
    <router-view class=" mx-auto w-full max-w-sm md:max-w-full overflow-x-hidden bg-blue-50"></router-view>
  </div>
</template>

<script setup>
import { onBeforeMount, getCurrentInstance } from "vue"
import { useAuthStore } from "./stores/authStore";
const instance = getCurrentInstance();
const app = instance.appContext.app;

const authStore = useAuthStore();
onBeforeMount(() => {
  app.config.globalProperties.$authStore = authStore;
})
</script>

