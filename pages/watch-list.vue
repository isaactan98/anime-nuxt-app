<template>
    <div class="container relative px-4 mx-auto min-h-screen" id="screenHeader">
        <div class="text-white my-4 min-h-[10vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your <br>
                <span class="text-purple-500 flex items-baseline gap-3">Favourite List
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class=" w-8 h-8 animate-bounce">
                        <path
                            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </span>
            </h1>
        </div>
        <!-- div change status -->
        <div class=" w-full flex justify-between">
            <div>
                <button @click="groupByYear()" class="text-white bg-purple-600 rounded-lg py-1 px-3 text-sm">
                    Group By Year
                </button>
            </div>
            <div class="bg-purple-600 text-white px-3 py-1 rounded-lg flex items-center">
                <input type="checkbox" name="" id="showCompleted" @click="showCompletedList()" v-model="checkShowCompleted"
                    v-if="checkShowCompleted != 'loading'"
                    class="text-green-500 bg-green-100 border-none focus:ring-0 rounded outline-none w-3 h-3">
                <SpiningLoading v-else class="w-3 h-3"></SpiningLoading>
                <label for="showCompleted" class="ml-2 text-sm cursor-pointer">Show Completed</label>
            </div>
        </div>
        <div v-if="!isGroupBy">
            <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5"
                v-if="releasedList.length > 0 && releasedList[0] != ''">
                <div v-for="list in releasedList" :key="list" class="mb-3 transition-all ease-in-out delay-150">
                    <div v-if="list == ''"
                        class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                    </div>
                    <button v-else @click="navTo('/animes/' + list.id)" class="relative w-full">
                        <div v-if="list.status == 'Completed'"
                            class="absolute top-2 bg-green-600 rounded-lg py-1 px-2 left-2 text-xs text-white z-[49]">
                            Completed
                        </div>
                        <div class=" object-cover h-56 lg:h-96">
                            <img :src="list.image" loading="lazy" alt=""
                                class="rounded-xl object-cover max-w-full w-full h-full">
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
                    </button>
                </div>
            </div>
            <div v-else class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                <!-- <SpiningLoading></SpiningLoading> -->
                <LoadingAnimeCard v-for="i in 10" :key="i" class="!w-full !min-w-full" :height="'h-56 lg:h-96'" />
            </div>
        </div>
        <!-- collapse div -->
        <div v-if="!isGroupBy && unreleaseList.length > 0 && unreleaseList[0] != ''"
            :class="unreleaseList.length > 0 ? '' : 'hidden'">
            <div @click="toggleCollapse()" class="w-full flex justify-between cursor-pointer">
                <h5 class="text-white font-bold">Un-Release Anime</h5>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="w-6 h-6 text-white transition-all duration-500" :class="collapse ? 'rotate-180' : ''">
                    <path fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div id="collapseItem"
                class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 transition-all duration-500 h-0">
                <div v-for="list in unreleaseList" :key="list" class="mb-3"
                    :class="collapse ? 'animate__fadeOut' : 'animate__animated'">
                    <div v-if="list == ''"
                        class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                    </div>
                    <button v-else @click="navTo('/animes/' + list.id)" class="relative w-full">
                        <div class=" object-cover h-56 lg:h-96">
                            <img :src="list.image" loading="lazy" alt=""
                                class="rounded-xl object-cover max-w-full w-full h-full">
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
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isGroupBy">
            <div v-for="y in years" :key="y">
                <div v-if="releasedList[y] && releasedList[y].length > 0" class="mt-5">
                    <h1 class="text-white font-bold text-2xl">Release Year {{ y }}</h1>
                </div>
                <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    <div v-for="list in releasedList[y]" :key="list" class="mb-3 transition-all">
                        <div v-if="list == ''"
                            class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                        </div>
                        <button v-else @click="navTo('/animes/' + list.id)" class=" relative w-full">
                            <div v-if="list.status == 'Completed'"
                                class="absolute top-2 bg-green-600 rounded-lg py-1 px-2 left-2 text-xs text-white z-[49]">
                                Completed
                            </div>
                            <div class=" object-cover h-56 lg:h-96">
                                <img :src="list.image" loading="lazy" alt=""
                                    class="rounded-xl object-cover max-w-full w-full h-full">
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
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <ErrorToast v-if="error" :type="'warning'" :message="errorMessages" />
        </transition>
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
            checkShowCompleted: false,
            releasedList: [],
            unreleaseList: [],
            collapse: true,
            isGroupBy: false,
            years: [],
            deleteListId: [],
            error: false,
            errorMessages: ''
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
        } else {
            alert('Please login first')
            window.location.href = "/"
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
                where("status", "in", ["no_status", "watching"]),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                this.watchList.push(doc.data())
                // console.log("doc.data() ", doc.id, doc.data())
                this.getAnimeInfo(doc.data().animeId, counter, doc.id)
                counter++
            });
            if (this.checkShowCompleted == 'loading') {
                setTimeout(() => {
                    this.checkShowCompleted = false
                }, 2000);
            }
        },
        showCompletedList() {
            this.isGroupBy = false
            this.watchListResult = []
            this.watchList = []
            this.releasedList = []
            this.unreleaseList = []
            if (this.checkShowCompleted == false) {
                this.checkShowCompleted = "loading"
                var counter = 0;
                const db = getFirestore();
                const userId = sessionStorage.getItem('userId')
                const q = query(collection(db, "watch-list"),
                    where("userId", "==", userId),
                    where("server", "==", this.server),
                    where("status", "==", "completed"),
                    orderBy("createdAt", "desc")
                );
                const querySnapshot = getDocs(q);
                querySnapshot.then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.watchList.push(doc.data())
                        this.getAnimeInfo(doc.data().animeId, counter, doc.id)
                        counter++
                    });
                }).finally(() => {
                    setTimeout(() => {
                        this.checkShowCompleted = true
                    }, 2000);
                });
            } else {
                this.checkShowCompleted = "loading"
                this.getLikeList()
            }
        },
        async getAnimeInfo(id, counter, docId) {
            // console.clear()
            // console.log("id ", id, counter, docId)
            const config = useRuntimeConfig();
            if (this.watchListResult[counter] == undefined || this.watchListResult[counter] == null) {
                this.watchListResult[counter] = {}
                this.watchListResult[counter]['retry'] = 1
            }
            let retry = []
            retry[counter] = this.watchListResult[counter]['retry']
            const url = localStorage.getItem('server') == 'gogoanime' ? config.apiUrl + 'info/' + id : config.apiUrl2 + 'info?id=' + id
            return await fetch(url).then(response => response.json()).then(data => {
                // console.log("data::", data)
                if (data.id == "gogoanimehd.io") {
                    // console.log("data::", data.url.split('/')[4])
                    data.id = data.url.split('/')[4]
                }
                // console.warn("data::", data)
                this.watchListResult[counter] = data
                this.watchListResult[counter].counter = counter
                this.checkReleaseAnime(counter)
            }).catch(err => {
                this.error = true
                this.errorMessages = "Fetching anime info failed! Retrying..."
                // console.log("this.watchListResult[counter].retry ", this.watchListResult[counter].retry)
                if (this.watchListResult[counter].retry == undefined || this.watchListResult[counter].retry == null || this.watchListResult[counter].retry == 0) {
                    // console.log("undefined ", id, counter, this.watchListResult[counter])
                    this.watchListResult[counter].retry = retry[counter]
                }
                // console.warn(id, this.watchListResult[counter]['retry'])
                if (this.watchListResult[counter]['retry'] <= 3) {
                    return new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
                        this.watchListResult[counter]['retry'] += 1
                        this.getAnimeInfo(id, counter, docId)
                        // console.warn("retry in : ", id, counter, this.watchListResult[counter]['retry'])
                    })
                } else {
                    this.deleteListId.push({ id: docId, title: id })
                    // console.log("deleteId ", this.deleteListId)
                }
            }).finally(() => {
                // console.log("finally this.watchListResult[counter] ", this.watchListResult[counter])
                if (this.deleteListId.length > 0) {
                    console.log("this.deleteListId.length ", (this.watchListResult.length), this.watchList.length)
                    if ((this.watchListResult.length) == this.watchList.length) {
                        this.error = true
                        this.errorMessages = "Fetching anime info failed! Please check your list again"
                    }

                    setTimeout(() => {
                        this.error = false
                        this.errorMessages = ''
                    }, 5000);
                }
            })
        },
        checkReleaseAnime(counter) {
            // console.log("RESULT: ", { ...this.watchListResult[counter] })
            if (this.watchListResult[counter].episodes !== null && this.watchListResult[counter].episodes.length > 0) {
                // var releaseCounter = 0;
                this.releasedList.push(this.watchListResult[counter])
            } else {
                this.unreleaseList.push(this.watchListResult[counter])
            }
            this.sortList()
            document.getElementById('screenHeader').scrollIntoView({ behavior: 'smooth' })
        },
        sortList() {
            this.releasedList.sort((a, b) => {
                return a.counter - b.counter
            })
            this.unreleaseList.sort((a, b) => {
                return a.counter - b.counter
            })
        },
        toggleCollapse() {
            this.collapse = !this.collapse
            if (this.collapse) {
                setTimeout(() => {
                    document.getElementById('collapseItem').classList.add('h-0')
                }, 400);
            } else {
                document.getElementById('collapseItem').classList.remove('h-0')
            }
        },
        groupByYear() {
            if (!this.isGroupBy) {
                this.isGroupBy = true
                var groupByYear = this.releasedList.reduce((r, a) => {
                    r[a.releaseDate] = [...r[a.releaseDate] || [], a];
                    if (!this.years.includes(a.releaseDate)) {
                        this.years.push(a.releaseDate)
                    }
                    return r;
                }, {});
                this.releasedList = groupByYear
                this.years.sort((a, b) => {
                    return b - a
                })
            } else {
                this.isGroupBy = false
                this.years = []
                this.releasedList = []
                this.unreleaseList = []
                this.getLikeList()
            }
            // console.log(this.releasedList)
        }
    }
}
</script>

<style>
.animate__animated {
    animation: setHeight100 0.5s ease-in-out forwards;
    overflow: hidden;
}

.animate__fadeOut {
    animation: setHeight0 0.3s ease-in-out forwards;
    overflow: hidden;
}

.animate_delay_height0 {
    animation-delay: setHeight0 0.3s;
}

@keyframes setHeight100 {
    0% {
        height: 0;
    }

    100% {
        height: 100%;
    }
}

@keyframes setHeight0 {
    0% {
        height: 100%;
    }

    100% {
        height: 0;
    }
}
</style>