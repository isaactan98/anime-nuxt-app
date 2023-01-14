<template>
    <div class="min-h-screen container mx-auto pb-5">
        <!-- video player -->
        <div v-if="video" class="mx-auto">
            <VideoPlayer :videoDetails="video"></VideoPlayer>

            <div v-if="info" class="mb-4 text-white felx justify-center text-center py-4">
                <h1>You are watching</h1>
                <span class="text-sm font-bold text-purple-500">Episode {{ thisEp.number }}</span>
            </div>

            <div v-if="info != null" class="mt-5 mx-auto w-full lg:w-3/4 container px-3 flex gap-3">
                <div class="w-2/5">
                    <img :src="info.image" alt="" srcset="">
                </div>
                <div class="text-white w-3/5">
                    <h1 class="mb-3 text-lg lg:text-2xl">{{ info.title }}</h1>
                    <span class="text-xs mt-3">
                        <span v-if="info.subOrDub == 'both'">
                            <span class="px-1 bg-white text-zinc-600 rounded-md mr-2">SUB</span>
                            <span class="px-1 bg-white text-zinc-600 rounded-md mr-2">DUB</span>
                        </span>
                        <span v-else-if="info.subOrDub == 'sub'">
                            <span class="px-1 bg-white text-zinc-600 rounded-md mr-2">SUB</span>
                        </span>

                        <span>{{ info.type }}</span>
                    </span>
                    <p class="mt-3 overflow-y-auto text-sm max-h-24">{{ info.description }}</p>
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
            video: null,
            thisEp: null
        }
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        var id = route.query.id;
        var epid = route.params.watch;

        console.log('id:', id)

        var watchUrl = '';
        var infoUrl = ''

        if (localStorage.getItem('server') == 'gogoanime') {
            infoUrl = config.apiUrl + 'info/' + id
            watchUrl = config.apiUrl + 'watch/' + epid
        } else {
            infoUrl = config.apiUrl2 + 'info?id=' + id
            watchUrl = config.apiUrl2 + 'watch?episodeId=' + epid
        }

        this.getInfo(infoUrl, epid);
        this.getEpisode(watchUrl, id);

    },
    methods: {
        async getInfo(api, id) {
            await fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log('data:', data)
                    this.info = data;
                    this.thisEp = data.episodes.filter(e => e.id == id)[0];
                })
                .catch(err => console.log(err));
        },

        async getEpisode(api, id) {
            await fetch(api, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
                    'Origin': '*'
                }
            })
                .then(res => {
                    if (!res.ok) {
                        window.location.href = '/animes/' + id
                        throw Error('Server is not responding. Please try again later.')
                    }
                    return res.json()
                })
                .then(data => {
                    this.video = JSON.parse(JSON.stringify(data));
                    // console.log('video', this.video)
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