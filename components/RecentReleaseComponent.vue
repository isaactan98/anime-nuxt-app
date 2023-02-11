<template>
    <div class="snap-start">
        <div v-if="release != null" class="mb-5 relative">
            <a :href="'/animes/' + release.id" class="relative">
                <div class="min-w-[220px] lg:min-w-[380px]">
                    <img :src="release.image" loading="lazy" alt="" class="rounded-xl object-cover w-56 lg:w-96 h-72 lg:h-[32rem]">
                </div>
                <div class="relative flex justify-between items-center min-w-[230px] lg:min-w-[380px]">
                    <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                    </div>
                    <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                        <h3 class="truncate text-xs lg:text-sm max-w-[10rem] lg:max-w-xs">
                            {{ release.title }}
                        </h3>
                    </div>
                    <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                        v-if="release.episode || release.episodeNumber">
                        EP {{ release.episode ?? release.episodeNumber }}
                    </span>
                </div>
            </a>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>

export default {
    props: ['release'],
}
</script>

<style>

</style>