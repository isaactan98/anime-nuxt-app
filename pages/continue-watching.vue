<template>
    <div class="container p-4 mx-auto min-h-screen" v-if="watchList.length > 0">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Continue <br>
                <span class="text-purple-500 flex items-center gap-3">Watching
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                    </svg>
                </span>
            </h1>
        </div>
        <div class="my-5 grid grid-cols-2 md:grid-cols-4 gap-3"
            v-if="watchListResult.length > 0 && watchListResult[0] != ''">
            <div v-for="list in watchListResult" :key="list" class="">
                <a :href="'/animes/' + list.id" class="relative">
                    <div class=" object-cover h-56 lg:h-96">
                        <img :src="list.image" alt="" class="rounded-xl object-cover w-full h-full">
                    </div>
                    <div class="relative flex justify-between items-center ">
                        <div class="px-3 py-2 rounded-full bg-purple-500 text-white absolute left-1 bottom-1">
                            <h3 class="truncate text-xs lg:text-sm max-w-[8rem] lg:max-w-xs">
                                {{ list.title }}
                            </h3>
                        </div>
                        <span class="bg-white rounded-full text-sm px-2 absolute bottom-1 right-1">
                            EP {{ list.currentEpisode }}
                        </span>
                    </div>
                </a>
            </div>
        </div>

        <div class="my-5 mx-auto grid place-content-center" v-else>
            <SpiningLoading></SpiningLoading>
        </div>
    </div>
    <div v-else class="text-white container px-4 mx-auto min-h-screen grid place-content-center -mt-20">
        Loading...
    </div>
</template>

<script>
import { getFirestore, query, where, getDocs, collection, orderBy } from "firebase/firestore";
export default {
    data() {
        return {
            watchList: [],
            server: "",
            watchListResult: []
        }
    },
    mounted() {
        useHead({
            title: 'Continue Watching',
            meta: [
                {
                    name: 'description',
                    content: 'Continue Watching'
                },
                {
                    name: 'keywords',
                    content: 'Continue Watching'
                }
            ]
        })
        this.server = localStorage.getItem('server')
        if (sessionStorage.getItem('userId') != null && localStorage.getItem('server') != null) {
            this.getContinueWatching()
        }
    },
    methods: {
        async getContinueWatching() {
            var counter = 0;
            const db = getFirestore();
            const userId = sessionStorage.getItem('userId')
            const q = query(collection(db, "continue-watching"),
                where("userId", "==", userId),
                where("server", "==", this.server),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.watchList.push(doc.data())
                // console.log(doc.data())
                this.getAnimeInfo(doc.data().animeId, counter, doc.data().episode)
                counter++
            });
        },
        getAnimeInfo(id, counter, episode) {
            const config = useRuntimeConfig();
            const url = localStorage.getItem('server') == 'gogoanime' ? config.apiUrl + 'info/' + id : config.apiUrl2 + 'info?id=' + id
            this.watchListResult[counter] = ''
            fetch(url).then(response => response.json()).then(data => {
                this.watchListResult[counter] = data
                this.watchListResult[counter].currentEpisode = episode
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>