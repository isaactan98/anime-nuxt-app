<template>
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-300 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-[999]">
            <div class="bg-slate-800 p-8 rounded-3xl text-white shadow-md mx-5">
                <p class="text-center">This website uses cookies. By continuing to use this site, you accept our use of
                    cookies.
                </p>
                <button @click="accept"
                    class="block mx-auto mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                    Accept
                </button>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
export default {
    name: 'CookiePopup',
    data() {
        return {
            show: false,
        };
    },
    mounted() {
        setTimeout(() => {
            if (!localStorage.getItem('cookie-accepted')) {
                this.show = true;
            }
        }, 500);
    },
    methods: {
        accept() {
            this.show = false;
            localStorage.setItem('cookie-accepted', 'true');
        },
    },
}
</script>