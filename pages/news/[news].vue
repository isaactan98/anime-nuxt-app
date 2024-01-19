<template>
    <div class="container px-4 mx-auto min-h-screen text-white">
        <div v-if="news !== null" class="">
            <!-- <h1>{{ news.title }}</h1>
            <p class="text-xs my-1">{{ news.uploadedAt }}</p>
            <img :src="news.image" alt="" class="my-3">
            <p class="underline">{{ news.intro }}</p>
            <section class="my-5 text-justify">
                {{ news.description }}
            </section> -->

            <div id="newBody"></div>
            <a :href="news.url" target="_blank"
                class="flex justify-center text-center underline bg-zinc-500 py-1 rounded-md md:w-1/4 mt-5">
                View Source
            </a>
        </div>
        <div class="" v-if="news === null">
            <div class=" w-2/3 bg-zinc-800 bg-opacity-25 rounded-xl h-72 animate-pulse"></div>
            <!-- few line -->
            <div class=" w-full bg-zinc-800 bg-opacity-25 rounded-xl h-10 animate-pulse mt-3"></div>
            <div class=" w-full bg-zinc-800 bg-opacity-25 rounded-xl h-10 animate-pulse mt-3"></div>
            <div class=" w-full bg-zinc-800 bg-opacity-25 rounded-xl h-10 animate-pulse mt-3"></div>
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
        // await this.getRecent(config.newsApi)

        // const date = this.news.id.split('/')[0]
        // const newsId = this.news.id.split('/')[1]
        // const uuid = this.news.id.split('/')[2]

        // this.news.image = this.recentNews.filter(news => news.id === date + '/' + newsId + '/' + uuid)[0].thumbnail
    },
    methods: {
        async getNews(api, params, query) {
            await fetch(api + 'info?id=' + query.date + '/' + params.news + '/' + query.uuid)
                .then(response => response.json())
                .then(async json => {
                    this.news = json
                    await useNewScapper(this.news.url).then(async (data) => {
                        console.log("data:", data)
                        document.getElementById('newBody').appendChild(data.main)
                        await this.getRecent(api)
                    })
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

<style>
p,
blockquote {
    text-align: justify;
}

hr {
    margin: 1rem 0;
}

/* img {
    margin: 1rem 0;
} */

.sub-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

table {
    font-size: 0.8rem;
    margin: 1rem 0;
}

figure > img {
    @apply py-3
}

.fright {
    @apply py-3
}
</style>