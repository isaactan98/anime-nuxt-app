<template>
    <div v-if="chapter">
        <img v-for="c in chapter" loading="lazy" :key="c"
            :src="'https://api-consumet-55ajst2bq-isaactan98.vercel.app/utils/image-proxy?url=' + c.img + '&referer=http://www.mangahere.cc'"
            alt="" class="w-full">
    </div>
    <div v-else class="w-full min-h-screen flex justify-center mt-5">
        <SpiningLoading></SpiningLoading>
    </div>
    <div class="w-full flex gap-3 justify-center mt-5" v-if="manga != null">
        <NuxtLink class="text-white px-4 py-2 bg-zinc-500 hover:bg-zinc-700 rounded-full" :to="`/manga/${manga.id}`">
            Main
        </NuxtLink>
        <NuxtLink v-if="nextChapter" class="text-white px-4 py-2 bg-zinc-500 hover:bg-zinc-700 rounded-full"
            :to="'/manga/' + goNextInfo.id">
            Next: <span class="font-bold">{{ goNextInfo.title }}</span>
        </NuxtLink>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chapter: null,
            loading: true,
            thisChapter: null,
            nextChapter: null,
            manga: null,
            mangaApi: "",
            goNextInfo: null
        }
    },
    mounted() {
        const config = useRuntimeConfig();
        this.mangaApi = config.mangaApi
        this.getMangaInfo()
        this.getChapter()
    },
    methods: {
        async getMangaInfo() {
            await fetch(this.mangaApi + "info?id=" + this.$route.params.manga)
                .then(res => res.json())
                .then(data => {
                    // console.log("info", data, this.$route.params)
                    this.manga = data
                    this.thisChapter = data.chapters.findIndex(x => x.id === this.$route.params.manga + "/" + this.$route.params.volume)
                    // console.log("getChapNum", this.thisChapter)
                    this.nextChapter = this.hasNextChapter(data.chapters, this.thisChapter)
                    // console.log("next chapter", this.nextChapter)
                    this.goNextInfo = data.chapters[this.thisChapter - 1]
                })
        },
        async getChapter() {
            await fetch(this.mangaApi + 'read?chapterId=' + this.$route.params.manga + "/" + this.$route.params.volume)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    this.chapter = data
                    this.loading = false
                })
        },
        filterFilter(arr, expression) {
            return arr.filter(function (item) {
                return item[Object.keys(expression)[0]] == Object.values(expression)[0];
            });
        },
        hasNextChapter(chapters, chapterIndex) {
            const nextChapter = chapters[chapterIndex - 1];

            if (nextChapter) {
                return true;
            } else {
                return false;
            }
        }

    },
}
</script>

<style></style>