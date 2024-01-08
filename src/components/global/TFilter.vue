<template>
    <div class="grid grid-cols-6 md:grid-cols-12 items-center space-x-2 " v-bind="$attrs">
        <el-input v-model="search" @change="methods.search" type="search" placeholder="Buscar cliente..."
            class=" col-span-3 md:col-span-6 lg:col-span-3">
            <template #append>
                <el-button :icon="Search" @click="methods.search(search)" />
            </template>
        </el-input>
        <div class="flex items-center space-x-1 col-span-3 md:col-span-6 lg:col-start-10 lg:col-end-13">
            <el-select v-model="order" @change="methods.order" clearable placeholder="Ordenar por" class="w-full">
                <el-option v-for="orderable in orderables" :key="orderable.key" :label="orderable.label"
                    :value="orderable.key" />
            </el-select>
            <div class="flex flex-col justify-center space-y-0">
                <button class="!p-0" @click="methods.setDesc(false)"
                    :class="params.desc ? 'cursor-pointer' : 'text-blue-500'" :disabled="!params.desc">
                    <t-icon>keyboard_arrow_up</t-icon>
                </button>
                <button class="!p-0" @click="methods.setDesc(true)"
                    :class="!params.desc ? 'cursor-pointer' : 'text-blue-500'" :disabled="params.desc">
                    <t-icon>keyboard_arrow_down</t-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from "vue"
const order = ref(null);
const search = ref(null)
const props = defineProps({
    orderables: {
        type: Array,
        required: true
    },
    params: {
        type: Object,
        required: true
    },
    methods: {
        type: Object,
        required: true
    }
})

</script>