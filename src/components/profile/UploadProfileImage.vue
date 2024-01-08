<template>
    <label
        class="flex flex-col space-y-1 cursor-pointer border-b border-b-transparent hover:border-b-blue-400 hover:font-semibold"
        for="uploadImage">
        <slot />
        <div v-if="$auth.user?.id === user?.id"
            class=" text-blue-400 flex items-center text-sm select-none  justify-center ">
            <span class="material-icons-outlined omitDark text-base p-0 m-0">images</span>
            <span class="omitDark  ellipsis">Actualizar foto de
                perfil</span>
        </div>
        <input v-if="$auth.user?.id === user?.id" type="file" name="" accept="image/png, image/jpg, image/jpeg"
            class="hidden" id="uploadImage" @change="onUpload">
    </label>
</template>
<script setup>
import alert from '@/plugins/alert';
import { useProfile } from '@/services/profileService';
const { updateImage } = useProfile();

const props = defineProps({
    user: {
        type: Object,
        default: () => { }
    }
})

const onUpload = async (evt) => {
    try {
        const image = evt.target.files[0];
        if (!image) throw new Error("Debe seleccionar una imagen");
        const ext = image.type.split("/")[1];
        if (!["jpg", "png", "jpeg"].includes(ext)) {
            throw new Error("Formato de image inválido")
        }
        await updateImage(image)

        alert.success("Foto actualizada exitosamente", 25000)

    } catch (error) {
        alert.error(error.message);
    }
}



</script>