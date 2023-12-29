<template>
    <div class="space-y-2 relative input-container">
        <label v-if="props.label"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            :for="props.field">{{ props.label }}</label>
        <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :id="props.field" :placeholder="$global.errorValidation[field] || props.placeholder" :required="props.required"
            :type="props.type" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :class="$global.errorValidation[field] ? 'error-input' : ''">
    </div>
</template>

<script setup>


const props = defineProps({

    modelValue: {
        type: String
    },
    type: {
        type: String,
        default: "text"
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


})
</script>

