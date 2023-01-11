<template>
    <div class="container px-4 mx-auto min-h-screen">


        <div class="text-white my-4 min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your Favourite <br>
                <span class="text-green-400">Anime</span>
            </h1>
        </div>
        <div class="flex overflow-x-auto w-full gap-3 py-4">
            <div v-for="g in genre" :key="g.id" class="">
                <h1 class="text-xs px-4 py-2 rounded-full border-green-400 text-white"
                    :class="g.id == 'all' ? 'bg-green-400' : 'bg-green-900'">
                    {{ g.name }}
                </h1>
            </div>
        </div>
        <div class="mt-4">
            <h1 class="mb-4 text-white text-xl">Recent Release</h1>
            <div v-if="recentRelease.length == 0">
                <h1 class=" text-white">Loading...</h1>
            </div>
            <div v-else class="flex overflow-x-auto gap-5 w-full">
                <RecentReleaseComponent v-for="rr in recentRelease" :key="rr" :release="rr" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {

    data() {
        return {
            recentRelease: [],
            genre: [
                // anime genre 
                { id: 'all', name: 'All' },
                { id: 'action', name: 'Action' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
                { id: 'adventure', name: 'Adventure' },
            ]
        }
    },
    mounted() {
        useHead({
            title: 'Home',
            meta: [
                {
                    name: 'description',
                    content: 'Anime'
                },
                {
                    name: 'keywords',
                    content: 'Anime'
                }
            ]
        })
        this.getRecentRelease()
    },
    methods: {
        async getRecentRelease() {
            const config = useRuntimeConfig();
            await fetch(config.apiUrl2 + 'recent-episodes')
                .then(response => response.json())
                .then(data => {
                    // console.log(data.results)
                    this.recentRelease = data.results;
                })
                .catch(err => console.log(err));
        }
    }
}

</script>

<style>

</style>