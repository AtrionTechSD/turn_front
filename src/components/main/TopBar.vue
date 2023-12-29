<template>
    <div class="flex flex-col ifDark sticky top-0">
        <header class="flex justify-between w-full h-14 md:h-[60px] items-center md:gap-4 border-b px-6 ifDark">
            <input class="hidden md:block border-none rounded-md px-3 py-2 flex-1 ifDark max-w-xl outline-none"
                placeholder="Buscar..." aria-label="Buscar" type="search" />
            <div class="flex items-center ml-auto gap-2 md:gap-4">
                <button @click="toggleDark"
                    class="link-with-icon flex items-center gap-3 rounded-lg px-1 py-2 ifDark ifDarkHover">
                    <span class="material-icons-outlined" v-if="darkMode">light_mode</span>
                    <span class="material-icons-outlined" v-else>dark_mode</span>
                </button>
                <a class="link-with-icon flex items-center gap-3 rounded-lg px-1 py-2 ifDark ifDarkHover" href="#">
                    <span class="material-icons-outlined">notifications</span>
                </a>
                <a class="link-with-icon flex items-center gap-3 rounded-lg px-1 py-2 ifDark ifDarkHover" href="#">
                    <span class="material-icons-outlined">forum</span>
                </a>
                <a class="link-with-icon flex items-center gap-3 rounded-lg px-1 py-2 ifDark ifDarkHover" href="#">
                    <span class="material-icons-outlined">calendar_month</span>
                </a>

                <div class="flex items-center w-full gap-2 ml-4">
                    <router-link to="/profile">
                        <t-button class="!py-1 ifDark">
                            <span class="omitDark pr-1">{{ $auth.user?.name || "Usuario" }}</span>
                            <span class="material-icons-outlined text-2xl omitDark">account_circle</span>
                        </t-button>
                    </router-link>
                </div>
            </div>
        </header>
        <main class="p-4 h-full ifDark relative">
            <router-view :key="$route.fullPath" v-slot="{ Component }" class="absolute left-0 top-0 right-0 bottom-0 p-4">
                <Transition name="slide">
                    <component :is="Component" />
                </Transition>
            </router-view>
        </main>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

const darkMode = ref(false);

const toggleDark = () => {
    darkMode.value = !darkMode.value;
    setDark(darkMode.value);
};

const setDark = (dark) => {
    const html = document.querySelector("html");
    if (dark === true) {
        html.classList.add("dark");
        localStorage.setItem("isDark_turn", "dark");
    } else {
        html.classList.remove("dark");
        localStorage.setItem("isDark_turn", "light");
    }
};

onBeforeMount(() => {
    const isDark = localStorage.getItem("isDark_turn");
    darkMode.value = isDark === "dark";
    setDark(darkMode.value);
});
</script>
