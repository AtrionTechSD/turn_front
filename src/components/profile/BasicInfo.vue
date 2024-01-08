<template>
    <div class="h-full flex flex-col space-y-4 p-1 ">
        <div>


            <UploadProfileImage :user="user">
                <el-image class="size-36 lg:size-44 rounded-lg mx-auto" :src="profileImage" fit="cover"
                    alt="Imagen de perfil" />
            </UploadProfileImage>
        </div>

        <span class="font-semibold">Información Personal</span>
        <hr class="!my-0.5 p-0">
        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Nombre</span>
            <span class="ellipsis text-sm font-semibold">{{ user?.name }}</span>
        </div>

        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Apellido </span>
            <span class="ellipsis text-sm font-semibold">{{ user?.lastname }}</span>
        </div>
        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end" :title="user?.address">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Dirección </span>
            <span class="ellipsis text-sm font-semibold">{{ user?.address }}</span>
        </div>
        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Correo </span>
            <a :href="`mailto:${user?.email}`" class="ellipsis text-sm font-semibold text-blue-500 hover:underline">{{
                user?.email }}</a>
        </div>
        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Teléfono </span>
            <span class="ellipsis text-sm font-semibold">{{ user?.phone }}</span>
        </div>
        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Rol </span>
            <span class="ellipsis text-sm font-semibold">{{ user?.role?.name == "admin" ? "Administrador" :
                "Cliente"
            }}</span>
        </div>
        <div class="w-full  h-9 border-l-2 pl-1  relative flex items-end">
            <span class="text-xs !text-gray-500 absolute left-1 top-0">Institución </span>
            <span class="ellipsis text-sm font-semibold">{{ user?.institute?.name || "N/A"
            }}</span>
        </div>
        <t-button @click="$router.push('/admin/profile/new')" v-if="$auth.user?.id === user?.id">
            Editar
            Perfil
        </t-button>

    </div>
</template>

<script setup>
import UploadProfileImage from "@/components/profile/UploadProfileImage.vue"
import profileLocal from "@/assets/profile.png"
import { computed } from "vue";
const profileImage = computed(() => {
    return props.user?.image?.url || profileLocal;
})

const props = defineProps({
    user: {
        type: Object,
        default: () => { }
    }
})


</script>