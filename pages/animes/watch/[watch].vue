<template>
    <div class="min-h-screen container mx-auto pb-5">
        <!-- video player -->
        <div v-if="video" class="mx-auto">
            <VideoPlayer :videoDetails="video"></VideoPlayer>

            <div v-if="info != null" class="mt-5 mx-auto container px-3 flex gap-3">
                <div class="w-1/4">
                    <img :src="info.image" alt="" srcset="">
                </div>
                <div class="text-white w-3/4">
                    <h1 class="mb-3 lg:text-2xl">{{ info.title }}</h1>
                    <span class="text-sm mt-3">{{ info.type }}</span>
                    <p class="mt-3 overflow-y-auto text-sm">{{ info.description }}</p>
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
            info: null,
            video: null
        }
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        var id = route.params.watch;

        this.getInfo(config.apiUrl2, id);
        this.getEpisode(config.apiUrl2, id);

    },
    methods: {
        async getInfo(api, id) {
            var newId = id.slice(0, -1).split('$')[0];
            // console.log(newId)
            await fetch(api + 'info?id=' + newId)
                .then(response => response.json())
                .then(data => {
                    // console.log('data:', data)
                    this.info = data;
                })
                .catch(err => console.log(err));
        },

        async getEpisode(api, id) {
            await fetch(api + 'watch?episodeId=' + id, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
                    'Origin': 'localhost:3000'
                }
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    this.video = JSON.parse(JSON.stringify(data));
                    console.log('video', this.video)
                }).catch(err => {
                    alert(err)
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>