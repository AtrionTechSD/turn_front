<template>
    <div class="py-2">

        <button
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 text-gray-50 w-full  px-4 py-2 omitDark hover:bg-gray-700 "
            v-bind="$attrs">

            <slot />
        </button>
    </div>
</template>

<script setup>


</script>