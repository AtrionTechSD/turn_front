<template>
    <div class="overflow-x-auto px-4 max-w-6xl mx-auto ">
        <div class="flex justify-between border-b pb-2">
            <h1 class="font-bold text-lg omitDark !text-gray-400 dark:!text-gray-300 my-2 ">Pedidos</h1>
            <OrderNew @update-order="getOrders" />
        </div>
        <div class="relative md:max-w-[100%] xl:max-w-full">
            <t-filter :methods="methods" :params="params" :orderables="orderables" />
            <el-table v-loading="$global.loading" :data="orders" style="width: 100%; margin-bottom: 10px" stripe>

                <el-table-column width="320">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.title }}</span>
                            <span class=" ellipsis" :title="row.description">{{ row.description }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column min-width="150">
                    <template #default="{ row }">
                        <div class="px-4 align-middle   flex flex-col space-y-0 ">
                            <span class="font-semibold  ellipsis "> {{ row.due_at.substring(0, 12) }}</span>
                            <span class=" ellipsis">{{ row.status }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="250" fixed="right">
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
            <t-pagination :methods="methods" :params="params" :pagination="pagination" schema="orders" />

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useOrder } from "@/services/orderService";
import utils from "@/plugins/utils"
import OrderNew from "@/components/orders/OrderNew.vue"
const { orders, getOrders, params, methods, pagination, orderables } = useOrder();


onMounted(async () => {
    await getOrders();
})


watch(
    params,
    async () => {
        await getOrders();
    },
    {
        deep: true,
        immediate: true
    }
);

</script>