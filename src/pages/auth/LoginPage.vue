<template>
    <section class="h-screen flex items-center justify-center p-4">
        <div class="rounded-xl overflow-hidden border bg-card shadow-sm mx-auto  w-full max-w-sm ifDark">
            <div class="flex flex-col p-6 space-y-1">
                <img src="@/assets/turn.png" class="h-8 mx-auto" alt="Logo">
                <h1 class="text-xl text-center font-bold  mt-4">Iniciar Sesión</h1>
                <p class="text-xs text-muted-foreground mt-2">
                    Ingresa tus credenciales y accede al sistema
                </p>
            </div>
            <div class="px-6 py-4">
                <form action="javascript:void(0)" @submit="loginAndRedirect">
                    <div class="space-y-4">
                        <t-input label="Correo Electrónico" field="email" type="email" placeholder="user@example.com"
                            :required="true" v-model="authState.email" error="Nombre incorrecto" />
                        <t-input label="Contraseña" field="password" type="password" placeholder="" :required="true"
                            v-model="authState.password" minlength="8" maxength="35" />
                        <t-button type="submit">Acceder</t-button>

                        <div class="flex justify-end">
                            <t-toggle v-model="authState.remember" field="remember" label="Recordar contraseña" />
                        </div>
                        <div class="mt-4 text-center text-sm">
                            ¿No tienes cuenta?
                            <router-link to="/auth/register" class="underline hover:text-blue-500">
                                Regístrate
                            </router-link>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    </section>
</template>
<script setup>
import { onBeforeMount } from "vue";
import Cookies from "js-cookie";

import { useAuth } from "@/services/auth.service";
const { login, authState } = useAuth();
const loginAndRedirect = async () => {
    try {
        await login();
        location.replace("/");
    } catch (error) {
        return error;
    }
}

onBeforeMount(() => {
    var preveRemember = Cookies.get("turnRemember");
    if (preveRemember) {
        preveRemember = JSON.parse(preveRemember);
        authState.email = preveRemember.email;
        authState.password = preveRemember.password;
        authState.remember = preveRemember.status;
    }
})
</script>