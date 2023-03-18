<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-2xl font-extrabold">
                Search Result for: <br>
                <span class="text-purple-500"><i>{{ query }}</i></span>
            </h1>
        </div>

        <div v-if="animeList" class="text-zinc-300 text-xs">
            Results: {{ animeList.results?.length }} / Page {{ page }}
        </div>

        <div v-if="loading == false">
            <div v-if="animeList.results.length > 0"
                class="my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4 min-h-screen">
                <div class="relative" v-for="anime in animeList.results" :key="anime">
                    <a :href="'/animes/' + anime.id" class="relative">
                        <div class=" object-cover h-56 lg:h-96">
                            <img :src="anime.image" loading="lazy" alt="" class="rounded-xl object-cover w-full h-full">
                        </div>
                        <div class="relative flex justify-between items-center ">
                            <div class="px-3 py-2 rounded-full bg-purple-500 text-white absolute left-1 bottom-1">
                                <h3 class="truncate text-xs lg:text-sm max-w-[8rem]">
                                    {{ anime.title }}
                                </h3>
                            </div>
                            <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                                v-if="anime.episode || anime.episodeNumber">
                                EP {{ anime.episode ?? anime.episodeNumber }}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
            <div v-else class="my-5">
                <h1 class="text-white font-bold">No Result Found.</h1>
            </div>
        </div>
        <div v-else class="grid place-items-center min-h-screen">
            <SpiningLoading></SpiningLoading>
        </div>

        <div class="flex items-center justify-center w-full text-white mt-10" v-if="animeList.length > 0">
            <button class="rounded-full py-1 px-3 mx-2"
                :class="animeList?.currentPage == pl ? ' bg-purple-700' : 'bg-purple-500 opacity-50'" v-for="pl in pageList"
                :key="pl" @click="pageChange(pl)">
                {{ pl }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            animeList: [],
            page: 1,
            pageList: [],
            apiUrl: "",
            loading: true
        }
    },
    mounted() {
        this.query = this.$route.params.anime
        this.page = this.$route.query.page

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

        if (localStorage.getItem('server') == 'gogoanime') {
            this.apiUrl = config.apiUrl + this.query

            if (this.page != 1) {
                this.pageList.push(parseInt(this.page) - 1)
                this.pageList.push(this.page)
            } else {
                this.pageList.push(this.page)
            }
        } else {
            this.apiUrl = config.apiUrl2 + this.query
        }
        this.searchAnime(this.apiUrl, this.page)

    },
    methods: {
        searchAnime(api, page) {
            fetch(api + '?page=' + page)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.animeList = data
                    if (data.hasNextPage) {
                        this.pageList.push(parseInt(page) + 1)
                    }
                    this.loading = false
                })
        },
        pageChange(page) {
            this.animeList = []
            this.page = page
            this.pageList = []
            if (page != 1) {
                this.pageList.push(parseInt(page) - 1)
            }
            this.pageList.push(page)
            this.$router.push({
                path: '/search/' + this.query,
                query: {
                    page: page
                }
            })
            this.searchAnime(this.apiUrl, this.page)
        }
    }
}
</script>

<style></style>