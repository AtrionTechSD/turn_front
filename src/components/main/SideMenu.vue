<template>
    <button class="md:hidden  fixed left-1 top-3 z-[1000]" @click="toggleMenu" id="btnMenu">
        <span class="material-icons-outlined " v-if="showMenu">close</span>
        <span class="material-icons-outlined " id="btnOpenMenu" v-else>menu</span>
    </button>
    <div class="absolute md:sticky md:w-auto left-0  z-[100] bottom-0 md:block md:border-r ifDark transform transition-all ease-in-out duration-300 md:translate-x-0 md:translate-y-0 h-full shadow-md shadow-white top-0"
        id="sideMenu" :class="showMenu ? 'translate-x-0 h-auto  border-r-2' : '-translate-x-[120%] '">
        <div class="flex h-full max-h-screen flex-col  bg-white dark:bg-gray-800">
            <div class="flex-1 overflow-auto py-2 relative h-full">
                <nav class="grid items-start text-sm font-medium gap-y-4 pt-8">
                    <el-menu class="el-menu-vertical border-none" @open="handleOpen" @select="handleActive"
                        :unique-opened="true" :default-active="$global.menuActive" :default-openeds="[$global.menuOpened]">
                        <template v-for="link in links" :key="link.key">
                            <el-menu-item v-if="!link.childs" :index="link.index">
                                <router-link
                                    class="  flex items-center space-x-2 !p-0 w-full  h-full text-sm hover:text-blue-400"
                                    :to="link.path">
                                    <t-icon class="text-[1.3rem]">{{ link.icon }}</t-icon>
                                    <span>{{ link.label }}</span>
                                </router-link>
                            </el-menu-item>
                            <el-sub-menu v-else :index="link.index">
                                <template #title>
                                    <div
                                        class="  flex items-center space-x-2 !p-0 w-full  h-full text-sm  hover:text-blue-400">
                                        <t-icon class="text-[1.3rem]">{{ link.icon }}</t-icon>
                                        <span>{{ link.label }}</span>
                                    </div>
                                </template>
                                <el-menu-item v-for="child in link.childs" :key="child.key" :index="child.index">
                                    <router-link
                                        class="  flex items-center space-x-2 !p-0 w-full  h-full text-sm opacity-80 hover:text-blue-400"
                                        :to="child.path">
                                        <t-icon class="text-[1.3rem]">{{ child.icon }}</t-icon>
                                        <span>{{ child.label }}</span>
                                    </router-link>
                                </el-menu-item>
                            </el-sub-menu>
                        </template>
                    </el-menu>
                </nav>
                <t-button @click="logoutAndRedirect"
                    class="bg-transparent !text-gray-400  dark:bg-transparent hover:!bg-transparent  absolute bottom-2 right-2 transform hover:scale-105 md:block"
                    :class="showMenu ? 'block' : 'hidden'">
                    <span class="material-icons-outlined ">power_settings_new</span>
                </t-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router";
import { useAuth } from "@/services/authService"
import confirm from "@/plugins/confirm";
import links from "@/routes/links"
const { logout } = useAuth();
const router = useRoute();
import Cookies from "js-cookie";

const showMenu = ref(false);
const toggleMenu = () => {
    showMenu.value = !showMenu.value;
}

const handleOpen = (val) => {
    Cookies.set("turnMenuOpened", val)
}

const handleActive = (val) => {
    Cookies.set("turnMenuActive", val)
}
document.addEventListener("click", (event) => {
    const isClickOnMenu = event.target.closest('#sideMenu');
    const isClickOnButton = event.target.closest('#btnOpenMenu');

    if (!isClickOnMenu && !isClickOnButton && showMenu.value) {
        showMenu.value = false;
    }
})

const logoutAndRedirect = async () => {
    confirm("¿Desea cerrar sesión?", logout).then((res) => {
        if (res) {
            location.replace('/admin/')
        }
    })

}

watch(router, () => {
    showMenu.value = false;
})

</script>