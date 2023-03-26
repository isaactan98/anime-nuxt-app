<template>
    <div class="container p-4 mx-auto min-h-screen" id="screenHeader">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
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
            <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2"
                v-if="releasedList.length > 0 && releasedList[0] != ''">
                <div v-for="list in releasedList" :key="list" class="mb-3 transition-all ease-in-out delay-150">
                    <div v-if="list == ''"
                        class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                    </div>
                    <a v-else :href="'/animes/' + list.id" class="relative">
                        <div class=" object-cover h-56 lg:h-96">
                            <img :src="list.image" loading="lazy" alt="" class="rounded-xl object-cover w-full h-full">
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
            <div class="my-10 mx-auto grid place-content-center" v-else>
                <SpiningLoading></SpiningLoading>
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
                class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 transition-all duration-500 h-0">
                <div v-for="list in unreleaseList" :key="list" class="mb-3"
                    :class="collapse ? 'animate__fadeOut' : 'animate__animated'">
                    <div v-if="list == ''"
                        class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                    </div>
                    <a v-else :href="'/animes/' + list.id" class="relative">
                        <div class=" object-cover h-56 lg:h-96">
                            <img :src="list.image" loading="lazy" alt="" class="rounded-xl object-cover w-full h-full">
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
        </div>

        <div v-if="isGroupBy">
            <div v-for="y in years" :key="y">
                <div v-if="releasedList[y] && releasedList[y].length > 0" class="mt-5">
                    <h1 class="text-white font-bold text-2xl">Release Year {{ y }}</h1>
                </div>
                <div class="my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    <div v-for="list in releasedList[y]" :key="list" class="mb-3 transition-all">
                        <div v-if="list == ''"
                            class="h-56 lg:h-96 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-800 animate-pulse">
                        </div>
                        <a v-else :href="'/animes/' + list.id" class="relative">
                            <div class=" object-cover h-56 lg:h-96">
                                <img :src="list.image" loading="lazy" alt="" class="rounded-xl object-cover w-full h-full">
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
            </div>
        </div>
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
                this.getAnimeInfo(doc.data().animeId, counter)
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
                        this.getAnimeInfo(doc.data().animeId, counter)
                        counter++
                    });
                }).then(() => {
                    setTimeout(() => {
                        this.checkShowCompleted = true
                    }, 2000);
                });
            } else {
                this.checkShowCompleted = "loading"
                this.getLikeList()
            }
        },
        async getAnimeInfo(id, counter) {
            const config = useRuntimeConfig();
            this.watchListResult[counter] = '';
            const url = localStorage.getItem('server') == 'gogoanime' ? config.apiUrl + 'info/' + id : config.apiUrl2 + 'info?id=' + id
            await fetch(url).then(response => response.json()).then(data => {
                // console.log(data)
                this.watchListResult[counter] = data
                this.watchListResult[counter].counter = counter
                this.checkReleaseAnime(counter)
            }).catch(err => {
                console.log(err)
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
            document.getElementById('screenHeader').scrollIntoView()
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