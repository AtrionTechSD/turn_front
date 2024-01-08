<template>
    <div>
        <t-button class="!px-0.5 !py-0 bg-transparent dark:bg-transparent " @click="open = true">
            <t-icon class="text-[1.3rem] text-blue-600 dark:text-green-200">edit_note</t-icon>

        </t-button>
        <el-dialog @open="onOpen" :append-to-body="true" v-model="open" :title="`Actualizar datos de: ${client.fullname}`"
            class="!w-5/6 md:!w-3/4 lg:!w-1/2 !z-[1000]" center>
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
import { ref } from "vue"
import { rulesClient } from "@/services/rulesForms"

const formClient = ref(null)

const emit = defineEmits(["updateClients"])

const { client, updateClient, findClient } = useClient();
const open = ref(false);

const props = defineProps({
    clientId: {
        type: Number,
        required: true
    },
    careers: {
        type: Array,
        required: true
    },
    institutes: {
        type: Array,
        required: true
    }
})

const onSubmit = async () => {
    try {
        formClient.value.validate().then(async (result) => {
            await updateClient(props.clientId);
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

const onOpen = async () => {
    await findClient(props.clientId)

}
</script>