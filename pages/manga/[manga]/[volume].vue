<template>
    <div v-if="chapter">
        <img v-for="c in chapter" loading="lazy" :key="c" :src="c.img" alt="" class="w-full">
    </div>
    <div v-else class="w-full min-h-screen flex justify-center mt-5">
        <SpiningLoading></SpiningLoading>
    </div>
    <div class="w-full flex justify-center mt-5" v-if="nextChapter != null">
        <NuxtLink class="text-white px-4 py-2 bg-purple-500 hover:bg-purple-700 rounded-full"
            :to="'/manga/' + manga.id + '/' + nextChapter[0].id">
            Next: <span class="font-bold">{{ nextChapter[0].title }}</span>
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
        }
    },
    mounted() {
        // console.log(this.$route.params.manga)
        this.getMangaInfo()
        this.getChapter()
    },
    methods: {
        async getMangaInfo() {
            await fetch('https://api.consumet.org/manga/mangasee123/info?id=' + this.$route.params.manga)
                .then(res => res.json())
                .then(data => {
                    // console.log("info", data)
                    this.manga = data
                    this.thisChapter = this.filterFilter(data.chapters, { id: this.$route.params.volume })
                    var getChapNum = this.thisChapter[0].title.split(" ")[1]
                    // console.log("getChapNum", getChapNum)
                    this.nextChapter = this.filterFilter(data.chapters, { title: "Chapter " + (parseInt(getChapNum) + 1) }).length > 0 ? this.filterFilter(data.chapters, { title: "Chapter " + (parseInt(getChapNum) + 1) }) : null
                    // console.log("next chapter", this.nextChapter)
                })
        },
        async getChapter() {
            await fetch('https://api.consumet.org/manga/mangasee123/read?chapterId=' + this.$route.params.volume)
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
    },
}
</script>

<style>

</style>