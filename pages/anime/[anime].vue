<script lang="ts">
import {AnimeEpisode, AnimeInfo} from "~/utils/Model";

export default {
  data() {
    return {
      config: useRuntimeConfig(),
      animeId: this.$route.params.anime,
      animeDetails: null as AnimeInfo | null,
      anilistDetails: null as AnimeInfo | null,
      tabs: [
        {key: "info", label: "Info"},
        {key: "characters", label: "Characters"},
        {key: "relations", label: "Relations"},
        {key: "artwork", label: "Artwork"},
      ],
    }
  },
  async mounted() {
    await this.getAnimeInfo()
    useHead({
      title: this.animeDetails?.title,
      meta: [{name: "description", content: "Anime"}],
    });
  },
  methods: {
    async getAnimeInfo() {
      const url = this.config.public.apiUrl
      await fetch(`${url}info?id=${this.animeId}`).then((res) => res.json()).then((res) => {
        this.animeDetails = res
        if (this.animeDetails != null && this.animeDetails?.episodes?.length > 0) {
          this.animeDetails.episodes = res.episodes.map((item: any) => {
            return new AnimeEpisode(
                item.id,
                item.isFiller,
                item.number,
                item.title,
                item.url
            )
          })
          // this.getAniList(this.animeDetails?.alID)
        }
      })
    },
    async getAniList(alId: number) {
      const url = this.config.public.api
      console.log(url)
      await fetch(`${url}meta/anilist/info/${alId}?provider=zoro`).then((res) => res.json()).then((res) => {
        console.log("anilist", res)
      })
    }
  }
}
</script>

<template>
  <div class="pb-10">
    <div v-if="animeDetails != null" class="relative">
      <div class="absolute">
        <img :src="animeDetails.image" alt="" class="relative w-screen h-72 object-cover">
        <div
            class="w-full absolute z-[1] bg-gradient-to-b from-transparent to-zinc-950 top-0 h-72 object-cover left-0 right-0">
        </div>
      </div>
      <UContainer class="z-10 relative pt-5">
        <div class="mb-10 grid grid-cols-5">
          <div class="relative">
            <img :src="animeDetails.image" alt="" class="w-40 md:w-52 rounded-xl relative shadow-lg">
          </div>
          <div class="col-span-4 flex flex-col items-baseline justify-end">
            <h1 class="font-bold gap-3 text-xl md:text-2xl pb-2">{{ animeDetails.title }}</h1>
            <span>{{ animeDetails.japaneseTitle.length > 0 ? animeDetails.japaneseTitle : "N/A" }}</span>
            <span class="bg-white px-3 py-1 rounded text-black mt-2 text-xs">{{ animeDetails.type }}</span>
          </div>
        </div>
        <UTabs :items="tabs">
          <template #item="{ item }">
            <UCard v-if="item.key === 'info'">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div class="col-span-1">

                </div>
                <div class="col-span-3">
                  <div>
                    <h5 class="text-white font-semibold md:text-2xl">
                      Description
                    </h5>
                    <div class="mt-3 min-h-36 max-h-48 overflow-y-auto">
                      <p v-html="animeDetails?.description"
                         class="text-zinc-300 text-justify text-sm"></p>
                    </div>
                  </div>
                </div>
              </div>
            </UCard>
            <UCard v-if="item.key === 'characters'">
              "Coming Soon"
            </UCard>
            <UCard v-if="item.key === 'relations'">
              "Coming Soon"
            </UCard>
            <UCard v-if="item.key === 'artwork'">
              "Coming Soon"
            </UCard>
          </template>
        </UTabs>
        <UDivider class="py-5"/>
        <div>
          <h3 class="text-white text-xl">Episodes</h3>
          <div class="mt-3 max-h-[70vh] overflow-y-auto scroll-p-0">
            <NuxtLink
                :to="`/anime/watch/${x.id}?animeId=${animeId}`"
                v-for="x in animeDetails.episodes?.sort((a, b) => b.number - a.number)" :key="x.id">
              <UCard>
                EP {{ x.number }} {{ x.title }}
              </UCard>
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </div>
    <div v-else class="h-screen"></div>
  </div>
</template>

<style scoped>

</style>