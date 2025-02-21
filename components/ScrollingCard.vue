<script setup lang="ts">
import type {RecentAnime} from "~/utils/Model";

const props = defineProps({
  data: {type: Array as () => RecentAnime[]},
})
</script>

<template>
  <div class="flex overflow-x-auto gap-5 w-full snap-x scroll-smooth">
    <AnimeCard v-for="(anime, index) in props.data"
               :key="index"
               :data="anime"/>
  </div>
</template>

<style scoped>

</style>