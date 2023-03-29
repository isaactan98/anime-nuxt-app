<template>
    <div class="container p-4 mx-auto min-h-screen" v-if="watchList.length > 0">
        <div class="text-white my-4 min-h-[20vh] flex items-center" id="header">
            <h1 class="text-4xl font-extrabold">
                Continue <br>
                <span class="text-purple-500 flex items-center gap-3">Watching
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class=" w-8 h-8 animate-bounce-lr">
                        <path
                            d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                    </svg>
                </span>
            </h1>
        </div>
        <!-- <div v-if="releaseYear.length > 0">
            <div v-for="year in releaseYear" :key="year">
                <h5 class="text-white font-bold my-5">{{ year }}</h5>
                <div v-if="sortByReleaseYear[year].length > 0"
                    class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    <div v-for="anime in sortByReleaseYear[year]" :key="anime" class="mb-3 relative">
                        <div v-if="anime == ''"
                            class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                        </div>
                        <a v-else :href="'/animes/watch/' + anime.episodeId + '?id=' + anime.id" class="relative">
                            <div class=" object-cover h-56 lg:h-96">
                                <img :src="anime.image" loading="lazy" alt="" class="rounded-xl object-cover w-full h-full">
                            </div>
                            <div class="relative flex justify-between items-center ">
                                <div
                                    class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                                </div>
                                <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                                    <h3 class="truncate text-xs lg:text-sm max-w-[8rem]">
                                        {{ anime.title }}
                                    </h3>
                                </div>
                                <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-1">
                                    EP {{ anime.currentEpisode }}
                                </span>
                            </div>
                        </a>
                        <button
                            class="absolute top-1 right-1 p-3 rounded-full text-black bg-white shadow-md hover:bg-gray-200"
                            @click="deleteContinueWatching(anime.docId, anime.title)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2"
            v-if="watchListResult.length > 0 && watchListResult[0] != ''">
            <div v-for="list in watchListResult" :key="list" class="mb-3 relative">
                <div v-if="list == ''"
                    class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                </div>
                <a v-else :href="'/animes/watch/' + list.episodeId + '?id=' + list.id" class="relative">
                    <div class=" object-cover h-56 lg:h-96">
                        <img :src="list.image" loading="lazy" alt="" class="rounded-xl object-cover w-full h-full">
                    </div>
                    <div class="relative flex justify-between items-center ">
                        <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                        </div>
                        <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                            <h3 class="truncate text-xs lg:text-sm max-w-[8rem]">
                                {{ list.title }}
                            </h3>
                        </div>
                        <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-1">
                            EP {{ list.currentEpisode }}
                        </span>
                    </div>
                </a>
                <button class="absolute top-1 right-1 p-3 rounded-full text-black bg-white shadow-md hover:bg-gray-200"
                    @click="deleteContinueWatching(list.docId, list.title)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="my-5 mx-auto grid place-content-center" v-else>
            <SpiningLoading></SpiningLoading>
        </div>

    </div>
    <div v-else class="text-white container px-4 mx-auto min-h-screen grid place-content-center -mt-20">
        Loading...
    </div>

    <ConfirmModel :showModal="showModal" @confirmed="confirmation">
        <template v-slot:modal-content>
            Are you sure you want to delete this item? <br>
            <span class="text-sm text-gray-400">{{ deleteTitle }}</span>
        </template>
    </ConfirmModel>
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <ErrorToast v-if="success" :type="'success'" :message="'Successfully delete anime.'" />
    </transition>
</template>

<script>
import { getFirestore, query, where, getDocs, collection, orderBy, deleteDoc, doc } from "firebase/firestore";
export default {
    data() {
        return {
            watchList: [],
            server: "",
            watchListResult: [],
            sortByReleaseYear: [],
            releaseYear: [],
            showModal: false,
            deleteId: "",
            deleteTitle: "",
            success: false,
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
                this.getAnimeInfo(doc.data().animeId, counter, doc.data().episode, doc.id)
                counter++
            });
        },
        getAnimeInfo(id, counter, episode, docId) {
            const config = useRuntimeConfig();
            const url = localStorage.getItem('server') == 'gogoanime' ? config.apiUrl + 'info/' + id : config.apiUrl2 + 'info?id=' + id
            this.watchListResult[counter] = ''
            fetch(url).then(response => response.json()).then(data => {
                this.watchListResult[counter] = data
                this.watchListResult[counter].currentEpisode = episode
                this.watchListResult[counter].episodeId = this.filterFilter(data.episodes, { number: episode })[0].id
                this.watchListResult[counter].counter = counter
                this.watchListResult[counter].docId = docId
                // this.sortByReleaseYearFunction()
            }).catch(err => {
                console.log(err)
            })
        },
        filterFilter(arr, expression) {
            return arr.filter(function (item) {
                return item[Object.keys(expression)[0]] == Object.values(expression)[0];
            });
        },
        sortByReleaseYearFunction() {
            this.watchListResult.forEach((item) => {
                if (item.releaseDate !== undefined) {
                    if (!this.sortByReleaseYear.hasOwnProperty(item.releaseDate.toString())) {
                        this.sortByReleaseYear[item.releaseDate.toString()] = []
                        this.sortByReleaseYear[item.releaseDate.toString()].push(item)
                    } else {
                        // console.log("push")
                        if (this.sortByReleaseYear[item.releaseDate.toString()].includes(item) == false) {
                            // console.log(this.sortByReleaseYear[item.releaseDate.toString()])
                            this.sortByReleaseYear[item.releaseDate.toString()].push(item)
                        }
                    }
                    if (this.releaseYear.includes(item.releaseDate.toString()) == false) {
                        this.releaseYear.push(item.releaseDate.toString())
                    }
                }
            })
            this.releaseYear.sort((a, b) => { return b - a })
            // console.log("release year: ", this.releaseYear)
            // console.log("release year list: ", this.sortByReleaseYear)
            this.releaseYear.forEach((year) => {
                this.sortByCounter(year)
            })
            document.getElementById('header').scrollIntoView()
        },
        sortByCounter(year) {
            this.sortByReleaseYear[year].sort((a, b) => { return a.counter - b.counter })
        },
        deleteContinueWatching(id, title) {
            this.deleteId = this.deleteId == id ? '' : id
            this.deleteTitle = this.deleteTitle == title ? '' : title
            this.showModal = true
        },
        confirmation(c) {
            if (c === "yes") {
                const db = getFirestore();
                deleteDoc(doc(db, "continue-watching", this.deleteId)).then(() => {
                    // console.log("deleted", m)
                    this.watchListResult = []
                    this.watchList = []
                    this.sortByReleaseYear = []
                    this.releaseYear = []
                    this.getContinueWatching()
                    this.success = true
                    setTimeout(() => {
                        this.success = false
                    }, 3000);
                }).catch(err => {
                    console.log(err)
                })
            }
            this.deleteId = ''
            this.deleteTitle = ''
            this.showModal = false
        }
    }
}
</script>

<style>
.animate-bounce-lr {
    animation: bounce-lr 1s infinite;
}

@keyframes bounce-lr {

    0%,
    100% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(0);
    }
}
</style>