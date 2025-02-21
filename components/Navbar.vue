<script setup lang="ts">
const links = [[
  {
    label: "Home",
    icon: 'i-heroicons-home',
    to: "/"
  },
  {
    label: "Manga",
    icon: 'i-heroicons-command-line',
    to: "/manga"
  },
  {
    label: "About",
    icon: 'i-heroicons-chart-bar',
    to: "/about"
  }],
  [{
    icon: 'i-heroicons-magnifying-glass',
    label: 'Search',
    to: "/search"
  }]]

const openModel = ref(false)
</script>

<template>
  <nav class="w-full sticky top-0 z-50">
    <UContainer class="flex sm:hidden p-2">
      <UButton label="Open" :padded="false" color="black" variant="ghost" @click="openModel = true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"/>
        </svg>
      </UButton>
    </UContainer>
    <UHorizontalNavigation :links="links" class="backdrop-blur hidden md:flex"/>
  </nav>
  <USlideover v-model="openModel" side="left">
    <UCard class="flex flex-col flex-1 bg-zinc-900 rounded-none"
           :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-white">
            Navigation
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="openModel = false"/>
        </div>
      </template>
      <Placeholder class="h-full">
        <UVerticalNavigation :links="links" class="mt-3"
                             :ui="{ padding: '!py-2.5', active: 'text-purple-500', size: 'text-base' }"
                             @click="openModel = false"/>
      </Placeholder>
    </UCard>
  </USlideover>
</template>

<style scoped>

</style>