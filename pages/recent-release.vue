<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[10vh] flex items-center">
            <h1 class="text-4xl font-extrabold" id="releaseHeader">
                Recent <br>
                <span class="text-purple-500 flex items-center">Release
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-8 h-8 ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                </span>
            </h1>
        </div>
        <div v-if="loading == false" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 min-h-screen">
            <div v-for="release in recentRelease" :key="release" class="relative mb-3">
                <button @click="navTo('/animes/' + release.id)" class="relative">
                    <div class="">
                        <img :src="release.image" loading="lazy" alt="" class="rounded-xl object-cover h-72 lg:h-[32rem]">
                    </div>
                    <div class="relative flex justify-between items-center ">
                        <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                        </div>
                        <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                            <h3 class="truncate text-xs lg:text-sm max-w-[4rem] lg:max-w-[10rem]">
                                {{ release.title }}
                            </h3>
                        </div>
                        <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                            v-if="release.episode || release.episodeNumber">
                            EP {{ release.episode ?? release.episodeNumber }}
                        </span>
                    </div>
                </button>
            </div>
        </div>
        <div v-else class="w-full flex min-h-screen justify-center mt-10">
            <SpiningLoading></SpiningLoading>
        </div>
        <div class="flex items-center justify-center w-full text-white mt-10">
            <button v-for="p in pageList" :key="p" class="rounded-full py-1 px-3 mx-2"
                :class="this.currentPage == p ? ' bg-purple-700' : 'bg-purple-500 opacity-50'" @click="nextPage(p)">
                {{ p }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recentRelease: null,
            hasNextPage: false,
            loading: true,
            currentPage: 1,
            pageList: []
        }
    },
    mounted() {
        useHead({
            title: 'Recent Release',
            meta: [
                {
                    name: 'description',
                    content: 'Recent Release'
                },
                {
                    name: 'keywords',
                    content: 'Recent Release'
                }
            ]
        })
        this.currentPage = this.$route.query.page ?? 1
        this.getRecentRelease()
    },
    methods: {
        async getRecentRelease() {
            if (this.currentPage != 1) {
                this.pageList.push(parseInt(this.currentPage) - 1)
            }
            this.pageList.push(this.currentPage)
            this.pageList.push(parseInt(this.currentPage) + 1)
            const config = useRuntimeConfig();
            await fetch(config.apiUrl + 'recent-episodes?page=' + this.currentPage)
                .then(response => response.json())
                .then(data => {
                    console.warn(data)
                    this.loading = false
                    if (data.results.length > 0) {
                        this.hasNextPage = data.hasNextPage
                        this.recentRelease = data.results
                    } else {
                        alert(data.message)
                    }
                    document.getElementById('releaseHeader').scrollIntoView()
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
        nextPage(p) {
            this.loading = true
            this.pageList = []
            this.currentPage = p
            this.getRecentRelease()
            this.$router.push({
                path: '/recent-release',
                query: {
                    page: this.currentPage
                }
            })
        },
    },
}
</script>

<style></style>