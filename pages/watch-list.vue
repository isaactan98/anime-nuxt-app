<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your <br>
                <span class="text-purple-500">Favourite List</span>
            </h1>
        </div>
        <div class="my-5 grid grid-cols-2 md:grid-cols-4 gap-3" v-if="watchList.length > 0">
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
                        <span class="bg-white rounded-full text-sm px-2 absolute bottom-1 right-1"
                            v-if="list.episode || list.totalEpisodes">
                            EP {{ list.episode ?? list.totalEpisodes }}
                        </span>
                    </div>
                </a>
            </div>
        </div>

        <div class="my-5 mx-auto grid place-content-center" v-else>
            <SpiningLoading></SpiningLoading>
        </div>
    </div>
</template>

<script>
import { getFirestore, query, where, getDocs, collection } from "firebase/firestore";

export default {
    data() {
        return {
            watchList: [],
            server: "",
            watchListResult: []
        }
    },
    mounted() {
        this.server = localStorage.getItem('server')
        if (sessionStorage.getItem('userId') != null && localStorage.getItem('server') != null) {
            this.getLikeList()
        }
        if (this.watchList.length > 0) {
        }
    },
    methods: {
        async getLikeList() {
            const db = getFirestore();
            const userId = sessionStorage.getItem('userId')
            const q = query(collection(db, "watch-list"),
                where("userId", "==", userId),
                where("server", "==", this.server)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.watchList.push(doc.data())
                this.getAnimeInfo(doc.data().animeId)
            });
        },
        getAnimeInfo(id) {
            const config = useRuntimeConfig();
            const url = localStorage.getItem('server') == 'gogoanime' ? config.apiUrl + 'info/' + id : config.apiUrl2 + 'info?id=' + id

            fetch(url).then(response => response.json()).then(data => {
                console.log(data)
                this.watchListResult.push(data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>