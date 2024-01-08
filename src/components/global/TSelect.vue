<template>
    <div class="space-y-2 relative input-container ">
        <label v-if="props.label"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            :for="props.field">{{ props.label }}</label>
        <input type="hidden" name="" v-bind="$attrs" :required="props.required">
        <div class="absolute inset-y-1/2 right-1 transform -translate-y-1 cursor-pointer select-none">
            <span class="material-icons-outlined text-xs " @click="showList = !showList">
                {{ showList ? 'close' : 'expand_more' }}
            </span>
        </div>
        <input autocomplete="false"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 pr-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :id="props.field" :placeholder="$global.errorValidation[field] || props.placeholder" v-model="valueSearch"
            :class="$global.errorValidation[field] ? 'error-input' : ''" @focus="onEnterInput">

        <div :class="showList ? 'opacity-1' : 'opacity-0'" @focus="onEnterInput" tabindex="1"
            class="absolute z-[200] shadow-lg border  border-white bg-white rounded-md left-0 w-full text-sm space-y-2 transition-all ease-in-out duration-500 max-h-56 overflow-y-auto">
            <template v-if="showList">
                <div @click="onSelect(item)" class="cursor-pointer  omitDark hover:bg-gray-100 px-1.5 py-1 rounded-md"
                    v-for="item in filter(valueSearch)" :key="item.value">
                    <p class=" ellipsis omitDark">{{ item.label }}</p>
                </div>
            </template>

        </div>

    </div>
</template>

<script setup>
import { ref, watch, onUpdated } from 'vue';
const showList = ref(false)
const valueSearch = ref(null)
const emit = defineEmits(["update:modelValue"])
const filtered = ref([])

const filter = (string) => {
    if (!string) return props.options;
    return props.options.filter(obj => {
        return Object.values(obj).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(string.toLowerCase())
        );
    });
}
const onSelect = (item) => {
    valueSearch.value = item.label
    emit("update:modelValue", item.value);
    filtered.value = filter("");
    onFocusout();
}
const onEnterInput = () => {
    valueSearch.value = '';
    showList.value = true
}

const onFocusout = () => {
    showList.value = false
}
watch(valueSearch, (newVal) => {
    if (!newVal) {
        emit("update:modelValue", null);
    }
    filtered.value = filter(newVal)
})
onUpdated(() => {
    const current = props.options.find(opt => opt.value == props.modelValue);
    if (!valueSearch.value) {
        valueSearch.value = current?.label
    }
})


const props = defineProps({

    modelValue: {
        type: Number
    },

    label: {
        type: String,
        default: ""
    },
    field: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    },
    required: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        required: true
    }

})
</script>

