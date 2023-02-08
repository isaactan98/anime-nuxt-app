<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Recent <br>
                <span class="text-purple-500 flex items-center">Release
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-8 h-8 ml-2">
                        <path fill-rule="evenodd"
                            d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </h1>
        </div>
        <div v-if="loading == false" class="grid grid-cols-2 gap-3">
            <div v-for="release in recentRelease" :key="release" class="relative">
                <a :href="'/animes/' + release.id" class="relative">
                    <div class="">
                        <img :src="release.image" alt="" class="rounded-xl object-cover h-72 lg:h-[32rem]">
                    </div>
                    <div class="relative flex justify-between items-center ">
                        <div
                            class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                        </div>
                        <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                            <h3 class="truncate text-xs lg:text-sm max-w-[4rem] lg:max-w-xs">
                                {{ release.title }}
                            </h3>
                        </div>
                        <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                            v-if="release.episode || release.episodeNumber">
                            EP {{ release.episode ?? release.episodeNumber }}
                        </span>
                    </div>
                </a>
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
                    this.loading = false
                    if (data.results.length > 0) {
                        this.hasNextPage = data.hasNextPage
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

<style>

</style>