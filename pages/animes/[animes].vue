<template>
    <div>
        <div v-if="anime.title != null">
            <div>
                <img :src="anime.img" alt="">
            </div>
            <div>
                <h1>{{ anime.title }}</h1>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            anime: {
                title: '',
                description: '',
                url: '',
                img: '',
                episode: ''
            }
        }
    },
    mounted() {
        const route = useRoute();
        console.log(route)
        const config = useRuntimeConfig();
        fetch(config.apiUrl2 + 'info?id=the-eminence-in-shadow-17473')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.anime.title = data.title;
                this.anime.description = data.description;
                this.anime.url = data.url;
                this.anime.img = data.image;
                this.anime.episode = data.episode;

                useHead({
                    title: this.anime.title ?? 'Anime'
                })
            })
            .catch(err => console.log(err));
    }
}
</script>

<style>

</style>