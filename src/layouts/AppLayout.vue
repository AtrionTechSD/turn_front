<template>
    <el-container class=" h-screen max-h-[100vh]">
        <el-header>
            <TopBar />
        </el-header>
        <el-container class="overflow-auto h-full">
            <div class="w-auto h-full  z-50">
                <SideMenu />
            </div>
            <el-main>
                <main class="  relative max-w-[400px] sm:max-w-full">
                    <router-view :key="$route.fullPath" v-slot="{ Component }" class="">
                        <Transition name="fade">
                            <component :is="Component" />
                        </Transition>
                    </router-view>
                </main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import SideMenu from "@/components/main/SideMenu.vue"
import TopBar from "@/components/main/TopBar.vue"

</script>