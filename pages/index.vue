<template>
    <div class="container px-4 mx-auto min-h-screen">

        <div v-if="isOpen">
            <ServerModal :isOpenModal="isOpen"></ServerModal>
        </div>

        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your Favourite <br>
                <span class="text-purple-500">Anime</span>
            </h1>
        </div>
        <div class="flex overflow-x-auto w-full gap-3 py-4 scrollbar-hide">
            <div v-for="g in genre" :key="g.id" class="">
                <h1 class="text-xs px-4 py-2 rounded-full border-purple-500 text-white"
                    :class="g.id == 'all' ? 'bg-purple-500' : 'bg-purple-900'">
                    {{ g.name }}
                </h1>
            </div>
        </div>
        <div class="my-5">
            <h1 class="mb-4 text-white text-xl">Recent Release</h1>
            <div v-if="recentRelease != null && recentRelease.length > 0"
                class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth scrollbar-hide">
                <RecentReleaseComponent v-for="rr in recentRelease" :key="rr" :release="rr" class="snap-start" />
            </div>
            <div v-else class="h-28 grid place-content-center">
                <SpiningLoading></SpiningLoading>
            </div>
        </div>

        <div class="mt-5 pb-8" v-if="server == 'gogoanime'">
            <h1 class="mb-4 text-white text-xl">Top Airing</h1>
            <div v-if="topAiring != null && topAiring.length > 0"
                class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth scrollbar-hide">
                <RecentReleaseComponent v-for="ta in topAiring" :key="ta" :release="ta" class="snap-start" />
            </div>
            <div v-else class="h-28 grid place-content-center">
                <SpiningLoading></SpiningLoading>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {

    data() {
        return {
            isOpen: false,
            recentRelease: [],
            genre: [
                // anime genre 
                { id: 'all', name: 'All' },
                { id: 'action', name: 'Action' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
            ],
            server: '',
            topAiring: []
        }
    },
    mounted() {
        useHead({
            title: 'Home',
            meta: [
                {
                    name: 'description',
                    content: 'Anime'
                },
                {
                    name: 'keywords',
                    content: 'Anime'
                }
            ]
        })
        this.getServer()
        if (this.isOpen) {
            return
        } else {
            this.getRecentRelease()
        }

        this.server = localStorage.getItem('server') ?? ''
        if (this.server == 'gogoanime') {
            this.getTopAiring()
        }
    },
    methods: {
        async getRecentRelease() {
            const config = useRuntimeConfig();
            var url = ''

            if (localStorage.getItem('server') == 'gogoanime') {
                url = config.apiUrl + 'recent-episodes'
            } else {
                url = config.apiUrl2 + 'recent-episodes'
            }

            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        this.recentRelease = data.results
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },

        getServer() {
            localStorage.getItem('server') ? this.isOpen = false : this.isOpen = true;
        },

        async getTopAiring() {
            const config = useRuntimeConfig();
            var url = ''
            url = config.apiUrl + 'top-airing'

            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    if (data.results.length > 0) {
                        this.topAiring = data.results
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    // console.log(err)
                });
        }
    }
}

</script>

<style>

</style>