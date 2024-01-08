<template>
    <div class="w-full h-full ">
        <h1 class="font-bold text-lg omitDark !text-gray-400 dark:!text-gray-300 my-2 ">Pedidos recientes</h1>
        <div class="relative md:max-w-[100%] xl:max-w-full">
            <el-table v-loading="$global.loading" :data="orders" style="width: 100%; margin-bottom: 10px" height="580"
                stripe>

                <el-table-column width="280" fixed>
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.title }}</span>
                            <span class=" ellipsis" :title="row.description">{{ row.description }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column min-width="180">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.due_at.substring(0, 12) }}</span>
                            <span class=" ellipsis">{{ row.status }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="250">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <el-progress :stroke-width="15" :percentage="row.leftPercent" :text-inside="true"
                                :status="utils.statusBar(row.leftPercent)" />
                            <span class=" ellipsis" v-if="row.status != 'Completado'"><b>Restan:</b> {{
                                utils.toHourAndDay(row.left) }}</span>
                            <span class=" ellipsis" v-else><b>Hecho en:</b> {{ row.done_at }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="140">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ utils.formatMoney(row.price) }}</span>
                            <span class=" ellipsis"><b>Tareas:</b> {{ row.tasks.length }}</span>
                        </div>
                    </template>
                </el-table-column>

            </el-table>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useOrder } from "@/services/orderService";
import utils from "@/plugins/utils"

const { orders, getOrders, params } = useOrder();
const props = defineProps({
    clientId: {
        type: Number,
        required: true
    }
})


onMounted(async () => {
    params.value.limit = 10;
    params.value.filter = [...params.value.filter, `client_id:${props.clientId}`]
    if (props.clientId > 0) {
        await getOrders();
        console.log(orders.value)
    }
})

</script>