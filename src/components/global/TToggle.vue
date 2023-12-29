<template>
    <div class=" w-max  flex items-center cursor-pointer  border-gray-800" :for="props.field"
        @click="$emit('update:modelValue', !props.modelValue)">
        <p class="mr-4 text-sm">{{ props.label }}</p>
        <div class="relative omitDark  w-12 h-6 rounded-full" :class="modelValue ? 'bg-blue-100' : 'bg-gray-400'">
            <span class="absolute omitDark transition-all ease-in-out duration-500 top-1 bg-white w-4 h-4 rounded-full"
                :class="modelValue ? 'left-[60%] bg-green-500' : 'left-1 '"></span>
        </div>

    </div>
</template>

<script setup>


const props = defineProps({
    modelValue: {
        type: Boolean
    },
    label: {
        type: String,
        default: ""
    },
    field: {
        type: String,
        default: ""
    },
})
</script>