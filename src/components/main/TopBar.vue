<template>
    <nav
        class="flex justify-between w-full !h-14 items-center md:gap-4 border-b px-6  sticky top-0 z-50 bg-white dark:bg-gray-800 max-w-[400px] sm:max-w-full ">
        <div class="flex h-14  items-center justify-center  ">
            <router-link class=" w-12 md:w-24 flex items-center gap-2 font-semibold" to="/admin/">
                <img src="@/assets/turn.png" class="h-6  mx-auto hidden md:flex" alt="">
                <img src="@/assets/icon.png" class="h-8   md:hidden" alt="">
            </router-link>
        </div>

        <div class="flex items-center justify-between md:w-auto ml-auto gap-2 md:gap-4">
            <button @click="toggleDark" class="link-with-icon flex items-center rounded-lg px-1 py-1">
                <t-icon v-if="darkMode">light_mode</t-icon>
                <t-icon v-else>dark_mode</t-icon>
            </button>
            <a class="link-with-icon flex items-center rounded-lg px-1 py-1" href="#">
                <t-icon>notifications</t-icon>
            </a>
            <a class="link-with-icon flex items-center rounded-lg px-1 py-1" href="#">
                <t-icon>forum</t-icon>
            </a>
            <a class="link-with-icon flex items-center rounded-lg px-1 py-1" href="#">
                <t-icon>calendar_month</t-icon>
            </a>

            <div class="flex items-center w-full gap-2 ml-4 hidden md:flex ">
                <t-button class="!py-0  " @click="$router.push('/admin/profile')">
                    <span class="!bg-transparent  pr-1 ellipsis w-16 md:w-24">{{
                        $auth.user?.fullname ||
                        "Usuario"
                    }}</span>
                    <t-icon class="text-2xl omitDark">account_circle</t-icon>
                </t-button>
            </div>
        </div>
    </nav>
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
