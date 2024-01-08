<template>
    <div>
        <t-button class="!py-0 !px-0.5  w-28 ml-auto" @click="open = true">
            <t-icon class="text-2xl ">person_add</t-icon>
            <span class="!bg-transparent  px-1 ellipsis">Añadir</span>
        </t-button>


        <el-dialog v-model="open" title="Registro de cliente" class="!w-5/6 md:!w-3/4 lg:!w-1/2" center>
            <el-form ref="formClient" id="formClient" @submit.prevent="onSubmit" :model="client" :rules="rulesClient"
                label-position="top" :status-icon="true">
                <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-4">
                    <el-form-item label="Nombre del cliente" prop="name">
                        <el-input v-model="client.name" />
                    </el-form-item>
                    <el-form-item label="Apellidos del cliente" prop="lastname">
                        <el-input v-model="client.lastname" />
                    </el-form-item>
                    <el-form-item label="Dirección del cliente" prop="address" class="md:col-span-2">
                        <el-input v-model="client.address" />
                    </el-form-item>
                    <el-form-item label="Correo electrónico " prop="email">
                        <el-input v-model="client.email" />
                    </el-form-item>
                    <el-form-item label="Nro. Teléfono" prop="phone">
                        <el-input v-model="client.phone" />
                    </el-form-item>
                    <el-form-item label="Institución/Universidad" prop="institute_id">
                        <el-select-v2 class="w-full" v-model="client.institute_id" placeholder="Institución/Universidad"
                            :options="institutes" />
                    </el-form-item>
                    <el-form-item label="Carrera" prop="career_id">
                        <el-select-v2 class="w-full" v-model="client.career_id" placeholder="Carrera" :options="careers" />
                    </el-form-item>

                </div>
            </el-form>
            <template #footer>
                <t-button type="submit" class="ml-auto w-44" form="formClient">Guardar</t-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { useClient } from "@/services/clientService"
import { ref, onBeforeMount } from "vue"
import { rulesClient } from "@/services/rulesForms"

const formClient = ref(null)
const emit = defineEmits(["updateClients"])

const { client, institutes, loadInstitutes, careers, loadCareers, createClient } = useClient();
const open = ref(false);

const onSubmit = async () => {
    try {
        formClient.value.validate().then(async (result) => {
            await createClient();
            emit("updateClients")
            formClient.value.resetFields();
            open.value = false;
        }).catch((err) => {
            console.log(err)
        });
    } catch (error) {
        return;
    }
}

onBeforeMount(async () => {
    await loadInstitutes();
    await loadCareers();
})
</script>