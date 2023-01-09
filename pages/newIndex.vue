<template>
    <div class="bg-black container px-4 mx-auto">

        <div class="text-white my-4 lg:min-h-[20vh] flex items-center">
            <h1 class="text-4xl font-extrabold">
                Your Favourite <br>
                <span class="text-green-400">Anime</span>
            </h1>
        </div>
        <div>
            <h1 class="mb-4 dark:text-white">Recent Release</h1>
            <div v-if="recentRelease.length == 0">
                <h1 class=" dark:text-white">Loading...</h1>
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
        }
    },
    mounted() {
        this.getRecentRelease()
    },
    methods: {
        async getRecentRelease() {
            const config = useRuntimeConfig();
            await fetch(config.apiUrl2 + 'recent-episodes')
                .then(response => response.json())
                .then(data => {
                    console.log(data.results)
                    this.recentRelease = data.results;
                })
                .catch(err => console.log(err));
        }
    }
}

</script>

<style>

</style>