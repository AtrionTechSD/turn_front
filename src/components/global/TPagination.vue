<template>
    <div class="flex justify-end py-2" v-bind="$attrs">
        <el-pagination v-model:page-size="pageSize" :page-count="pagination.lastPage || 0" small
            layout="prev, pager, next, total, sizes" v-model:current-page="currentPage" :total="pagination.count || 0"
            :page-sizes="[5, 10, 25, 100]" :background="true" @update:page-size="setPageSize(pageSize)"
            @update:current-page="setPage(currentPage)" />
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"
import Cookies from "js-cookie";
import utils from "@/plugins/utils"

const pageSize = ref(10)
const currentPage = ref(1)

const props = defineProps({
    methods: {
        type: Object, required: true
    },
    pagination: {
        type: Object, required: true
    },
    params: {
        type: Object, required: true
    },
    schema: {
        type: String,
        required: true
    },
})

const setPage = (page) => {
    props.methods.setPage(page);
    storeParams();
}
const setPageSize = (size) => {
    props.methods.setPerpage(size);
    storeParams();
}
const storeParams = () => {
    Cookies.set(`${props.schema}Params`, JSON.stringify({
        pageSize: pageSize.value,
        currentPage: currentPage.value
    }))

}

onMounted(() => {
    const { page, perpage } = utils.getSavedParams(props.schema);
    pageSize.value = perpage;
    currentPage.value = page;

})
</script>