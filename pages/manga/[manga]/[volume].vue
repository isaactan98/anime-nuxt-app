<template>
    <div v-if="chapter">
        <img v-for="c in chapter" loading="lazy" :key="c" :src="c.img" alt="" class="w-full">
    </div>
    <div v-else class="w-full min-h-screen flex justify-center mt-5">
        <SpiningLoading></SpiningLoading>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chapter: null,
            loading: true,
        }
    },
    mounted() {
        this.getChapter()
    },
    methods: {
        async getChapter() {
            await fetch('https://api.consumet.org/manga/mangasee123/read?chapterId=' + this.$route.params.volume)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.chapter = data
                    this.loading = false
                })
        },
    },
}
</script>

<style>

</style>