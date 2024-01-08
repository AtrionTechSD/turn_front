<template>
    <section class="h-screen flex items-center p-4">
        <div class="rounded-xl overflow-hidden border bg-card shadow-sm mx-auto w-full max-w-sm ifDark">
            <div class="flex flex-col p-6 space-y-1">
                <div class="flex items-center justify-between my-4">
                    <h1 class="text-xl text-center font-bold ">Crear Cuenta</h1>
                    <img src="@/assets/turn.png" class="h-8 mx-auto" alt="Logo">
                </div>
                <p class="text-xs text-muted-foreground mt-2">
                    Ingresa tus datos para crear una cuenta
                </p>
            </div>
            <div class="px-6 py-4">
                <form action="javascript:void(0)" @submit="singup">
                    <div class="space-y-4">

                        <t-input label="Correo Electrónico" field="email" type="email" placeholder="user@example.com"
                            :required="true" v-model="authState.email" />
                        <t-input label="Contraseña" field="password" type="password" placeholder="user1234" :required="true"
                            v-model="authState.password" minlength="8" maxength="35" />
                        <t-button type="submit">Registrar</t-button>
                        <div class="mt-4 text-center text-sm">
                            ¿Ya tienes una cuenta?
                            <router-link to="/admin/auth/login" class="underline">
                                Iniciar Sesión
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </section>
</template>
<script setup>
import { useAuth } from "@/services/authService";
const { singup, authState } = useAuth();

</script>