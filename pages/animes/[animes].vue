<template>
    <div class="container mx-auto min-h-screen">
        <div v-if="anime.title != ''">
            <div class="w-full object-cover">
                <div class="w-full py-5">
                    <img :src="anime.img" alt="" class="w-52 m-auto rounded-xl z-10 relative">
                </div>
                <div class="w-full">
                    <img :src="anime.img" alt=""
                        class="w-full lg:w-10/12 mx-auto absolute top-0 blur-lg h-96 object-cover object-center left-0 right-0">
                </div>
            </div>
            <div class="z-10">
                <div class="p-4 mt-4 mx-auto">
                    <h1 class="text-lg lg:text-2xl text-white mb-4">{{ anime.title }} - EP: {{ anime.totalEpisodes }}
                    </h1>
                    <span class="text-zinc-400 text-sm">Type:
                        <span class=" rounded-full bg-white px-2 text-sm ml-2 font-bold">{{ anime.type }}</span>
                    </span>
                </div>
                <div class="p-4 overflow-y-auto max-h-28">
                    <span class=" text-sm text-zinc-400">{{ anime.description }}</span>
                </div>

                <div class="p-4 flex justify-center w-full mt-4">
                    <a :href="anime.url" target="_blank" class=" bg-purple-500 w-full px-5 py-3 rounded-lg text-center">
                        View on Zoro.to
                    </a>
                </div>

                <div class="p-4 lg:grid grid-cols-5 gap-4">
                    <NuxtLink v-for="e of anime.episode" :key="e" :to="'/animes/watch/' + e.id"
                        class="border border-white py-2 rounded text-white text-center my-2 relative block truncate">
                        <span class="w-3/4 mx-auto">(E{{ e.number }}) - {{ e.title }}</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div v-else class="grid place-content-center min-h-screen -mt-20">
            <h1 class="text-white font-extrabold">Loading...</h1>
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
                totalEpisodes: '',
                type: '',
                episode: []
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
                console.log(data)
                this.anime.title = data.title;
                this.anime.description = data.description;
                this.anime.url = data.url;
                this.anime.img = data.image;
                this.anime.totalEpisodes = data.totalEpisodes;
                this.anime.type = data.type;
                this.sortEpisode(data.episodes);
                this.anime.episode = data.episodes;
                // console.log(data.episodes)
                this.setTitle();

            })
            .catch(err => console.log(err));

    },
    methods: {
        setTitle() {
            useHead({
                title: this.anime.title != '' ? this.anime.title : 'Loading...',
            })
        },
        // sort by number 
        sortEpisode(arr) {
            arr.sort((a, b) => {
                return b.number - a.number;
            });
        }
    }
}
</script>

<style>

</style>