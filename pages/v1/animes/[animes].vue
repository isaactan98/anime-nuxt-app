<template>
    <div class="container mx-auto min-h-screen py-4">
        <div v-if="anime.title != ''">
            <div class="w-full">
                <div class="w-full py-5 h-full">
                    <img :src="anime.img" alt="" class="w-64 m-auto rounded-xl z-10 relative shadow-lg">
                    <div class="w-full">
                        <img :src="anime.img" alt=""
                            class="w-full lg:w-3/4 mx-auto absolute top-0 blur-lg h-[30rem] object-cover left-0 right-0">
                    </div>
                </div>
            </div>
            <div class="z-10 relative bg-slate-900">
                <div class="p-4 mt-4 mx-auto md:w-3/4">
                    <div v-if="anime.otherName" class="text-zinc-400 mb-4 text-xs">{{ anime.title }}</div>
                    <h1 class="text-lg lg:text-2xl text-white mb-2">
                        {{ anime.otherName ?? anime.title }}
                        <br> <span class="text-sm font-bold">EP: {{ anime.totalEpisodes }} - <p
                                class="text-purple-400 inline-block">Latest</p></span>
                    </h1>
                    <div v-if="anime.releaseDate" class="text-zinc-300 text-sm my-3 flex items-center">
                        Release Date: <span class="text-white font-bold ml-3">{{ anime.releaseDate }}</span>
                    </div>
                    <span class="text-zinc-300 text-sm my-3 flex items-center">Type:
                        <span class=" rounded-full text-zinc-600 bg-white px-3 py-1 text-xs ml-2 font-bold">{{
                            anime.type
                        }}</span>
                        <span v-if="anime.status"
                            class="rounded-full text-zinc-600 bg-white px-3 py-1 text-xs ml-2 font-bold"
                            :class="anime.status == 'Completed' ? '!bg-green-500 !text-white' : ''">
                            {{ anime.status }}
                        </span>
                    </span>

                    <div class="text-zinc-300 text-sm my-3" v-if="anime.genres">
                        Genres:
                        <div class="mt-1">
                            <NuxtLink v-for="g of anime.genres" :key="g" :to="'/genre/' + g + '?page=1'"
                                class="text-white bg-gray-800 hover:bg-white hover:text-zinc-700 rounded-full mr-2 mt-2 px-2 py-1 text-xs inline-block">
                                {{ g }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="px-4 overflow-y-auto max-h-28 mx-auto md:w-3/4 scrollbar-hide">
                    <span class=" text-sm text-zinc-400">{{ anime.description }}</span>
                </div>

                <!-- <div class="p-4 flex justify-center gap-5 w-full md:w-3/4 lg:w-1/3 mt-4 mx-auto">
                    <a :href="serverUrl + anime.url" target="_blank"
                        class=" bg-purple-500 shadow-lg shadow-purple-500 text-white w-2/5 px-5 py-2.5 rounded-lg text-center text-sm flex justify-center items-center">
                        View on {{ server }}
                    </a>
                    <button type="button"
                        class="bg-white text-purple-500 shadow-lg shadow-purple-300 w-1/5 px-5 py-3 rounded-xl text-center grid place-content-center text-sm"
                        @click="addToList()" v-if="userId != null">
                        <span v-if="addedList == 'false'">Add to favourite</span>
                        <svg v-if="addedList == 'true'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="currentColor" class="w-6 h-6 mx-auto animate-bounce">
                            <path
                                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <SpiningLoading v-if="addedList == ''" class="text-purple-600 m-0"></SpiningLoading>
                    </button>
                    <select v-if="addedList == 'true' && selectStatus != null" @change="changeStatus(selectStatus)"
                        class="bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500 border-none text-sm w-2/5 px-3 appearance-none text-center"
                        style="background-image: none;" v-model="selectStatus">
                        <option v-for="s in status" :key="s" :value="s.id">
                            {{ s.name }}
                        </option>
                    </select>
                </div> -->

                <div class="p-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-auto md:w-3/4">
                    <NuxtLink v-for="e of anime.episode" :key="e" :to="'/v1/animes/watch/' + e.episodeId + '?id=' + anime.id"
                        class="border-2 border-white py-2 rounded-xl text-white text-center my-1 relative block truncate hover:bg-gradient-to-r animate-bg from-purple-500 to-indigo-800 hover:border-transparent ">
                        <span class="w-3/4 mx-auto">EP{{ e.episodeNum }} {{ e.title ? ' - ' + e.title : '' }}</span>
                    </NuxtLink>
                </div>
            </div>
            <!-- <div class="p-4 mt-4 mx-auto md:w-3/4" v-if="anime.genres">
                <h1 class="text-zinc-300 mb-5">Recommended for you</h1>
                <Recommend :genre="anime.genres" :id="anime.id"></Recommend>
            </div> -->
        </div>
        <div v-else class="grid place-content-center min-h-screen -mt-20">
            <h1 class="text-white font-extrabold">Loading...</h1>
        </div>
    </div>
</template>

<script>
import { getFirestore, query, where, getDocs, updateDoc, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

export default {
    data() {
        return {
            anime: {
                id: '',
                title: '',
                description: '',
                url: '',
                img: '',
                totalEpisodes: '',
                type: '',
                episode: [],
                genres: [],
                otherName: '',
                status: '',
                releaseDate: ''
            },
            server: "",
            addedList: 'false',
            userId: '',
            serverUrl: '',
            status: [
                { id: 'no_status', name: 'Select Status' },
                { id: 'watching', name: 'Watching' },
                { id: 'completed', name: 'Completed' },
            ],
            selectStatus: null
        }
    },
    mounted() {
        this.setTitle();

        this.userId = sessionStorage.getItem('userId');

        const route = useRoute();
        var id = route.params.animes;
        const config = useRuntimeConfig();

        var url = config.apiUrlV1 + "anime-details/" + id;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                if (data != null) {
                    this.anime.id = id;
                    this.anime.title = data.animeTitle;
                    this.anime.otherName = data.otherNames
                    this.anime.description = data.synopsis;
                    this.anime.url = data.url ?? "";
                    this.anime.img = data.animeImg;
                    this.anime.totalEpisodes = data.totalEpisodes;
                    this.anime.type = data.type;
                    this.anime.releaseDate = data.releasedDate ?? '';
                    this.shuffle(data.genres);
                    this.anime.genres = data.genres;
                    this.anime.status = data.status;
                    this.sortEpisode(data.episodesList);
                    this.anime.episode = data.episodesList;
                    this.setTitle();
                    // this.getAddedList()
                    // console.log(this.addedList)
                } else {
                    alert('Server is down or not found, trying to search the anime...')
                    // this.$router.push('/search/' + id + "?page=1")
                }
            })
            .catch(err => console.log(err));

    },
    methods: {
        setTitle() {
            useHead({
                title: this.anime.title != '' ? this.anime.title : 'Loading...',
            })
        },
        // sort by number 
        sortEpisode(arr) {
            arr.sort((a, b) => {
                return b.number - a.number;
            });
        },
        getAddedList() {
            const db = getFirestore();
            const q = query(collection(db, "watch-list"),
                where("animeId", "==", this.anime.id),
                where("userId", "==", sessionStorage.getItem('userId')),
                where("server", "==", localStorage.getItem('server'))
            );
            const querySnapshot = getDocs(q);

            querySnapshot.then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.addedList = 'true';
                });
                return querySnapshot;
            }).then((s) => {
                s.docs.forEach((doc) => {
                    this.selectStatus = doc.data().status;
                })
                // console.log('inner', this.selectStatus)
            })
            // console.log('outer', this.selectStatus)
        },
        addToList() {
            const db = getFirestore();
            if (this.addedList != 'true') {
                this.addedList = '';
                try {
                    addDoc(collection(db, "watch-list"), {
                        animeId: this.anime.id,
                        userId: sessionStorage.getItem('userId'),
                        server: localStorage.getItem('server'),
                        createdAt: new Date(),
                        status: 'no_status'
                    }).then(() => {
                        this.addedList = 'true';
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            if (this.addedList == 'true') {
                this.addedList = '';
                try {
                    const q = query(collection(db, "watch-list"), where("animeId", "==", this.anime.id));
                    const querySnapshot = getDocs(q);

                    querySnapshot.then((querySnapshot) => {
                        querySnapshot.forEach((docs) => {
                            if (docs.data().userId == sessionStorage.getItem('userId') && docs.data().server == localStorage.getItem('server')) {
                                deleteDoc(doc(db, "watch-list", docs.id)).then(() => {
                                    this.addedList = 'false';
                                })
                            }
                        });
                    });
                } catch (error) {
                    console.log(error)
                }
            }
        },
        changeStatus(value) {
            const db = getFirestore();
            const q = query(collection(db, "watch-list"), where("animeId", "==", this.anime.id));
            const querySnapshot = getDocs(q);

            querySnapshot.then((querySnapshot) => {
                querySnapshot.forEach((docs) => {
                    // console.log(docs.data())
                    if (docs.data().userId == sessionStorage.getItem('userId') && docs.data().server == localStorage.getItem('server')) {
                        updateDoc(doc(db, "watch-list", docs.id), {
                            status: value
                        }).then(() => {
                            this.selectStatus = value;
                            alert('Status updated successfully.')
                        })
                    }
                });
            });
        },
        // randomize array
        shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
    }
}
</script>

<style>
.animate-bg {
    /* background: linear-gradient(90deg, #4c51bf, #6b46c1, #805ad5, #b794f4, #4c51bf); */
    background-size: 400% 400%;
    animation: gradient 5s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>