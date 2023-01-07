<template>
    <div class="z-50">
        <nav class="w-full bg-white dark:bg-black">
            <ul class="flex justify-between container list-none px-2 py-4 mx-auto">
                <li class=" text-black dark:text-white">
                    <button @click="toggleSidebar()">=</button>
                </li>
                <li>
                    <a href="/about" class="text-2xl font-bold">
                        <div class="rounded-full p-3 bg-black dark:bg-white"></div>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- collapse sidebar -->
        <div class="w-full min-h-screen absolute overflow-hidden z-50 hidden">
            <div class="bg-gray-200 dark:bg-zinc-800 w-3/4 lg:w-1/5" id="collapse-sidebar">
                <ul class="list-none dark:text-white">
                    <li>
                        <a href="/about" class="text-2xl font-bold">About</a>
                    </li>
                    <li>
                        <a href="/about" class="text-2xl font-bold">About</a>
                    </li>
                    <li>
                        <a href="/about" class="text-2xl font-bold">About</a>
                    </li>
                    <li>
                        <a href="/about" class="text-2xl font-bold">About</a>
                    </li>
                    <li>
                        <a href="/about" class="text-2xl font-bold">About</a>
                    </li>
                </ul>
            </div>
            <div class="bg-black opacity-60 w-full min-h-screen absolute -z-10 animate" id="collapse-sidebar-bg"
                @click="toggleSidebar()"></div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {

    },
    methods: {
        toggleSidebar() {
            const sidebar = document.getElementById('collapse-sidebar')
            const sidebarBg = document.getElementById('collapse-sidebar-bg')

            if (sidebar.classList.contains('fadeInFromLeft')) {
                sidebar.classList.remove('fadeInFromLeft')
                sidebar.classList.add('fadeInFromRight')
                sidebar.parentElement.classList.add('hidden')
                sidebar.parentElement.classList.remove('flex')
                sidebarBg.classList.add('hidden')
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
    animation: moveInFromLeft 0.5s ease-out;
}

.fadeInFromRight {
    animation: moveInFromRight 0.5s ease-out;
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