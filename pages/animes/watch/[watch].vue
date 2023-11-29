<template>
    <div class="min-h-screen container mx-auto pb-5">
        <!-- video player -->
        <div v-if="info" class="mx-auto mt-4">
            <!-- <VideoPlayer :videoDetails="video" :info="info" class=" lg:w-3/4 mx-auto mb-5"></VideoPlayer> -->
            <div id="setIframe" class="lg:w-3/4 mx-auto" v-show="disabled"></div>
            <select
                class="bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-800 border-none text-sm mx-auto flex justify-center my-10"
                v-if="otherServerLink.length > 0 && disabled" @change="selectOtherServerLink">
                <option value="" selected disabled>Select Server</option>
                <option :value="key" v-for="link, key in otherServerLink">
                    {{ link.name }}
                </option>
            </select>
            <!-- <VideoPlayer2 v-if="video && !disabled" :videoDetails="video" :info="info" class="lg:w-3/4 mx-auto"></VideoPlayer2> -->
            <div class="mx-5">
                <VidstackPlayer v-if="video && !disabled" :src="video[0].url" :poster="info.image" :title="info.title" />
                <div v-else class="lg:w-3/4 mx-auto flex justify-center items-center h-80" :class="{ 'hidden': disabled }">
                    <SpiningLoading></SpiningLoading>
                </div>
            </div>

            <div v-if="info" class="md:mb-4 text-white felx md:justify-center md:text-center py-4 px-5">
                <h1 class="text-xl font-black md:hidden mb-3">
                    <button @click="navTo('/animes/' + info.id)">{{ info.title }}</button>
                </h1>
                <h1 class=" text-zinc-300 inline-block text-sm md:text-base md:block md:text-white">
                    You are watching
                </h1>
                <span class="text-sm font-bold inline-block md:block ml-2 md:ml-0 text-purple-500">
                    Episode {{ thisEp.number }}
                </span>
            </div>

            <div class="md:w-3/4 w-11/12 mx-auto py-3 px-5 text-white bg-slate-800 rounded-xl">
                <div class="font-bold">Genres:</div>
                <div v-for="g in info.genres" :key="g" class="inline-block mr-2 text-sm" :id="g"
                    :style="'color:' + randomColor(g)">
                    {{ g }}
                </div>
            </div>

            <div v-if="info != null" class="mt-5 mx-auto w-full lg:w-3/4 container px-3 block md:flex gap-3">
                <div class="w-full md:w-1/5 mb-5">
                    <img :src="info.image" alt="" srcset="" class="w-full rounded-xl">
                </div>
                <div class="text-white w-full md:w-4/5">
                    <h1 class="mb-3 text-lg block lg:hidden lg:text-2xl">
                        {{ info.otherName }}
                    </h1>
                    <h1 class="mb-3 text-lg hidden lg:block lg:text-2xl">
                        <button @click="navTo('/animes/' + info.id)">{{ info.title }}</button>
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
                    <p class="mt-3 overflow-y-auto text-sm max-h-24 scrollbar-hide text-justify">{{ info.description }}</p>
                    <div class="mt-5 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" v-if="info != null">
                        <button v-for="e of info.episodes" :key="e" @click="changeEp(e.id, info.id)"
                            class="border-2 border-white py-2 rounded-lg text-white text-center my-2 relative block truncate animate-bg from-zinc-700 to-indigo-800 hover:border-none"
                            :class="thisEp.id == e.id ? 'bg-gradient-to-r' : 'hover:bg-gradient-to-r'">
                            <span class="w-3/4 mx-auto">EP{{ e.number }} {{ e.title ? ' - ' + e.title : '' }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="otherServerLink.length > 0" class="mt-5 mx-auto w-full lg:w-3/4 container px-3 text-white">
                <h1 class="font-bold mb-3 block">Watch on Other Server</h1>
                <div v-for="link in otherServerLink" :key="link"
                    class="inline-flex mr-3 mb-2 bg-zinc-600 py-2 px-4 rounded-lg">
                    <a :href="link.url" target="_blank" class="text-sm">{{ link.name }}</a>
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
            thisEp: null,
            otherServerLink: [],
            disabled: false
        }
    },
    async mounted() {
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

        await this.getOtherServerLink(config.apiUrl, epid)
        await this.getInfo(infoUrl, epid);
        await this.getEpisode(watchUrl, id);
    },
    methods: {
        async getInfo(api, id) {
            await fetch(api)
                .then(response => response.json())
                .then(data => {
                    // console.log('data:', data)

                    if (data.id == "gogoanimehd.io") {
                        data.id = data.url.split('/')[4]
                    }

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
                        // window.location.href = '/animes/' + id
                        throw Error('Provider is not responding. Switching to other server.')
                    }
                    return res.json()
                })
                .then(data => {
                    this.video = JSON.parse(JSON.stringify(data));
                    // console.log('video', this.video)
                    this.video = this.video.sources.filter((s) => s.quality == "default")
                }).catch(err => {
                    alert(err)
                    console.log(err)

                    console.clear()


                    this.disabled = true
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
        },
        async getOtherServerLink(url, id) {
            await fetch(url + "servers/" + id)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    this.otherServerLink = data
                }).catch(err => console.log(err))
        },
        selectOtherServerLink(id) {
            // console.log("id: ",id.target.value)
            if (id !== null) {
                let iframe = document.createElement('iframe')
                iframe.src = this.otherServerLink[id.target.value].url
                iframe.width = '100%'
                iframe.height = '100%'
                iframe.allowFullscreen = true
                // iframe.sandbox = 'allow-scripts allow-same-origin allow-presentation'
                iframe.style.aspectRatio = '16/9'
                iframe.style.overflowY = 'hidden'
                console.log(iframe)
                document.getElementById('setIframe').innerHTML = ''
                document.getElementById('setIframe').appendChild(iframe)
            }
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