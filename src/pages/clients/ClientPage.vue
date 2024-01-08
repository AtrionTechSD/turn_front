<template>
    <div class="overflow-x-auto px-4 max-w-6xl mx-auto">
        <div class="flex justify-between border-b pb-2">
            <h1 class="font-bold text-lg omitDark !text-gray-400 dark:!text-gray-300 my-2 ">Clientes</h1>
            <ClientNew @update-clients="getClients" />
        </div>
        <t-filter :methods="methods" :params="params" :orderables="orderables" />
        <div class="relative md:max-w-[100%] xl:max-w-full">
            <el-table v-loading="$global.loading" :data="clients" style="width: 100%; margin-bottom: 10px" height="580"
                stripe>
                <el-table-column width="55" fixed>
                    <template #default="{ row }">
                        <router-link :to="`/admin/clients/${row.id}`" style="display: flex; align-items: center"
                            class="size-10">
                            <el-image :src="row.image?.url || profileLocal" alt="Profile Image"
                                class="size-10 rounded-full" />
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column width="180" fixed>
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.fullname }}</span>
                            <span class=" ellipsis">{{ row.phone }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column min-width="250">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <a :href="`mailto:${row.email}`" class="hover:underline hover:text-blue-500">
                                <span class="font-semibold  ellipsis "> {{ row.email }}</span>
                            </a>
                            <span class=" ellipsis" :title="row.address">{{ row.address }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="250">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.institute?.name }}</span>
                            <span class=" ellipsis">{{ row.career?.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> Pedidos:
                                <span class="font-normal"> {{ row.orders.length }}</span>
                            </span>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="100">
                    <template #default="{ row }">
                        <div class="flex flex-row items-center space-x-0">

                            <ClientEdit @update-clients="getClients" :client-id="row.id" :key="row.id" :careers="careers"
                                :institutes="institutes" />
                            <t-button class="!px-0.5 !py-0 bg-transparent dark:bg-transparent ">
                                <router-link :to="`/admin/clients/${row.id}`"
                                    class="material-icons-outlined text-[1.3rem] text-green-600 dark:text-green-200">visibility
                                </router-link>
                            </t-button>
                            <el-popconfirm title="¿Eliminar?" @confirm="deleteClient(row.id)">
                                <template #reference>
                                    <t-button class="!px-0.5 !py-0 bg-transparent dark:bg-transparent">
                                        <span
                                            class="material-icons-outlined text-[1.3rem] text-red-600 dark:text-red-200">delete</span>
                                    </t-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>

                </el-table-column>
            </el-table>
            <t-pagination :methods="methods" :params="params" :pagination="pagination" schema="clients" />

        </div>
    </div>
</template>

<script setup>
import { useClient } from '@/services/clientService';
import ClientEdit from '@/components/clients/ClientEdit.vue';
const { clients, getClients, methods, deleteClient, pagination, params, orderables, institutes, loadInstitutes, careers, loadCareers, } = useClient();
import { onBeforeMount, watch } from "vue"
import profileLocal from "@/assets/profile.png"
import ClientNew from "@/components/clients/ClientNew.vue"
onBeforeMount(async () => {
    await loadCareers();
    await loadInstitutes();
    await getClients();
})

watch(
    params,
    async () => {
        await getClients();
    },
    {
        deep: true,
        immediate: true
    }
);

</script>