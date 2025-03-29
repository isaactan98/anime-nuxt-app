<script lang="ts">
import {RecentRelease} from "~/utils/Model";

export default {
  data() {
    return {
      loading: false,
      recent: {} as RecentRelease,
      config: useRuntimeConfig(),
      breadCrumb: [
        {'label': 'Home'},
        {'label': 'Recent Release'},
      ],
    }
  },
  async mounted() {
    await this.getRecent()
  },
  methods: {
    async getRecent(page: number = 1) {
      this.loading = true
      const url = this.config.public.apiUrl
      await fetch(`${url}recent-episodes?page=${page}`).then((res) => res.json()).then((res) => {
        this.loading = false
        this.recent = res as RecentRelease
        this.recent.results = res.results.map((item: any) => {
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
  <div>
    <UContainer>
      <Title>Recent Release</Title>
      <UBreadcrumb :links="breadCrumb"/>
      <div class="grid grid-cols-3 gap-4 md:grid-cols-5">
        <div v-if="!loading" v-for="r in recent.results">
          <AnimeCard :data="r"/>
        </div>
        <BlackCard v-else v-for="x in 30"/>
      </div>
      <div v-if="recent?.results?.length > 0" class="grid place-content-center py-5">
        <UPagination v-model="recent.currentPage" :total="recent.totalPages" @update:model-value="getRecent"/>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>

</style>