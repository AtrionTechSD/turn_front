<template>
    <div>
        <t-button class="!py-0 !px-0.5  w-28 ml-auto" @click="open = true">
            <t-icon class="text-2xl ">note_add</t-icon>
            <span class="!bg-transparent  px-1 ellipsis">Añadir</span>
        </t-button>


        <el-dialog v-model="open" title="Registro de pedido" center
            class="!w-full md:!w-5/6 lg:!w-1/2 !max-h-[80vh] overflow-hidden overflow-y-auto">
            <el-form ref="formOrder" id="formOrder" @submit.prevent="onSubmit" :model="order" :rules="rulesOrder"
                label-position="top" :status-icon="true">
                <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                    <el-form-item label="Título del pedido" prop="title">
                        <el-input v-model="order.title" />
                    </el-form-item>
                    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-2">
                        <el-form-item label="Entrega en" prop="due_at" class="col-span-1">
                            <el-date-picker v-model="order.due_at" type="date" placeholder="Fecha" class="w-full" />
                        </el-form-item>
                        <el-form-item label="Precio" prop="price" class="col-span-1">
                            <el-input v-model.number="order.price" class="w-full" />
                        </el-form-item>
                    </div>
                    <el-form-item label="Descripción del pedido" prop="description" class="md:row-span-2">
                        <el-input v-model="order.description" :autosize="false" resize="none" :rows="5" type="textarea" />
                    </el-form-item>
                    <el-form-item label="Cliente" prop="client_id" class="col-span-1">
                        <el-select-v2 class="w-full" v-model="order.client_id" placeholder="Seleccione un Cliente"
                            :options="clients" />
                    </el-form-item>
                    <el-form-item label="Cliente" prop="type" class="col-span-1">
                        <el-select v-model="order.type" class="w-full" placeholder="Tipo de pedido">
                            <el-option v-for="oType in orderTypes" :key="oType" :label="oType" :value="oType" />
                        </el-select>
                    </el-form-item>


                </div>
            </el-form>
            <hr>
            <h1 class="font-bold text-lg omitDark !text-gray-400 dark:!text-gray-300 my-2">Tareas del pedido</h1>
            <el-form ref="formTask" id="formTask" @submit.prevent="onSubmitTask" :model="task" :rules="rulesTask"
                label-position="top" :status-icon="true">
                <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <el-form-item label="Título" prop="title" class="col-span-1">
                        <el-input v-model="task.title" />
                    </el-form-item>
                    <div class="!flex !items-center space-x-1 col-span-1 ">
                        <el-form-item label="Fecha de entrega" prop="due_at" class=" ">
                            <el-date-picker v-model="task.due_at" type="date" placeholder="Fecha" class="w-full" />
                        </el-form-item>
                        <t-button type="submit" class="w-1/5" form="formTask">
                            <t-icon>add</t-icon>
                        </t-button>
                    </div>


                </div>
            </el-form>
            <el-table :data="order.tasks" style="width: 100%; margin-bottom: 10px" stripe>

                <el-table-column width="200">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.title }}</span>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="200">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="ellipsis "> {{ row.due_at }}</span>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column min-width="20" fixed="right">
                    <template #default="{ row }">
                        <t-button class="!px-0.5 !py-0 bg-transparent dark:bg-transparent" @click="removeTask(row.key)">
                            <span class="material-icons-outlined text-[1.3rem] text-red-600 dark:text-red-200">delete</span>
                        </t-button>
                    </template>
                </el-table-column>


            </el-table>
            <template #footer>
                <t-button type="submit" class="ml-auto w-44" form="formOrder">Guardar</t-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { useOrder } from "@/services/orderService"
import { ref, onBeforeMount } from "vue"
import { rulesOrder, rulesTask } from "@/services/rulesForms"

const formOrder = ref(null)
const formTask = ref(null)
const emit = defineEmits(["updateOrder"])

const { order, createOrder, loadClients, clients, task, addTaskToOrder, removeTask, orderTypes } = useOrder();
const open = ref(false);

const onSubmit = async () => {
    try {
        formOrder.value.validate().then(async (result) => {
            try {
                await createOrder();
                emit("updateOrder")
                formOrder.value.resetFields();
                open.value = false;
            } catch (error) {
                console.log(error)
            }

        }).catch((err) => {
            console.log(err)
        });
    } catch (error) {
        return;
    }
}
const onSubmitTask = async () => {
    try {
        formTask.value.validate().then(async (result) => {
            addTaskToOrder();
            formTask.value.resetFields();

        }).catch((err) => {
            console.log(err)
        });
    } catch (error) {
        return;
    }
}

onBeforeMount(async () => {
    await loadClients();
})
</script>