<template>
    <div class="grid h-screen min-h-screen w-full md:grid-cols-[230px_1fr]">
        <SideMenu />
        <top-bar />
    </div>
</template>

<script setup>
import SideMenu from "@/components/main/SideMenu.vue"
import TopBar from "@/components/main/TopBar.vue"

</script>