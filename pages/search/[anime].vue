<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-2xl font-extrabold">
                Search Result for: <br>
                <span class="text-purple-500"><i>{{ query }}</i></span>
            </h1>
        </div>

        <div v-if="animeList != null" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
            <div class="mb-5 relative" v-for="anime in animeList" :key="anime">
                <a :href="'/animes/' + anime.id" class="relative">
                    <div class=" object-cover h-56 lg:h-96">
                        <img :src="anime.image" alt="" class="rounded-xl object-cover w-full h-full">
                    </div>
                    <div class="relative flex justify-between items-center ">
                        <div class="px-3 py-2 rounded-full bg-purple-500 text-white absolute left-1 bottom-1">
                            <h3 class="truncate text-xs lg:text-sm max-w-[8rem] lg:max-w-xs">
                                {{ anime.title }}
                            </h3>
                        </div>
                        <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                            v-if="anime.episode && anime.episodeNumber">
                            EP {{ anime.episode ?? anime.episodeNumber }}
                        </span>
                    </div>
                </a>
            </div>
        </div>
        <div v-else class="text-white">
            Loading...
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            animeList: []
        }
    },
    mounted() {
        this.query = this.$route.params.anime

        useHead({
            title: 'Search Result for: ' + this.query,
            meta: [
                {
                    name: 'description',
                    content: 'Search Result for: ' + this.query
                }
            ]
        })
        const config = useRuntimeConfig()
        var url = ''
        if (localStorage.getItem('server') == 'gogoanime') {
            url = config.apiUrl + this.query
        } else {
            url = config.apiUrl2 + this.query
        }
        this.searchAnime(url)

    },
    methods: {
        searchAnime(api) {
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.animeList = data.results
                })
        }
    }
}
</script>

<style>

</style>