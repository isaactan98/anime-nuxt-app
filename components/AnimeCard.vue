<template>
    <div v-for="anime in animeInfo" :key="anime" class="relative mb-2">
        <a :href="'/v1/animes/' + anime.animeId" class="relative">
            <div class="">
                <img :src="anime.animeImg" loading="lazy" alt="" class="rounded-xl object-cover h-64 lg:h-[32rem]">
            </div>
            <div class="relative flex justify-between items-center ">
                <div class="w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-xl">
                </div>
                <div class="px-2 py-1 rounded-md bg-purple-500 text-white absolute left-1 bottom-1">
                    <h3 class="truncate text-xs lg:text-sm max-w-[4rem] lg:max-w-[10rem]">
                        {{ anime.animeTitle }}
                    </h3>
                </div>
                <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-3"
                    v-if="anime.episode || anime.episodeNum">
                    EP {{ anime.episode ?? anime.episodeNum }}
                </span>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    props: ['animeInfo'],
}
</script>

<style></style>