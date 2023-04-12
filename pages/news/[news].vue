<template>
    <div class="container px-4 mx-auto min-h-screen text-white">
        <h1 class="font-bold mb-5">NEWS</h1>
        <div v-if="news !== null" class="grid">
            <h1>{{ news.title }}</h1>
            <p class="text-xs my-1">{{ news.uploadedAt }}</p>
            <img :src="news.image" alt="" class="my-3">
            <p class="underline">{{ news.intro }}</p>
            <section class="my-5 text-justify">
                {{ news.description }}
            </section>

            <a :href="news.url" target="_blank"
                class="justify-center text-center underline bg-purple-500 py-1 rounded-md md:w-1/4">
                View Source
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: null,
            recentNews: null
        }
    },
    async mounted() {
        const config = useRuntimeConfig()
        await this.getNews(config.newsApi, this.$route.params, this.$route.query)
        await this.getRecent(config.newsApi)

        const date = this.news.id.split('/')[0]
        const newsId = this.news.id.split('/')[1]
        const uuid = this.news.id.split('/')[2]

        this.news.image = this.recentNews.filter(news => news.id === date + '/' + newsId + '/' + uuid)[0].thumbnail
    },
    methods: {
        async getNews(api, params, query) {
            await fetch(api + 'info?id=' + query.date + '/' + params.news + '/' + query.uuid)
                .then(response => response.json())
                .then(json => {
                    this.news = json
                    // console.log("JSON:", this.news)
                })
        },
        async getRecent(api) {
            await fetch(api + 'recent-feeds')
                .then(response => response.json())
                .then(json => {
                    this.recentNews = json
                    this.recentNews.forEach(news => {
                        news.date = news.id.split('/')[0]
                        news.newId = news.id.split('/')[1]
                        news.uuId = news.id.split('/')[2]
                    })
                    // console.log("JSON:", this.recentNews)
                })
        },
    }
}
</script>

<style></style>