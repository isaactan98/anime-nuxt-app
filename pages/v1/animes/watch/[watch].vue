<template>
    <div class="min-h-screen container mx-auto pb-5">
        <!-- video player -->
        <div v-if="info" class="mx-auto mt-4">
            <!-- <VideoPlayer :videoDetails="video" :info="info" class=" lg:w-3/4 mx-auto mb-5"></VideoPlayer> -->
            <V1VideoPlayer v-if="video" :videoDetails="video" :info="info" class="lg:w-3/4 mx-auto"></V1VideoPlayer>
            <div v-else class="lg:w-3/4 mx-auto flex justify-center items-center h-80">
                <SpiningLoading></SpiningLoading>
            </div>

            <div v-if="info" class="md:mb-4 text-white felx md:justify-center md:text-center py-4 px-5">
                <h1 class="text-xl font-black md:hidden mb-3">
                    <NuxtLink :to="'/animes/' + id">{{ info.animeTitle }}</NuxtLink>
                </h1>
                <h1 class=" text-zinc-300 inline-block text-sm md:text-base md:block md:text-white">
                    You are watching
                </h1>
                <span class="text-sm font-bold inline-block md:block ml-2 md:ml-0 text-purple-500">
                    Episode {{ thisEp.episodeNum }}
                </span>
            </div>

            <div class="w-11/12 mx-auto py-3 px-5 text-white bg-slate-800 rounded-xl md:hidden">
                <div class="font-bold">Genres:</div>
                <div v-for="g in info.genres" :key="g" class="inline-block mr-2 text-sm" :id="g"
                    :style="'color:' + randomColor(g)">
                    {{ g }}
                </div>
            </div>

            <div v-if="info != null" class="mt-5 mx-auto w-full lg:w-3/4 container px-3 block md:flex gap-3">
                <div class="w-full md:w-1/5 mb-5">
                    <img :src="info.animeImg" alt="" srcset="" class="w-full rounded-xl">
                </div>
                <div class="text-white w-full md:w-4/5">
                    <h1 class="mb-3 text-lg block lg:hidden lg:text-2xl">
                        {{ info.otherNames }}
                    </h1>
                    <h1 class="mb-3 text-lg hidden lg:block lg:text-2xl">
                        <NuxtLink :to="'/v1/animes/' + id">{{ info.animeTitle }}</NuxtLink>
                    </h1>
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
                    <p class="mt-3 overflow-y-auto text-sm max-h-24 scrollbar-hide">{{ info.synopsis }}</p>
                    <div class="mt-5 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" v-if="info != null">
                        <button v-for="e of info.episodes" :key="e" @click="changeEp(e.id, info.id)"
                            class="border-2 border-white py-2 rounded-lg text-white text-center my-2 relative block truncate animate-bg from-purple-700 to-indigo-800 hover:border-none"
                            :class="thisEp.id == e.id ? 'bg-gradient-to-r' : 'hover:bg-gradient-to-r'">
                            <span class="w-3/4 mx-auto">EP{{ e.number }} {{ e.title ? ' - ' + e.title : '' }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- <div class="p-4 mt-4 mx-auto md:w-3/4" v-if="info.genres">
                <h1 class="text-zinc-300 mb-5">Recommended for you</h1>
                <Recommend :genre="info.genres" :id="info.id"></Recommend>
            </div> -->

        </div>
        <div v-else class="grid place-content-center min-h-screen -mt-20">
            <h1 class="text-white font-extrabold">Loading...</h1>
        </div>
    </div>
</template>

<script>
import { getFirestore, query, where, getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

export default {
    data() {
        return {
            info: null,
            video: null,
            thisEp: null,
            id: null,
        }
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        this.id = route.query.id;
        var epid = route.params.watch;

        // console.log('id:', this.id)

        var watchUrl = config.apiUrlV1 + 'vidcdn/watch/' + epid;
        var infoUrl = config.apiUrlV1 + 'anime-details/' + this.id;

        this.getInfo(infoUrl, epid);
        this.getEpisode(watchUrl, this.id);

    },
    methods: {
        async getInfo(api, id) {
            await fetch(api)
                .then(response => response.json())
                .then(data => {
                    // console.log('data:', data)
                    this.sortEpisode(data.episodesList)
                    this.info = data;
                    this.shuffle(data.genres)
                    this.info.genres = data.genres
                    this.thisEp = data.episodesList.filter(e => e.episodeId == id)[0];

                    useHead({
                        title: data.animeTitle + ' - EP' + this.thisEp.episodeNum
                    })

                    if (sessionStorage.getItem('userId')) {
                        // this.setContinueWatching(data.id, this.thisEp.number);
                    }
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
                        window.location.href = '/v1/animes/' + id
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
        },
        sortEpisode(arr) {
            arr.sort((a, b) => {
                return b.number - a.number;
            });
        },
        changeEp(id, animeId) {
            window.location.href = '/animes/watch/' + id + '?id=' + animeId
        },
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        },
        filterFilter(arr, expression) {
            return arr.filter(function (item) {
                return item[Object.keys(expression)[0]] == Object.values(expression)[0];
            });
        },
        randomColor() {
            var letters = 'BCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
            // return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
    }
}
</script>

<style>
.vjs-poster {
    background-size: cover;
    background-position: center;
}
</style>