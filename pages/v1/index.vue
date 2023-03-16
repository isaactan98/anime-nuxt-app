<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="my-5">
            <div class="flex justify-between text-white mb-3">
                <h5 class="font-bold">Recent Release</h5>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" v-if="recentRelease.length > 0">
                <!-- <AnimeCard :animeInfo="recentRelease"></AnimeCard> -->
                <LazyAnimeCard :animeInfo="recentRelease"></LazyAnimeCard>
            </div>
            <div class="my-5" v-else>
                <SpiningLoading></SpiningLoading>
            </div>
        </div>
        <div class="my-5">
            <div class="flex justify-between text-white mb-3">
                <h5 class="font-bold">Top Airing</h5>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" v-if="topAiring.length > 0">
                <LazyAnimeCard :animeInfo="topAiring"></LazyAnimeCard>
            </div>
            <div class="my-5" v-else>
                <SpiningLoading></SpiningLoading>
            </div>
        </div>
        <div class="my-5">
            <div class="flex justify-between text-white mb-3">
                <h5 class="font-bold">Popular</h5>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" v-if="popular.length > 0">
                <LazyAnimeCard :animeInfo="popular"></LazyAnimeCard>
            </div>
            <div class="my-5" v-else>
                <SpiningLoading></SpiningLoading>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recentRelease: [],
            topAiring: [],
            popular: [],
            loading: [true, true, true]
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
        this.getRecentRelease()
        this.getTopAiring()
        this.getPopular()
    },
    methods: {
        async getRecentRelease() {
            const config = useRuntimeConfig();
            await fetch(config.apiUrlV1 + 'recent-release')
                .then(response => response.json())
                .then(data => {
                    // console.log("data: ", data)
                    this.loading[0] = false
                    if (data.length > 0) {
                        this.recentRelease = data
                    } else {
                        alert(data.message)
                    }
                    // document.getElementById('releaseHeader').scrollIntoView()
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
        async getTopAiring() {
            const config = useRuntimeConfig();
            await fetch(config.apiUrlV1 + 'top-airing')
                .then(response => response.json())
                .then(data => {
                    // console.log("data: ", data)
                    this.loading[1] = false
                    if (data.length > 0) {
                        this.topAiring = data
                    } else {
                        alert(data.message)
                    }
                    // document.getElementById('releaseHeader').scrollIntoView()
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        },
        async getPopular() {
            const config = useRuntimeConfig();
            await fetch(config.apiUrlV1 + 'popular')
                .then(response => response.json())
                .then(data => {
                    // console.log("data: ", data)
                    this.loading[2] = false
                    if (data.length > 0) {
                        this.popular = data
                    } else {
                        alert(data.message)
                    }
                    // document.getElementById('releaseHeader').scrollIntoView()
                })
                .catch(err => {
                    alert('Something went wrong, please try again later')
                    console.log(err)
                });
        }
    }
}
</script>

<style></style>