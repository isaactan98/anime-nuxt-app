<template>
    <div class="container px-4 mx-auto min-h-screen">
        <div class="w-full my-3" v-if="openSection.search">
            <form v-on:submit.prevent="getAnimeList">
                <div class="flex w-full">
                    <input type="text" class="bg-zinc-800 border-0 rounded-l-md focus:ring-0 w-full text-white"
                        placeholder="Search..." v-model="searchAnime">
                    <button type="submit" class="p-3 bg-zinc-800 rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
        <SpiningLoading v-if="openSection.loading" />
        <div v-if="openSection.animeList" class="grid grid-cols-2 gap-3">
            <div v-for="anime in animeList" :key="anime" class="relative">
                <button class="mb-3" @click="showAnimeDetail(anime)">
                    <div class="object-cover h-64">
                        <img :src="anime.coverImage" class="rounded-xl object-cover max-w-full w-full h-full">
                    </div>
                    <div class="w-full my-2">
                        <p class="text-zinc-300 text-sm text-left">{{ anime.title.native }}</p>
                    </div>
                </button>
            </div>
        </div>
        <transition enter-active-class="transition duration-500 ease-in-out"
            enter-from-class="transform translate-y-full opacity-0" enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-500 ease-in-out" leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform translate-y-full opacity-0">
            <div v-if="openSection.animeDetail" class="my-3">
                <div class="object-cover w-full relative">
                    <img :src="animeDetail.bannerImage" class="object-cover rounded-lg h-[20vh] w-full">
                    <button class=" absolute bg-white bg-opacity-50 p-1 top-0 right-0 rounded-full"
                        @click="closeAnimeDetail()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div class="my-3 flex gap-3">
                    <div class="object-cover w-1/5">
                        <img :src="animeDetail.coverImage" alt="" class="rounded-md">
                    </div>
                    <div class="w-4/5">
                        <span class="text-zinc-200 font-bold">{{ animeDetail.title.native }}</span><br>
                        <span class="text-zinc-400 text-xs" v-for="title in animeDetail.title">
                            {{ title }}
                        </span>
                    </div>
                </div>
                <div class="my-3">
                    <p class="text-zinc-200 text-sm font-bold mb-2">Genres</p>
                    <div class="flex gap-2">
                        <span class="text-zinc-400 text-xs" v-for="genre in animeDetail.tags.splice(0, 5)">
                            {{ genre }}
                        </span>
                    </div>
                </div>
                <div class="my-3">
                    <p class="text-zinc-200 text-sm font-bold mb-2">Description</p>
                    <p class="text-zinc-400 text-sm text-justify overflow-y-auto h-32">{{ animeDetail.description }}</p>
                </div>
                <div class="my-3" v-if="animeDetail.episodes.data.length > 0">
                    <p class="text-zinc-200 text-sm font-bold mb-2">Episodes</p>
                    <div class="grid grid-cols-3 gap-3">
                        <button v-for="ep in animeDetail.episodes.data[0].episodes"
                            class="bg-purple-700 text-zinc-300 px-2 py-1 text-sm rounded-lg">
                            {{ ep.title }}
                        </button>
                    </div>
                </div>
                <div class="my-3" v-if="animeDetail.trailer != ''">
                    <p class="text-zinc-200 text-sm font-bold mb-2">Trailer</p>
                    <div class="grid grid-cols-3 gap-3">
                        <iframe :src="'https://www.youtube.com/embed/' + animeDetail.trailer.split('=')[1]" frameborder="0"
                            class="w-full col-span-3">
                        </iframe>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        const config = useRuntimeConfig();
        return {
            anifyUrl: config.anifyApi,
            animeList: [] as any[],
            searchAnime: "",
            openSection: {
                animeList: false,
                animeDetail: false,
                animeStream: false,
                loading: false,
                search: true,
            },
            animeDetail: {} as any,
        }
    },
    mounted() {

    },
    methods: {
        async getAnimeList() {
            if (this.searchAnime.length > 0) {
                this.openSection.loading = true;
                const response = await fetch(`${this.anifyUrl}search/anime/${this.searchAnime}`);
                const data = await response.json();
                console.warn(data);
                this.animeList = data;
                this.searchAnime = "";
                this.openSection.animeList = true;
                this.openSection.loading = false;
            }
        },
        showAnimeDetail(anime: any) {
            this.openSection.search = false;
            this.openSection.animeList = false;
            this.openSection.animeDetail = true;
            this.animeDetail = anime;
        },
        closeAnimeDetail() {
            this.openSection.search = true;
            this.openSection.animeList = true;
            this.openSection.animeDetail = false;
            this.animeDetail = {};
        }
    }
}
</script>