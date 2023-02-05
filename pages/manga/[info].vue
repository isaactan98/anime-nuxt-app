<template>
    <div class="container p-4 mx-auto min-h-screen">
        <div v-if="manga != null" class="">
            <div>
                <img :src="manga.image" alt="" class="rounded-2xl">
            </div>
            <div class="text-white mt-3">
                <h1 class="font-bold text-xl">{{ Object.values(manga.altTitles[0])[0] }}</h1>
                <div class="my-2">
                    <h1>Other name:</h1>
                    <div v-for="(altt, index) in manga.altTitles" :key="index">
                        <span class="text-zinc-400 text-sm" v-if="index != 0">{{ Object.values(altt)[0] }}</span>
                    </div>
                </div>
                <span>Status:</span><span class="ml-2">{{ manga.status }}</span>
                <p class="max-h-56 overflow-y-auto mt-3 text-zinc-400 text-justify text-sm">
                    {{ manga.description.en }}
                </p>
            </div>

            <div class="text-white my-3">
                <h1 class=" font-bold">Chapters:</h1>
                <div class="grid grid-cols-3 gap-2 mt-2">
                    <NuxtLink v-for="chp in manga.chapters" :key="chp" :to="'/manga/' + manga.id + '/' + chp.id"
                        class=" bg-purple-500 py-3 px-4 rounded-md text-sm">
                        Chap {{ chp.title }}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div v-else class="w-full flex justify-center mt-5">
            <SpiningLoading></SpiningLoading>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            manga: null,
            id: null,
            loading: true,
        }
    },
    mounted() {
        this.id = this.$route.params.info
        this.getMangaInfo(this.id)
    },
    methods: {
        async getMangaInfo(id) {
            await fetch('https://shadow-anime-api.vercel.app/manga/mangadex/info/' + id)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.manga = data
                    this.loading = false
                })
        },
    },
}
</script>

<style>

</style>