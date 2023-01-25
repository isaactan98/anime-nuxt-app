<template>
    <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth" v-if="genreDetail">
        <div v-for="g in genreDetail" :key="g">
            <RecentReleaseComponent :release="g"></RecentReleaseComponent>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            genreDetail: null,
        }
    },
    props: ['genre', 'id'],
    mounted() {
        this.getGenreDetail();
    },
    methods: {
        async getGenreDetail() {
            const config = useRuntimeConfig();
            var genre = this.genre[0].replace(/\s/g, '-').toLowerCase();
            // console.log(genre);
            await fetch(config.apiUrl + 'genre/' + genre)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    this.genreDetail = data.results.filter(g => g.id != this.id);
                })
                .catch(err => console.log(err));
        },
    },
}
</script>

<style>

</style>