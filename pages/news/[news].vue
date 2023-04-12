<template>
    <div class="container px-4 mx-auto min-h-screen text-white">
        <h1 class="font-bold mb-5">NEWS</h1>
        <div v-if="news !== null" class="grid">
            <h1>{{ news.title }}</h1>
            <p class="text-xs my-1">{{ news.uploadedAt }}</p>
            <img :src="news.thumbnail" alt="" class="my-3">
            <p class="underline">{{ news.intro }}</p>
            <section class="my-5 text-justify">
                {{ news.description }}
            </section>

            <a :href="news.url" target="_blank" class="justify-center text-center underline bg-purple-500 py-1 rounded-md md:w-1/4">
                View Source
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: null
        }
    },
    mounted() {
        const config = useRuntimeConfig()
        this.getNews(config.newsApi, this.$route.params, this.$route.query)
    },
    methods: {
        async getNews(api, params, query) {
            fetch(api + 'info?id=' + query.date + '/' + params.news + '/' + query.uuid)
                .then(response => response.json())
                .then(json => {
                    this.news = json
                    console.log("JSON:", this.news)
                })
        }
    }
}
</script>

<style></style>