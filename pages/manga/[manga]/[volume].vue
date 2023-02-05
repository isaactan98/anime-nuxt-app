<template>
    <div v-if="chapter">
        <img v-for="c in chapter" :key="c" :src="c.img" alt="">
    </div>
    <div v-else>
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
            await fetch('https://api.consumet.org/manga/mangadex/read/' + this.$route.params.volume)
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