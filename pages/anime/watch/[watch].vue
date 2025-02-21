<script lang="ts">
import {VideoMedia} from "~/utils/Model";

export default {
  data() {
    return {
      category: 'sub',
      videoInfo: null as VideoMedia | null,
    }
  },
  mounted() {
    const watchId = this.$route.params.watch.toString();
    const replace = watchId.replace("$episode$", "?ep=").replace("$sub", "");
    this.getEp(replace)
  },
  methods: {
    async getEp(url: string) {
      const watchUrl = `https://aniwatch-api2.vercel.app/api/v2/hianime/episode/sources?animeEpisodeId=${url}&category=${this.category}`
      await fetch(watchUrl, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
              "Origin, Content-Type, Accept, Authorization, X-Request-With",
          Origin: "*",
        },
      }).then((res) => res.json()).then((res) => {
        this.videoInfo = res.data
      }).catch(() => {
        console.log("Error on fetching episode server. Changing server now to RAW")
        this.category = 'raw'
        this.getEp(url)
      })
    },
  }
}
</script>

<template>
  <div>
    <UContainer v-if="videoInfo != null">
      <VideoPlayer :src="videoInfo.sources[0].url" :subtitle="videoInfo.tracks"/>
    </UContainer>
  </div>
</template>

<style scoped>

</style>