<template>
    <div class="snap-start">
        <div v-if="release != null" class="mb-5 relative">
            <button class="relative" @click="startLoading">
                <TransLoading v-if="clickLoading.getLoading()" />
                <div class="min-w-[150px] lg:min-w-[220px]">
                    <img :src="release.image" loading="lazy" alt=""
                        class="rounded-lg object-cover w-56 lg:w-96 h-64 lg:h-[16rem]">
                </div>
                <div class="relative flex justify-between items-center min-w-[150px] lg:min-w-[220px]">
                    <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                    </div>
                    <!-- <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                        <h3 class="truncate text-xs lg:text-sm max-w-[10rem] lg:max-w-xs">
                            {{ release.title }}
                        </h3>
                    </div> -->
                    <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                        v-if="release.episode || release.episodeNumber">
                        EP {{ release.episode ?? release.episodeNumber }}
                    </span>
                </div>
            </button>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>

export default {
    props: ['release'],
    methods: {
        startLoading() {
            clickLoading.startLoading();
            console.warn('clicked', clickLoading.getLoading())
            navigateTo('/animes/' + this.release.id)
        }
    }
}
</script>

<style></style>