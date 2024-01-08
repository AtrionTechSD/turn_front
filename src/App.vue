<template>
  <router-view class=" overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-300 h-dvh "></router-view>
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

