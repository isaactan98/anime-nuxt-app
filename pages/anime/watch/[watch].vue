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
      episodeTitle: '' as string | undefined,
      servers: [{
        name: 'Raw',
        value: 'raw'
      }, {
        name: 'Sub',
        value: 'sub'
      }],
      selected: 'sub',
      setReplace: '',
      error: false,
      failCounter: 0,
      iframeLink: "" as string | undefined,
      proxy: "https://m3-u8-proxy-ivory.vercel.app/m3u8-proxy?url=",
      headers: "",
      setError: false,
    }
  },
  mounted() {
    const toast = useToast()
    const watchId = this.$route.params.watch.toString();
    this.setReplace = watchId.replace("$episode$", "?ep=").replace("$sub", "");
    if (this.animeId != null) {
      this.getAnimeInfo(this.animeId)
    }
    this.getWatch(watchId);
    // this.getEp(this.setReplace).catch((err) => {
    //   alert(err)
    //   toast.add({
    //     title: 'There was an error, please try again',
    //   })
    // })
  },
  methods: {
    async getEp(url: string) {
      const watchUrl = `https://aniwatch-api2.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${url}&category=${this.category}`
      await fetch(watchUrl)
          .then((res) => {
            if (res.status !== 200) {
              res.json().then(data => {
                alert(`Error fetching episode: ${data.message}`)
              })
              this.category = this.selected = 'raw'
              this.getEp(url)
              this.failCounter++
            }
            if (this.failCounter > 3) {
              alert(`Error fetching episode: ${this.episodeTitle}.`)
              window.location.href = '/'
            }
            return res.json()
          })
          .then((res) => {
            this.videoInfo = res.data
            this.error = false
          }).catch((err) => {
            this.videoInfo = null
            this.error = true
            // alert(err)
          })
    },
    async changeServer(value: string) {
      this.category = value
      await this.getEp(this.setReplace)
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
          this.iframeLink = this.animeDetails.episodes.find((item: any) => item.id === this.episodeId)?.url
        }
      })
    },
    async getWatch(id: string) {
      console.clear()
      const newUrl = "https://consumet-a1b73be4992c.herokuapp.com/anime/animekai/"
      await fetch(`${newUrl}watch/${id}`).then((res) => res.json()).then((res) => {
        if (res.status == 200) {
          this.videoInfo = res
          this.headers = `{"referer": ${res.headers["Referer"]}`
        } else {
          this.setError = true
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  },
}
</script>

<template>
  <div class="mt-10">
    <UContainer class="md:min-h-screen">
      <VideoPlayer v-if="videoInfo != null"
                   :src="proxy + encodeURIComponent(videoInfo.sources[0].url) + '&header=' + encodeURIComponent(headers)"
                   :subtitle="videoInfo.tracks"
                   :title="episodeTitle"/>
      <UAlert v-if="setError" color="red"
              variant="solid" title="Error!" description="Not able to load episode."/>
      <a v-if="iframeLink" target="_blank" :href="iframeLink"
         class="bg-purple-500 text-white px-3 py-2 mt-5 rounded">
        Watch Ori Site
      </a>
      <div v-if="animeDetails != null" class="grid grid-cols-3 md:grid-cols-5 gap-3 relative my-5">
        <div class="col-span-1">
          <img :src="animeDetails.image" alt="" class="rounded-lg">
        </div>
        <div class="col-span-2 md:col-span-4">
          <div class="flex justify-between">
            <h1 class="text-2xl font-bold">
              Episode {{ animeDetails.episodes.find((item: any) => item.id === episodeId)?.number }}
            </h1>
            <USelect v-model="selected" :options="servers" option-attribute="name" @change="changeServer"/>
          </div>
          <NuxtLink :to="`/anime/${animeId}`" class="py-10">
            <h3 class="text-purple-500">{{ animeDetails.title }}</h3>
          </NuxtLink>
          <div>
            <div class="mt-3 max-h-[30vh] overflow-y-auto scroll-p-0">
              <NuxtLink
                  :to="`/anime/watch/${x.id}?animeId=${animeId}`"
                  v-for="x in animeDetails.episodes?.sort((a, b) => b.number - a.number)" :key="x.id">
                <UCard :class="{ '!bg-purple-500' : x.id == episodeId }" class="text-xs md:text-xl">
                  EP {{ x.number }} {{ x.title }}
                </UCard>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <UContainer v-else class="min-h-screen">
        <USkeleton style="aspect-ratio: 16/9;"/>
      </UContainer>
    </UContainer>
  </div>
</template>

<style scoped>

</style>