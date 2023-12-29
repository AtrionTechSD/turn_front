<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="border text-card-foreground mx-auto w-full max-w-lg p-6 bg-white shadow-lg dark:shadow-gray-50 rounded-xl"
            data-v0-t="card">
            <div class="flex items-center space-x-6">
                <span class="relative flex shrink-0 overflow-hidden rounded-full h-24 w-24">
                    <span
                        class="flex h-full w-full items-center justify-center rounded-full  omitDark bg-gray-100 dark:bg-gray-500">JP</span>
                </span>
                <div>
                    <h2 class="text-2xl font-semibold">{{ $auth.user?.name || "Desconocido" }}</h2>
                    <p class="text-sm text-gray-500">{{ $auth.user?.email }}</p>
                </div>
            </div>
            <hr class="my-6 border-gray-300">
            <div class="text-lg space-y-2">
                <div class="flex items-center space-x-2">
                    <span class="material-icons-outlined">home</span>
                    <h3 class="font-semibold">Dirección:</h3>
                    <p>{{ $auth.user?.address || "Desconocido" }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="material-icons-outlined">phone</span>
                    <h3 class="font-semibold">Teléfono:</h3>
                    <p>{{ $auth.user?.phone || "Desconocido" }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="material-icons-outlined">school</span>
                    <h3 class="font-semibold">Universidad:</h3>
                    <p>{{ $auth.user?.institute?.name || "Desconocido" }}</p>
                </div>
            </div>
            <hr class="my-6 border-gray-300">
            <div class="flex justify-between items-center">
                <router-link to="/profile/new"
                    class=" link-with-icon flex items-center gap-3 rounded-lg px-3 py-2 ifDark ifDarkHover">
                    <span class="material-icons-outlined">edit_note</span>
                    Editar Perfil
                </router-link>

                <a class="underline text-blue-500" href="#">
                    Account Settings
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>