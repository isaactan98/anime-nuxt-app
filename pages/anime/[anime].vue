<script lang="ts">
import {AniListInfo, AnimeEpisode, AnimeInfo} from "~/utils/Model";
import {getCountDown} from "~/utils/Services";

export default {
  data() {
    return {
      config: useRuntimeConfig(),
      animeId: this.$route.params.anime,
      animeDetails: null as AnimeInfo | null,
      anilistDetails: null as AniListInfo | null,
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
    getCountDown,
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
          if (this.animeDetails.alID != null && this.animeDetails.alID > 0) {
            this.getAniList(this.animeDetails?.alID)
          }
        }
      })
    },
    async getAniList(alId: number) {
      const url = this.config.public.api
      await fetch(`${url}meta/anilist/info/${alId}?provider=zoro`).then((res) => res.json()).then((res) => {
        this.anilistDetails = res
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
            class="w-full absolute z-[1] bg-black/70 md:bg-transparent md:bg-gradient-to-b md:from-transparent md:to-zinc-900 top-0 h-72 object-cover left-0 right-0">
        </div>
      </div>
      <UContainer class="z-10 relative pt-5">
        <div class="mb-10 grid grid-cols-4 md:grid-cols-5 gap-3">
          <div class="relative">
            <img :src="animeDetails.image" alt="" class="w-40 md:w-52 rounded-xl relative shadow-lg">
          </div>
          <div class="col-span-3 md:col-span-4 flex flex-col items-baseline md:justify-end">
            <h1 class="font-bold gap-3 text-lg md:text-2xl pb-2">{{ animeDetails.title }}</h1>
            <UBadge
                icon="i-heroicons-rocket-launch"
                size="sm"
                color="purple"
                variant="solid"
                :label="animeDetails.type"
                :trailing="false"
            />
          </div>
        </div>
        <UTabs :items="tabs">
          <template #item="{ item }">
            <UCard v-if="item.key === 'info'">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div class="col-span-1" >
                  <h5 class="text-white font-semibold md:text-2xl">Info</h5>
                  <div class="grid grid-cols-3 gap-2 items-center mt-3">
                    <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                      Genres
                    </p>
                    <span class="text-zinc-300 col-span-2">
                      {{ animeDetails?.genres[0].split(":")[1] }}
                    </span>
                  </div>
                  <div v-if="anilistDetails != null">
                    <div class="grid grid-cols-3" v-if="anilistDetails.nextAiringEpisode">
                      <p class="text-zinc-300 col-span-1 capitalize">Airing</p>
                      <p class="col-span-2">
                        EP {{ anilistDetails.nextAiringEpisode.episode }} -
                        {{ getCountDown(anilistDetails.nextAiringEpisode.airingTime.toString()) }}
                      </p>
                    </div>
                    <div class="grid grid-cols-3" v-if="anilistDetails.endDate">
                      <p class="text-zinc-300 col-span-1 capitalize">End</p>
                      <p class="col-span-2">
                        {{ anilistDetails.endDate.year }}-{{ anilistDetails.endDate.month }}-{{
                          anilistDetails.endDate.day
                        }}
                      </p>
                    </div>
                    <div class="grid grid-cols-3 gap-2 items-center mt-3">
                      <p class="text-zinc-300 col-span-1 font-semibold capitalize">
                        Genres
                      </p>
                      <span class="text-zinc-300 col-span-2">
                      {{ anilistDetails?.genres.join(", ") }}
                    </span>
                    </div>
                  </div>
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
              <div v-if="anilistDetails && anilistDetails?.characters.length > 0"
                   class="grid grid-cols-3 md:grid-cols-5 gap-3">
                <UCard v-for="c in anilistDetails?.characters">
                  <img :src="c.image" alt="" class="w-full md:h-[200px] rounded-lg object-cover"/>
                  <div class="mt-3">
                    <h5 class="text-white mb-2 text-sm">
                      {{ c.name.userPreferred }}
                    </h5>
                    <UBadge :label="c.role" color="gray" size="sm"/>
                  </div>
                </UCard>
              </div>
              <h1 v-else>"Coming Soon"</h1>
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
                EP {{ x.number }} - {{ x.title }}
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