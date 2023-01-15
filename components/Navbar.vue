<template>
    <div class="z-50 bg-slate-900">
        <nav class="w-full">
            <ul class="flex items-center justify-between container list-none px-2 py-4 mx-auto">
                <li class="text-white">
                    <button @click="toggleSidebar()" class="px-2 bg-white rounded-md text-black">=</button>
                </li>
                <li>
                    <ProfileDropdown></ProfileDropdown>
                </li>
            </ul>
        </nav>
        <!-- collapse sidebar -->
        <div class="w-full min-h-screen absolute overflow-hidden z-50 hidden">
            <div class="bg-gray-800 w-3/4 lg:w-1/5" id="collapse-sidebar">
                <ul class="list-none dark:text-white">
                    <li v-for="item in sidebar_item" :key="item.id" class="py-4 px-4 border-b border-zinc-700"
                        @click="toggleSidebar()">
                        <NuxtLink :to="item.route" class="text-lg font-bold">{{ item.name }}</NuxtLink>
                    </li>
                    <li class="py-4 px-4 border-b border-zinc-700">
                        <NuxtLink to="/animes/the-eminence-in-shadow-17473" class="text-white">Link</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="bg-black opacity-60 w-full min-h-screen absolute -z-10" id="collapse-sidebar-bg"
                @click="toggleSidebar()"></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            sidebar: false,
            sidebar_item: [
                { id: 'home', name: 'Home', route: '/' },
            ]
        }
    },
    mounted() {

    },
    methods: {
        toggleSidebar() {
            const sidebar = document.getElementById('collapse-sidebar')
            const sidebarBg = document.getElementById('collapse-sidebar-bg')

            if (sidebar.classList.contains('fadeInFromLeft')) {
                sidebar.classList.remove('fadeInFromLeft')
                sidebar.classList.add('fadeInFromRight')
                if (sidebar.classList.contains('fadeInFromRight')) {
                    setTimeout(() => {
                        sidebar.parentElement.classList.add('hidden')
                        sidebar.parentElement.classList.remove('flex')
                        sidebarBg.classList.add('hidden')
                    }, 380)
                }
            } else {
                sidebar.classList.remove('fadeInFromRight')
                sidebar.classList.add('fadeInFromLeft')
                sidebar.parentElement.classList.remove('hidden')
                sidebar.parentElement.classList.add('flex')
                sidebarBg.classList.remove('hidden')
            }

            document.body.classList.toggle('overflow-hidden')
        }
    }
}
</script>

<style>
.animate {
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
}

.fadeInFromLeft {
    animation: moveInFromLeft 0.4s ease-out;
}

.fadeInFromRight {
    animation: moveInFromRight 0.4s ease-out;
}

/* animation move in from left */
@keyframes moveInFromLeft {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0);
    }
}

/* animation move in from right */
@keyframes moveInFromRight {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>