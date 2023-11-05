<template>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div v-if="open" class="relative z-50" id="headlessui-dialog-146" role="dialog" aria-modal="true">
            <div class="fixed inset-0 transition-opacity bg-gray-800/75" @click="close()"></div>
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center text-center p-4 sm:p-0" @click="close()">
                    <div
                        class="relative text-left rtl:text-right overflow-hidden w-full flex flex-col bg-gray-900 shadow-xl sm:max-w-lg rounded-lg sm:my-8">
                        <div class="p-4">
                            <div
                                class="relative overflow-hidden rounded border border-dashed border-gray-500 px-4 flex items-center justify-center max-h-screen">
                                <img :src="image" class="rounded-lg h-full w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
export default {
    props: {
        image: {
            type: String,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            open: false,
        }
    },
    mounted() {
        this.open = this.isOpen;
    },
    methods: {
        close() {
            this.open = false;
            this.$emit('close', false);
        },
    },
}
</script>