<template>
    <div class="flex flex-col h-full ">

        <div class="flex space-x-2 justify-start items-center px-2 mt-2 mb-2 pb-4 border-b">
            <div class="flex space-x-2 items-center">
                <div class="size-8 mx-auto rounded-full bg-center bg-cover" :style="{
                    'background-image': `url(${profileImage})`
                }">

                </div>
                <span class="font-bold uppercase text-sm w-full md:text-base md:max-w-72  ellipsis">{{ $auth.user?.fullname
                }}</span>
            </div>
        </div>
        <div class="mb-4 flex space-x-4 p-2 w-full max-w-sm mx-auto shadow-md md:hidden">
            <button @:click="infoToShow = 'basicInfo'" :class="{ 'bg-gray-600 text-white': infoToShow === 'basicInfo' }"
                class="flex-1 py-1 px-4 text-sm rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">Información</button>
            <button @:click="infoToShow = 'userOrders'" :class="{ 'bg-gray-600 text-white': infoToShow === 'userOrders' }"
                class="flex-1 py-1 px-4 text-sm rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300">Mis
                Pedidos</button>

        </div>
        <div class=" h-full items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0 ">
            <div class="col-span-1 w-full max-w-sm md:col-span-1 mx-auto md:mx-0 h-full   border-x p-2 sticky top-0 transition-all duration-300 ease-in-out"
                :class="infoToShow == 'basicInfo' ? '' : 'hidden'">
                <BasicInfo :user="$auth?.user" />
            </div>
            <div class="col-span-1 w-full md:col-span-2 lg:col-span-3 mx-auto md:mx-0 h-full overflow-hidden  border-x p-2 md:block transition-all duration-300 ease-in-out"
                :class="infoToShow == 'userOrders' ? '' : 'hidden'">
                <UserOrders />
            </div>
        </div>
    </div>
</template>

<script setup>
import BasicInfo from "@/components/profile/BasicInfo.vue"
import UserOrders from "@/components/profile/UserOrders.vue"
import { computed, ref, onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/authStore";
import profileLocal from "@/assets/profile.png"
import { useProfile } from "@/services/profileService";
const profileImage = computed(() => {
    return useAuthStore().user?.image?.url || profileLocal;
})

const infoToShow = ref("basicInfo")

onBeforeMount(async () => {
    await useProfile().getProfile();
})
</script>