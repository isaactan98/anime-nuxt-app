<template>
    <div class="min-h-screen container mx-auto pb-5">
        <!-- video player -->
        <div v-if="info" class="mx-auto mt-4">
            <!-- <VideoPlayer :videoDetails="video" :info="info" class=" lg:w-3/4 mx-auto mb-5"></VideoPlayer> -->
            <VideoPlayer2 v-if="video" :videoDetails="video" :info="info" class="lg:w-3/4 mx-auto"></VideoPlayer2>
            <div v-else class="lg:w-3/4 mx-auto flex justify-center items-center h-80">
                <SpiningLoading></SpiningLoading>
            </div>

            <div v-if="info" class="mb-4 text-white felx justify-center text-center py-4">
                <h1>You are watching</h1>
                <span class="text-sm font-bold text-purple-500">Episode {{ thisEp.number }}</span>
            </div>

            <div v-if="info != null" class="mt-5 mx-auto w-full lg:w-3/4 container px-3 flex gap-3">
                <div class="w-1/5">
                    <img :src="info.image" alt="" srcset="" class="w-full">
                </div>
                <div class="text-white w-4/5">
                    <h1 class="mb-3 text-lg lg:text-2xl">
                        <NuxtLink :to="'/animes/' + info.id">{{ info.title }}</NuxtLink>
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
                    <p class="mt-3 overflow-y-auto text-sm max-h-24 scrollbar-hide">{{ info.description }}</p>
                    <div class="mt-5 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" v-if="info != null">
                        <button v-for="e of info.episodes" :key="e" @click="changeEp(e.id, info.id)"
                            class="border-2 border-white py-2 rounded-lg text-white text-center my-2 relative block truncate animate-bg from-purple-700 to-indigo-800 hover:border-none"
                            :class="thisEp.id == e.id ? 'bg-gradient-to-r' : 'hover:bg-gradient-to-r'">
                            <span class="w-3/4 mx-auto">(E{{ e.number }}) {{ e.title ? ' - ' + e.title : '' }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="p-4 mt-4 mx-auto md:w-3/4" v-if="info.genres">
                <h1 class="text-zinc-300 mb-5">Recommended for you</h1>
                <Recommend :genre="info.genres" :id="info.id"></Recommend>
            </div>

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
            thisEp: null
        }
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        var id = route.query.id;
        var epid = route.params.watch;

        // console.log('id:', id)

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
                    // console.log('data:', data)
                    this.sortEpisode(data.episodes)
                    this.info = data;
                    this.shuffle(data.genres)
                    this.info.genres = data.genres
                    this.thisEp = data.episodes.filter(e => e.id == id)[0];

                    useHead({
                        title: data.title + ' - EP' + this.thisEp.number
                    })

                    if (sessionStorage.getItem('userId')) {
                        this.setContinueWatching(data.id, this.thisEp.number);
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
        },
        setContinueWatching(id, episode) {
            var getEpisode = null

            const db = getFirestore();

            const q = query(collection(db, "continue-watching"),
                where("animeId", "==", id),
                where("userId", "==", sessionStorage.getItem('userId')),
                // where("episode", "==", episode),
                where("server", "==", localStorage.getItem('server'))
            );
            const querySnapshot = getDocs(q);

            querySnapshot.then((query) => {
                query.forEach((doc) => {
                    if (doc.data().animeId == id) {
                        getEpisode = doc;
                    }
                });
            }).then(() => {
                if (getEpisode == null) {
                    try {
                        addDoc(collection(db, "continue-watching"), {
                            animeId: id,
                            userId: sessionStorage.getItem('userId'),
                            server: localStorage.getItem('server'),
                            episode: episode,
                            createdAt: new Date()
                        }).catch(err => {
                            console.log(err)
                        })
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    try {
                        deleteDoc(doc(db, "continue-watching", getEpisode.id)).catch(err => {
                            console.log(err)
                        })
                        addDoc(collection(db, "continue-watching"), {
                            animeId: id,
                            userId: sessionStorage.getItem('userId'),
                            server: localStorage.getItem('server'),
                            episode: episode,
                            createdAt: new Date()
                        }).catch(err => {
                            console.log(err)
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            })

            // querySnapshot.then((query) => {
            //     query.forEach((doc) => {
            //         if (doc.data().animeId == id) {
            //             getEpisode = doc.data();
            //         }
            //     });
            // }).then(() => {
            //     if (getEpisode == null) {
            //         try {
            //             addDoc(collection(db, "continue-watching"), {
            //                 animeId: id,
            //                 userId: sessionStorage.getItem('userId'),
            //                 server: localStorage.getItem('server'),
            //                 episode: episode,
            //                 createdAt: new Date()
            //             }).catch(err => {
            //                 console.log(err)
            //             })
            //         } catch (error) {
            //             console.log(error)
            //         }
            //     }
            // })
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
    }
}
</script>

<style>
.vjs-poster {
    background-size: cover;
    background-position: center;
}
</style>