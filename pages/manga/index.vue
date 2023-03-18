<template>
    <div class="container p-4 mx-auto min-h-screen">
        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your Favourite <br>
                <span class="text-purple-500 flex items-center">Manga
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 ml-2">
                        <path
                            d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                    </svg>
                </span>
            </h1>
        </div>

        <div class="container mx-auto">
            <div class="w-full md:w-2/3">
                <div class="w-full flex items-center">
                    <input type="text"
                        class="bg-gray-200 w-full rounded-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:text-gray-900"
                        placeholder="Search..." v-model="search" id="searchManga">
                    <button type="button" class=" text-white" @click="searchManga()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
                            <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                            <path fill-rule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="container mx-auto mt-8">
            <div class="ml-3 mb-5 underline underline-offset-2 w-full flex text-white" v-if="manga.length > 0">
                Result: {{ manga.length ?? '0' }}
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2" v-if="loading == false">
                <NuxtLink class="text-white px-3 py-3 bg-slate-800 rounded-2xl mb-3" v-for="m in manga" :key="m"
                    :to="'/manga/' + m.id">
                    <div class="object-contain">
                        <img :src="m.image" alt="" class="rounded-lg w-full">
                    </div>
                    <hr class=" my-2">
                    <div>{{ m.title }}</div>
                </NuxtLink>
            </div>
            <div class="w-full flex items-center justify-center" v-else>
                <SpiningLoading />
            </div>
            <div class="w-full flex justify-center mt-3" v-if="manga.length > 0">
                <!-- <NuxtLink class="text-white">Load More</NuxtLink> -->
            </div>
            <div class="w-full md:w-2/3" v-if="manga.length == 0">
                <img src="https://shadow-garden.jp/assets/img/character/chara10_main1.png" class=" w-full" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            manga: [],
            loading: false,
            search: '',
        }
    },
    async mounted() {
        // this.searchManga()
        document.getElementById('searchManga').focus()
        document.getElementById('searchManga').addEventListener('keydown', (e) => {
            // console.log(e.key)
            if (e.key === 'Enter') {
                this.searchManga()
            }
        })
        useHead({
            title: 'Manga',
            meta: [
                { name: 'description', content: 'Manga' },
            ],
        })
    },
    methods: {
        async searchManga() {
            if (this.search == '') {
                return
            } else {
                this.loading = true
                await fetch('https://api.consumet.org/manga/mangasee123/' + this.search)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.message) {
                            alert(data.error)
                        } else {
                            this.manga = data.results
                        }
                        this.loading = false
                    })
            }

        },
    },
}
</script>

<style></style>