<template>
    <div class="container px-4 mx-auto min-h-screen text-white">
        <h1 class="font-bold my-3">News</h1>

        <div class="grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-3" v-if="!loading">
            <nuxt-link :to="'news/' + news.newId + '?date=' + news.date + '&uuid=' + news.uuId" v-for="news in news"
                :key="news.id" class="mb-3">
                <div class="relative">
                    <div class="relative">
                        <img :src="news.thumbnail" alt="" class="rounded-xl object-cover w-full h-60 lg:h-[32rem]">
                        <span class="absolute bottom-0 left-0 text-xs bg-zinc-700 py-2 px-3 rounded-lg">
                            {{ news.uploadedAt }}
                        </span>
                    </div>
                    <p class="font-bold my-2">{{ news.title }}</p>
                </div>
                <p class="border border-zinc-300 px-2 py-1 w-fit flex text-xs">
                    {{ news.topics[0] }}
                </p>
            </nuxt-link>
        </div>

        <div v-else class="grid gap-5 md:gap-10 grid-cols-1 md:grid-cols-3">
            <div class="" v-for="i in 5">
                <div class="w-full h-60 lg:h-[32rem] bg-zinc-900 bg-opacity-50 rounded-xl animate-pulse"></div>
                <div class="mt-3">
                    <div class="bg-zinc-900 rounded-lg animate-pulse w-full h-8"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: [],
            loading: true
        }
    },
    mounted() {
        const config = useRuntimeConfig()
        this.getNews(config.newsApi)
    },
    methods: {
        async getNews(api) {
            fetch(api + 'recent-feeds')
                .then(response => response.json())
                .then(json => {
                    this.news = json
                    this.news.forEach(news => {
                        news.date = news.id.split('/')[0]
                        news.newId = news.id.split('/')[1]
                        news.uuId = news.id.split('/')[2]
                    })
                    this.loading = false
                    // console.log("JSON:", this.news)
                })
        }
    }
}
</script>

<style></style>