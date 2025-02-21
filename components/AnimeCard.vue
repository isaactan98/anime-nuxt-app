<script setup lang="ts">
import {RecentAnime} from "~/utils/Model";

const props = defineProps({
  data: {type: RecentAnime},
})
</script>

<template>
  <NuxtLink :to="`/anime/${props?.data?.id}`" class="snap-start ">
    <UCard :ui="{ background: 'dark:bg-transparent', ring: 'dark:ring-0'}">
      <div class="w-[150px] lg:w-[220px] relative">
        <img alt="" :src="props.data?.image" class="rounded-lg object-cover w-56 lg:w-96 h-64 lg:h-[24rem]"/>
        <span class="absolute right-0 top-0 p-2 bg-purple-500 rounded-tr-lg text-xs">
        EP {{ props?.data?.sub }}
      </span>
        <span v-if="data?.nsfw" class="absolute left-0-0 top-0 p-2 bg-red-500 rounded-tl-lg text-xs">
        18+
      </span>
      </div>
      <template #footer>
      <span class="line-clamp-2">
        {{ data?.title }}
      </span>
      </template>
    </UCard>
  </NuxtLink>
</template>

<style scoped>

</style>