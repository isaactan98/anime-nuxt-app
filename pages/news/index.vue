<template>
    <div class="container px-4 mx-auto min-h-screen text-white">
        <h1 class="font-bold my-3">News</h1>

        <div class="grid gap-3 grid-cols-1 md:grid-cols-3">
            <nuxt-link :to="'news/' + news.newId + '?date=' + news.date + '&uuid=' + news.uuId" v-for="news in news"
                :key="news.id" class="mb-2">
                <div class="relative">
                    <div class="relative">
                        <img :src="news.thumbnail" alt="" class="rounded-xl object-cover w-full lg:w-96 h-64 lg:h-[32rem]">
                        <span class="absolute bottom-0 left-0 text-xs bg-purple-700 py-2 px-3 rounded-lg">
                            {{ news.uploadedAt }}
                        </span>
                    </div>
                    <p class="font-bold my-2">{{ news.title }}</p>
                </div>
                <p class="border border-purple-300 px-2 py-1 w-fit flex text-xs">
                    {{ news.topics[0] }}
                </p>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: []
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
                    console.log("JSON:", this.news)
                })
        }
    }
}
</script>

<style></style>