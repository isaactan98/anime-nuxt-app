<template>
    <div class="container px-4 mx-auto min-h-screen">

        <div v-if="isOpen">
            <ServerModal :isOpenModal="isOpen"></ServerModal>
        </div>

        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your Favourite <br>
                <span class="text-purple-500 flex items-center">Anime
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-8 h-8 ml-2">
                        <path fill-rule="evenodd"
                            d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </h1>
        </div>
        <div class="flex overflow-x-auto w-full gap-3 py-4">
            <div v-for="g in genre" :key="g.id" class="">
                <div class="text-xs px-4 py-2 rounded-full bg-purple-500 border-purple-500 text-white whitespace-nowrap cursor-pointer"
                    v-if="g.id == 'all'">
                    {{ g.name }}
                </div>
                <NuxtLink v-if="g.id != 'all'" :to="'/genre/' + g.id + '?page=1'"
                    class="text-xs px-4 py-2 rounded-full bg-purple-900 border-purple-500 text-white whitespace-nowrap cursor-pointer">
                    {{ g.name }}
                </NuxtLink>
            </div>
        </div>
        <div class="my-5">
            <h1 class="mb-4 text-white text-xl">Recent Release</h1>
            <div v-if="recentRelease != null && recentRelease.length > 0"
                class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
                <RecentReleaseComponent v-for="rr in recentRelease" :key="rr" :release="rr" class="snap-start" />
            </div>
            <div v-else class="h-28 grid place-content-center">
                <SpiningLoading></SpiningLoading>
            </div>
        </div>

        <div class="mt-5 pb-8" v-if="server == 'gogoanime'">
            <h1 class="mb-4 text-white text-xl">Top Airing</h1>
            <div v-if="topAiring != null && topAiring.length > 0"
                class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
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
                { id: 'all', name: 'All' },
                { id: 'action', name: 'Action' },
                { id: 'adventure', name: "Adventure" },
                { id: 'cars', name: "Cars" },
                { id: 'comedy', name: "Comedy" },
                { id: 'crime', name: "Crime" },
                { id: 'dementia', name: "Dementia" },
                { id: 'demons', name: "Demons" },
                { id: 'drama', name: "Drama" },
                { id: 'dub', name: "Dub" },
                { id: 'ecchi', name: "Ecchi" },
                { id: 'family', name: "Family" },
                { id: 'fantasy', name: "Fantasy" },
                { id: 'game', name: "Game" },
                { id: 'gourmet', name: "Gourmet" },
                { id: 'harem', name: "Harem" },
                { id: 'hentai', name: "Hentai" },
                { id: 'historical', name: "Historical" },
                { id: 'horror', name: "Horror" },
                { id: 'isekai', name: "Isekai" },
                { id: 'josei', name: "Josei" },
                { id: 'kids', name: "Kids" },
                { id: 'magic', name: "Magic" },
                { id: 'martial-arts', name: "Martial Art" },
                { id: 'mecha', name: "Mecha" },
                { id: 'military', name: "Military" },
                { id: 'Mmusic', name: "Mmusic" },
                { id: 'mystery', name: "Mystery" },
                { id: 'parody', name: "Parody" },
                { id: 'police', name: "Police" },
                { id: 'psychological', name: "Psychological" },
                { id: 'romance', name: "Romance" },
                { id: 'samurai', name: "Samurai" },
                { id: 'school', name: "School" },
                { id: 'sci-fi', name: "Sci-Fi" },
                { id: 'seinen', name: "Seinen" },
                { id: 'shoujo', name: "Shoujo" },
                { id: 'shoujo-ai', name: "Shoujo-ai" },
                { id: 'shounen', name: "Shounen" },
                { id: 'shounen-ai', name: "Shounen-ai" },
                { id: 'slice-of-Life', name: "Slice of Life" },
                { id: 'space', name: "Space" },
                { id: 'sports', name: "Sports" },
                { id: 'super-power', name: "Super Power" },
                { id: 'supernatural', name: "Supernatural" },
                { id: 'suspense', name: "Suspense" },
                { id: 'thriller', name: "Thriller" },
                { id: 'vampire', name: "Vampire" },
                { id: 'yaoi', name: "Yaoi" },
                { id: 'yuri', name: "Yuri" },
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
        },

        horizonScroll() {
            const scrollContainer = document.querySelector('.scroll-smooth');
            scrollContainer?.addEventListener('wheel', (e: any) => {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
            });
        }
    }
}

</script>

<style>

</style>