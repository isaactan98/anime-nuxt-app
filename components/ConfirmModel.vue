<template>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4">
                <div class="fixed inset-0 bg-black opacity-75"></div>
                <div class="bg-gray-700 rounded-lg p-4 max-w-md w-full z-10 text-white">
                    <div class="text-lg font-medium mb-4">
                        <slot name="modal-title">Are you sure?</slot>
                    </div>
                    <div class="mb-4">
                        <slot name="modal-content">
                            <p>This action cannot be undone.</p>
                        </slot>
                    </div>
                    <div class="flex justify-end">
                        <button @click="cancel" class="px-4 py-2 mr-2 text-gray-300 hover:text-white">Cancel</button>
                        <button @click="confirm" class="px-4 py-2 bg-purple-600 text-white rounded">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        showModal: false,
    },
    methods: {
        confirm() {
            this.$emit('confirmed', "yes");
        },
        cancel() {
            this.$emit('confirmed', "no");
        },
    },
}
</script>

<style></style>