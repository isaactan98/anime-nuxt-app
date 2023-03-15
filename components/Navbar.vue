<template>
    <div class="z-50 bg-slate-900">
        <nav class="w-full shadow-md">
            <ul class="flex items-center justify-between container list-none px-2 py-4 mx-auto">
                <li class="text-white">
                    <button @click="toggleSidebar()" class="p-2 bg-gray-900 rounded-md text-white shadow shadow-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                        </svg>
                    </button>
                </li>
                <li class="flex items-center gap-3">
                    <button @click="toggleSearch" v-show="!showSearch" class="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="w-6 h-6 text-white font-extrabold">
                            <path fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>

                    <div class="relative top-1">
                        <ProfileDropdown v-if="checkUserId || userId"></ProfileDropdown>
                        <LoginSignUpModal v-else></LoginSignUpModal>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- search input -->
        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div class="absolute w-full" v-show="showSearch">
                <div class="flex relative justify-center container mx-auto">
                    <input type="text" name="price" id="price"
                        class="block w-full rounded-md border-gray-300 pl-7 pr-12 py-3 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Search anime ..." v-model="searchQuery" autocomplete="off" autofocus>
                    <div class="absolute inset-y-0 right-0 flex items-center">
                        <button class=" p-2" @click="searchAnime">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                class="w-6 h-6 font-extrabold">
                                <path fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                        <button class=" p-2 text-red-500" @click="toggleSearch">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- collapse sidebar -->
        <div class="w-full min-h-screen absolute overflow-hidden z-50 hidden">
            <div class="bg-gray-900 w-3/4 md:w-2/5 lg:w-1/5" id="collapse-sidebar">
                <div class="grid grid-cols-1 text-white">
                    <NuxtLink @click="toggleSidebar()" v-for="item in sidebar_item" :key="item.id" :to="item.route"
                        class="py-4 px-4 border-b w-full border-zinc-700 text-lg font-bold">
                        {{ item.name }}
                    </NuxtLink>
                </div>
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
                { id: 'about', name: 'About', route: '/about' },
                { id: 'manga', name: 'Manga', route: '/manga' },
                { id: 'version1', name: 'V1', route: '/v1'}
            ],
            checkUserId: '',
            showSearch: false,
            searchQuery: ''
        }
    },
    props: ['userId'],
    mounted() {
        this.checkUserId = sessionStorage.getItem('userId')

        // if clicked enter key
        document.getElementById('price').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchAnime()
            }
        })

        document.getElementById('price').addEventListener('keyup', (e) => {
            if (e.key === 'Escape' && this.showSearch == true) {
                this.toggleSearch()
            }
        })
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
                    }, 220)
                }
            } else {
                sidebar.classList.remove('fadeInFromRight')
                sidebar.classList.add('fadeInFromLeft')
                sidebar.parentElement.classList.remove('hidden')
                sidebar.parentElement.classList.add('flex')
                sidebarBg.classList.remove('hidden')
            }

            document.body.classList.toggle('overflow-hidden')
        },
        toggleSearch() {
            this.showSearch = !this.showSearch
            this.searchQuery = ''
        },
        searchAnime() {
            // console.log('search anime')
            // console.log(this.searchQuery)
            this.showSearch = false
            this.$router.push(`/search/${this.searchQuery}?page=1`)
        }
    }
}
</script>

<style>
.fadeInFromLeft {
    animation: moveInFromLeft 0.25s ease-out;
}

.fadeInFromRight {
    animation: moveInFromRight 0.25s ease-out;
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