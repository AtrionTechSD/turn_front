<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="border text-card-foreground mx-auto w-full max-w-lg p-6 bg-white shadow-lg dark:shadow-white rounded-xl"
            data-v0-t="card">
            <h1 class="font-bold text-center mb-4">Actualice su perfil</h1>
            <form @submit.prevent="storeProfile" class="grid grid-cols-1 md:grid-cols-6 gap-x-2 gap-y-4 relative"
                id="formProfile">
                <t-input autocapitalize="true" class="col-span-1 md:col-span-3 " placeholder="Ingrese su nombre"
                    :required="true" label="Primer nombre" v-model="userProfile.name" field="name" minlength="3"
                    maxength="35" />
                <t-input class="col-span-1 md:col-span-3 " placeholder="Ingrese sus apellidos" :required="true"
                    label="Apellidos" v-model="userProfile.lastname" field="lastname" minlength="3" maxength="35" />

                <t-input class="col-span-1 md:col-span-6 " placeholder="Ingrese su dirección completa" label="Dirección"
                    :required="true" v-model="userProfile.address" field="addres" minlength="8" maxength="75" />
                <t-input class="col-span-1 md:col-span-2 " placeholder="Ingrese su teléfono" :required="true"
                    label="Teléfono" v-model="userProfile.phone" field="phone" minlength="10" maxength="20" />
                <t-select :key="useProfile.institute_id" :options="institutes" v-model="userProfile.institute_id"
                    :modelValue="userProfile.institute_id" class="col-span-1 md:col-span-4 "
                    placeholder="Seleccione una institución" :required="true" field="institute_id"
                    label="Institución"></t-select>

                <t-button form="formProfile" type="submit" class="col-span-1 md:col-start-3 md:col-end-7"
                    label="Apellidos">Actualizar</t-button>
            </form>
        </div>

    </div>
</template>

<script setup>

import { onBeforeMount } from 'vue';
import { useProfile } from '@/services/profileService';
const { userProfile, getProfile, storeProfile, institutes } = useProfile();

onBeforeMount(async () => {
    await getProfile();

})

</script>