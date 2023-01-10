<template>
    <div class=" container mx-auto">
        <div v-if="anime.title != ''">
            <div class="w-full">
                <img :src="anime.img" alt="" class="object-cover w-full h-60 lg:h-[36rem]">
            </div>
            <div class="p-4 mt-4 mx-auto">
                <h1 class="text-lg lg:text-2xl dark:text-white mb-4">{{ anime.title }} - EP: {{ anime.episode }}</h1>
                <span class="dark:text-zinc-400 text-sm">Type:
                    <span class=" rounded-full bg-white px-3 font-bold">{{ anime.type }}</span>
                </span>
            </div>
            <div class="p-4 overflow-y-auto max-h-28">
                <span class=" text-sm dark:text-zinc-400">{{ anime.description }}</span>
            </div>

            <div class="p-4 flex justify-center w-full mt-4">
                <a :href="anime.url" target="_blank" class=" bg-green-400 w-full px-5 py-3 rounded-lg text-center">
                    View on Zoro.to
                </a>
            </div>
        </div>
        <div v-else class="grid place-content-center min-h-screen -mt-20">
            <h1 class="dark:text-white font-extrabold">Loading...</h1>
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
                episode: '',
                type: ''
            }
        }
    },
    mounted() {
        this.setTitle();

        const route = useRoute();
        var id = route.params.animes;
        const config = useRuntimeConfig();
        fetch(config.apiUrl2 + 'info?id=' + id)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.anime.title = data.title;
                this.anime.description = data.description;
                this.anime.url = data.url;
                this.anime.img = data.image;
                this.anime.episode = data.totalEpisodes;
                this.anime.type = data.type;

                this.setTitle();

            })
            .catch(err => console.log(err));

    },
    methods: {
        setTitle() {
            useHead({
                title: this.anime.title != '' ? this.anime.title : 'Loading...',
            })
        }
    }
}
</script>

<style>

</style>