<template>
    <div class="">
        <button
            class=" inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors  disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-white dark:bg-gray-600 w-full  px-4 py-2  hover:bg-gray-300 hover:text-gray-700 hover:dark:text-gray-800 hover:dark:bg-white ring-transparent border-transparent outline-transparent"
            v-bind="$attrs">
            <slot />
        </button>
    </div>
</template>

<script setup>


</script>