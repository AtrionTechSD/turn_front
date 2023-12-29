<template>
    <div class="sm:absolute md:sticky w-2/3 md:w-auto left-0 top-0 z-50 bottom-0 md:block md:border-r ifDark transform transition-all ease-in-out duration-700 md:translate-x-0 md:translate-y-0 md:h-dvh shadow-md shadow-white"
        :class="showMenu ? 'translate-x-0 h-auto  border-r-2' : '-translate-x-[85%] -translate-y-[95%]'">
        <button class="md:hidden  absolute z-50" @click="toggleMenu"
            :class="showMenu ? 'left-1 top-2' : 'right-0 bottom-0 '">
            <span class="material-icons-outlined " v-if="showMenu">close</span>
            <span class="material-icons-outlined " v-else>menu</span>
        </button>
        <div class="flex h-full max-h-screen flex-col gap-2">
            <div class="flex h-12 md:h-[55px] items-center justify-center border-b px-6">
                <router-link class=" flex items-center gap-2 font-semibold" to="/">
                    <img src="@/assets/turn.png" class="h-6 mx-auto" alt="">
                </router-link>
            </div>
            <div class="flex-1 overflow-auto py-2 relative">
                <nav class="grid items-start px-4 text-sm font-medium gap-y-4">
                    <router-link class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover"
                        to="/">
                        <span class="material-icons-outlined">home</span>
                        Dashboard
                    </router-link>
                    <router-link class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover"
                        to="/orders">
                        <span class="material-icons-outlined">task</span>
                        Pedidos
                    </router-link>
                    <router-link class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover"
                        to="/clients">
                        <span class="material-icons-outlined">group</span>
                        Clientes
                    </router-link>
                    <router-link class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover"
                        to="/documents">
                        <span class="material-icons-outlined">description</span>
                        Documentos
                    </router-link>
                    <router-link class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover"
                        to="/settings">
                        <span class="material-icons-outlined">settings</span>
                        Ajustes
                    </router-link>
                    <router-link class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover"
                        to="/profile">
                        <span class="material-icons-outlined">person</span>
                        Perfil
                    </router-link>
                </nav>
                <t-button
                    class="bg-transparent w-10 hover:bg-transparent absolute bottom-2 right-2 transform hover:scale-105 md:block"
                    :class="showMenu ? 'block' : 'hidden'">
                    <span class="material-icons-outlined " @click="logoutAndRedirect">power_settings_new</span>
                </t-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { useAuth } from "@/services/auth.service"
import confirm from "@/plugins/confirm";

const { logout } = useAuth();

const showMenu = ref(false);
const toggleMenu = () => {
    showMenu.value = !showMenu.value;
}

const logoutAndRedirect = async () => {
    confirm("¿Desea cerrar sesión?", logout).then((res) => {
        if (res) {
            location.replace('/')
        }
    })

}

</script>