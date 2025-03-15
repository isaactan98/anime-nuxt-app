<script lang="ts">
import {RecentRelease, SpotLightItem, SpotLights, TopAiring} from "~/utils/Model";
import BlackCard from "~/components/BlackCard.vue";

export default {
  components: {BlackCard},
  data() {
    return {
      spotlight: {} as SpotLights,
      recentRelease: {} as RecentRelease,
      topAiring: {} as TopAiring,
      config: useRuntimeConfig()
    }
  },
  mounted() {
    useHead({
      title: 'Home',
      meta: [
        {name: 'description', content: 'Home'},
      ],
    })
    this.getSpotlight()
    this.getRecent()
    this.getTopAir()
  },
  methods: {
    async getSpotlight() {
      const url = this.config.public.apiUrl
      await fetch(`${url}spotlight`).then((res) => res.json()).then((res) => {
        this.spotlight = res
        this.spotlight.results = res.results.map((item: any) => {
          return new SpotLightItem(
              item.id,
              item.title,
              item.japaneseTitle,
              item.banner,
              item.rank,
              item.url,
              item.type,
              item.duration,
              item.releaseDate,
              item.quality,
              item.sub,
              item.dub,
              item.episodes,
              item.description,
          )
        })
      })
    },
    async getRecent() {
      const url = this.config.public.apiUrl
      await fetch(`${url}recent-episodes`).then((res) => res.json()).then((res) => {
        this.recentRelease = res
        this.recentRelease.results = res.results.map((item: any) => {
          return new RecentAnime(
              item.id,
              item.title,
              item.url,
              item.image,
              item.duration,
              item.japaneseTitle,
              item.type,
              item.nsfw,
              item.sub,
              item.dub,
              item.episodes
          )
        })
      })
    },
    async getTopAir() {
      const url = this.config.public.apiUrl
      await fetch(`${url}recent-added`).then((res) => res.json()).then((res) => {
        this.topAiring = res
        this.topAiring.results = res.results.map((item: any) => {
          return new RecentAnime(
              item.id,
              item.title,
              item.url,
              item.image,
              item.duration,
              item.japaneseTitle,
              item.type,
              item.nsfw,
              item.sub,
              item.dub,
              item.episodes
          )
        })
      })
    }
  }
}
</script>

<template>
  <div class="pb-28">
    <UCarousel v-if="spotlight?.results?.length > 0" v-slot="{ item }" :items="spotlight.results"
               :ui="{ item: 'basis-full' }" arrows indicators>
      <div class="relative">
        <div class="top-0 bg-gradient-to-bl from-transparent to-zinc-900 absolute h-[35vh] md:h-[75vh] w-screen"></div>
        <img :src="item.banner" class="object-cover h-[35vh] md:h-[75vh] w-screen" alt="">
        <div class="absolute bottom-10 left-10 w-3/4 md:w-full drop-shadow-sm text-zinc-300">
          <UContainer :ui="{ padding: 'p-1 sm:p-1 lg:p-1' }" class="">
            <h1 class="mb-3 text-lg md:text-4xl font-bold leading-normal text-ellipsis text-white">
              {{ item.title }}</h1>
            <p class="w-1/2 text-sm md:text-base line-clamp-1 md:line-clamp-3" v-html="item.description"></p>
            <div class="hidden md:flex gap-3 items-center text-sm my-3">
                            <span class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"/>
                                </svg>
                                {{ item.type }}
                            </span>
              <span>{{ item.releaseDate }}</span>
            </div>
            <NuxtLink :to="`/anime/${item.id}`">
              <UButton icon="i-heroicons-play-circle" color="purple"
                       :ui="{ rounded: 'rounded-full' }">
                Watch Now
              </UButton>
            </NuxtLink>
          </UContainer>
        </div>
      </div>
    </UCarousel>
    <div v-else class="relative h-[35vh] md:h-[75vh] bg-zinc-700">
    </div>
    <UContainer class="mt-10">
      <h1 class="text-2xl font-semibold text-white mb-5">Recent Release</h1>
      <ScrollingCard v-if="recentRelease.results?.length > 0" :data="recentRelease.results"/>
      <div class="flex w-full overflow-x-auto snap-x scroll-smooth gap-3" v-else>
        <BlackCard v-for="x in 10"/>
      </div>
    </UContainer>

    <UContainer class="mt-10">
      <h1 class="text-2xl font-semibold text-white mb-5">Top Airing</h1>
      <ScrollingCard v-if="topAiring.results?.length > 0" :data="topAiring.results"/>
      <div class="flex w-full overflow-x-auto snap-x scroll-smooth gap-3" v-else>
        <BlackCard v-for="x in 10"/>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>

</style>