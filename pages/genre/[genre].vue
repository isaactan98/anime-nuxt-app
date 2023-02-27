<template>
    <div class="container p-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[20vh] flex items-center" id="genreHeader">
            <h1 class="text-4xl font-extrabold">
                <span class=" text-purple-500">{{ genre }}</span> Anime
            </h1>
        </div>
        <div v-if="genreFetch" class="text-zinc-300 text-xs">
            Results: {{ genreFetch.results.length }} / Page {{ page }}
        </div>
        <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 min-h-screen" v-if="genreFetch">
            <NuxtLink v-for="g in genreFetch.results" :key="g" :to="'/animes/' + g.id" class="mb-3">
                <div class=" object-cover h-56 lg:h-96">
                    <img :src="g.image" alt="" class="rounded-xl object-cover w-full h-full">
                </div>
                <div class="relative flex justify-between items-center ">
                    <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                    </div>
                    <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                        <h3 class="truncate text-xs lg:text-sm max-w-[8rem]">
                            {{ g.title }}
                        </h3>
                    </div>
                    <!-- <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-1">
                            EP {{ list.currentEpisode }}
                        </span> -->
                </div>
            </NuxtLink>
        </div>
        <div v-else class="text-white container px-4 mx-auto min-h-screen flex justify-center">
            <SpiningLoading></SpiningLoading>
        </div>
        <!-- pagination component -->
        <div class="flex items-center justify-center w-full text-white mt-10">
            <button class="rounded-full py-1 px-3 mx-2"
                :class="genreFetch?.currentPage == pl ? ' bg-purple-700' : 'bg-purple-500 opacity-50'"
                v-for="pl in pageList" :key="pl" @click="pageChange(pl)">
                {{ pl }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            genre: '',
            genreFetch: null,
            page: 1,
            pageList: [],
            apiUrl: ""
        }
    },
    mounted() {
        this.genre = this.$route.params.genre
        this.page = this.$route.query.page

        useHead({
            title: this.genre,
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'Watch ' + this.genre + ' Anime Online Free in HD'
            }]
        })

        const config = useRuntimeConfig();
        if (localStorage.getItem('server') == 'gogoanime') {
            this.apiUrl = config.apiUrl
            this.getGenreResult(config.apiUrl, this.genre, this.page)

            if (this.page != 1) {
                this.pageList.push(parseInt(this.page) - 1)
                this.pageList.push(this.page)
            } else {
                this.pageList.push(this.page)
            }

        } else {
            alert('Server does not support this feature yet!')
            window.location.href = '/'
        }

    },
    methods: {
        getGenreResult(api, genre, page) {
            fetch(api + 'genre/' + genre + '?page=' + page)
                .then(res => res.json())
                .then(data => {
                    if (data.message == null) {
                        this.genreFetch = data
                        // console.log(data)
                        if (data.results.length == 20) {
                            fetch(api + 'genre/' + genre + '?page=' + (parseInt(page) + 1))
                                .then(res => res.json())
                                .then(data => {
                                    if (data.results.length > 0) {
                                        this.pageList.push(parseInt(page) + 1)
                                    }
                                })
                        }
                    } else {
                        alert('No result found!')
                        window.location.href = '/'
                    }
                    document.getElementById('genreHeader').scrollIntoView()
                }).catch(err => {
                    console.log(err)
                })
        },
        pageChange(page) {
            this.genreFetch = null
            this.page = page
            this.pageList = []
            if (page != 1) {
                this.pageList.push(parseInt(page) - 1)
            }
            this.pageList.push(page)
            this.$router.push({
                path: '/genre/' + this.genre,
                query: {
                    page: page
                }
            })
            this.getGenreResult(this.apiUrl, this.genre, this.page)
        }
    }
}
</script>

<style></style>