<template>
    <div class="container p-4 mx-auto min-h-screen" v-if="watchList.length > 0">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your <br>
                <span class="text-purple-500 flex items-baseline gap-3">Favourite List
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" w-8 h-8 animate-bounce">
                        <path
                            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </span>
            </h1>
        </div>
        <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2"
            v-if="watchListResult.length > 0 && watchListResult[0] != ''">
            <div v-for="list in watchListResult" :key="list" class="">
                <div v-if="list == ''" class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800">
                </div>
                <a v-else :href="'/animes/' + list.id" class="relative">
                    <div class=" object-cover h-56 lg:h-96">
                        <img :src="list.image" alt="" class="rounded-xl object-cover w-full h-full">
                    </div>
                    <div class="relative flex justify-between items-center ">
                        <div
                            class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                        </div>
                        <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                            <h3 class="truncate text-xs lg:text-sm max-w-[8rem]">
                                {{ list.title }}
                            </h3>
                        </div>
                        <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-1"
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
            watchListResult: [],
        }
    },
    mounted() {
        useHead({
            title: 'Favourite List',
            meta: [
                {
                    name: 'description',
                    content: 'Favourite List'
                },
                {
                    name: 'keywords',
                    content: 'Favourite List'
                }
            ]
        })
        this.server = localStorage.getItem('server')
        if (sessionStorage.getItem('userId') != null && localStorage.getItem('server') != null) {
            this.getLikeList()
        }
        if (this.watchList.length > 0) {
        }
    },
    methods: {
        async getLikeList() {
            var counter = 0;
            const db = getFirestore();
            const userId = sessionStorage.getItem('userId')
            const q = query(collection(db, "watch-list"),
                where("userId", "==", userId),
                where("server", "==", this.server),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.watchList.push(doc.data())
                this.getAnimeInfo(doc.data().animeId, counter)
                counter++
            });
        },
        async getAnimeInfo(id, counter) {
            const config = useRuntimeConfig();
            this.watchListResult[counter] = '';
            const url = localStorage.getItem('server') == 'gogoanime' ? config.apiUrl + 'info/' + id : config.apiUrl2 + 'info?id=' + id
            await fetch(url).then(response => response.json()).then(data => {
                this.watchListResult[counter] = data
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>