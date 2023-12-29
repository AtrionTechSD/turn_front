<template>
    <!-- Modal Backdrop -->
    <button @click="toogleModal">
        <slot name="button">
            Abrir Modal
        </slot>
    </button>
    <div class="left-0 top-0 w-full h-full border-4 transition-opacity omitDark bg-gray-800 bg-opacity-50 z-[1100] absolute flex justify-center items-center"
        v-show="modalOpen">

        <!-- Modal container -->
        <div class="max-w-lg md:max-w-2xl p-4 w-full omitDark bg-white dark:bg-gray-600 rounded-lg" :class="showElements">
            <!-- Modal Haeder -->
            <div class="px-3 py-2 w-full omitDark bg-gray-100 dark:bg-gray-500 h-10 rounded-lg pr-4 relative">
                <slot name="header"><b class="omitDark">Título del modal</b></slot>
                <button @click="toogleModal"
                    class="omitDark pp-2 rounded-full hover:bg-gray-200 flex items-center justify-center absolute right-1 inset-y-1/2 z-50">
                    <span class="material-icons-outlined ">close</span>
                </button>
            </div>
            <hr class="my-2">
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"

const modalOpen = ref(false)
const showElements = ref(null)

const toogleModal = () => {
    if (showElements.value == "open") {
        showElements.value = "close"
    } else {
        showElements.value = "open"
    }
    modalOpen.value = !modalOpen.value;
}

</script>