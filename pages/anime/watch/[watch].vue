<script lang="ts">
import {AnimeEpisode, AnimeInfo, VideoMedia} from "~/utils/Model";

export default {
  data() {
    return {
      config: useRuntimeConfig(),
      category: 'sub',
      videoInfo: null as VideoMedia | null,
      animeDetails: null as AnimeInfo | null,
      animeId: this.$route.query.animeId as string,
      episodeId: this.$route.params.watch.toString(),
      episodeTitle: '' as string | undefined
    }
  },
  mounted() {
    const watchId = this.$route.params.watch.toString();
    const replace = watchId.replace("$episode$", "?ep=").replace("$sub", "");
    this.getEp(replace)
    if (this.animeId != null) {
      this.getAnimeInfo(this.animeId)
    }
  },
  methods: {
    async getEp(url: string) {
      const watchUrl = `https://aniwatch-api2.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${url}&category=${this.category}`
      await fetch(watchUrl).then((res) => res.json()).then((res) => {
        this.videoInfo = res.data
      }).catch((err) => {
        alert(err)
      })
    },
    async getAnimeInfo(animeId: string) {
      const url = this.config.public.apiUrl
      await fetch(`${url}info?id=${animeId}`).then((res) => res.json()).then((res) => {
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
          this.episodeTitle = this.animeDetails.episodes.find((item: any) => item.id === this.episodeId)?.title
        }
      })
    },
  }
}
</script>

<template>
  <div class="mt-10">
    <UContainer v-if="videoInfo != null" class="min-h-screen">
      <VideoPlayer :src="videoInfo.sources[0].url" :subtitle="videoInfo.tracks" :title="episodeTitle"/>

      <div v-if="animeDetails != null" class="grid grid-cols-5 gap-3 relative my-5">
        <div class="col-span-1">
          <img :src="animeDetails.image" alt="" class="rounded-lg">
        </div>
        <div class="col-span-4">
          <h1 class="text-2xl font-bold">
            Episode {{ animeDetails.episodes.find((item: any) => item.id === episodeId)?.number }}
          </h1>

          <div>
            <div class="mt-3 max-h-[30vh] overflow-y-auto scroll-p-0">
              <NuxtLink
                  :to="`/anime/watch/${x.id}?animeId=${animeId}`"
                  v-for="x in animeDetails.episodes?.sort((a, b) => b.number - a.number)" :key="x.id">
                <UCard :class="{ '!bg-purple-500' : x.id == episodeId }">
                  EP {{ x.number }} {{ x.title }}
                </UCard>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

    </UContainer>
    <div v-else class="h-screen"></div>
  </div>
</template>

<style scoped>

</style>