<template>
    <div class="z-50">
        <nav class="w-full bg-white">
            <ul class="flex justify-between container list-none px-2 py-4">
                <li>
                    <button @click="toggleSidebar()">=</button>
                </li>
                <li>
                    <a href="/about" class="text-2xl font-bold">
                        <div class="rounded-full p-3 bg-black"></div>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- collapse sidebar -->
        <div class="hidden w-full min-h-screen absolute overflow-hidden z-50" id="collapse-sidebar">
            <div class="bg-gray-200 w-3/4">
                <ul class="list-none">
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
            <div class=" bg-black opacity-60 w-1/4"></div>
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
            if (sidebar.classList.contains('fadeInFromLeft')) {
                sidebar.classList.remove('fadeInFromLeft')
                sidebar.classList.add('fadeInFromRight')
            } else {
                sidebar.classList.remove('fadeInFromRight')
                sidebar.classList.add('fadeInFromLeft')
            }
            sidebar.classList.toggle('hidden')
            sidebar.classList.toggle('flex')
            document.body.classList.toggle('overflow-hidden')
        }
    }
}
</script>

<style>
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
        transform: translateX(100%);
    }

    100% {
        transform: translateX(0);
    }
}
</style>