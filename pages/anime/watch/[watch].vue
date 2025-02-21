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
      await fetch(watchUrl).then((res) => res.json()).then((res) => {
        this.videoInfo = res.data
      }).catch((err) => {
        alert(err)
      })
    },
  }
}
</script>

<template>
  <div>
    <UContainer v-if="videoInfo != null" class="h-screen">
      <VideoPlayer :src="videoInfo.sources[0].url" :subtitle="videoInfo.tracks"/>
    </UContainer>
    <div v-else class="h-screen"></div>
  </div>
</template>

<style scoped>

</style>