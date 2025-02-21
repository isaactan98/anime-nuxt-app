<script setup lang="ts">
const q = ref('')
const loading = ref(false)
const results = ref<any[]>([]); // Store API results here
const page = ref(1); // Current page for pagination
const hasMore = ref(false); // Indicates if there are more results to load
const loadingList = ref(false); // Loading state for API calls

async function searchAnime(value: number) {
  const config = useRuntimeConfig()
  if (q.value.trim() === '') {
    results.value = []; // Clear results if the query is empty
    return;
  }

  loading.value = true;

  try {
    const url = config.public.apiUrl
    const response = await fetch(`${url}${q.value}?page=${value}`);
    const data = await response.json();
    if (data && data.results) {
      hasMore.value = !!data.hasNextPage; // Update `hasMore` based on API response

      // Append or reset results based on the current page
      results.value = value > 1 ? [...results.value, ...data.results] : data.results;

      // Increment the page number for the next request
      page.value = value + 1;
    } else {
      hasMore.value = false; // No more results available
    }
    loading.value = false
  } catch (error) {
    console.error('Error fetching anime data:', error);
    results.value = []; // Clear results on error
  }
}
</script>

<template>
  <UContainer class="my-10 min-h-screen">
    <UInput
        :loading="loading"
        v-model="q"
        name="q"
        placeholder="Search Anime..."
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        :ui="{ size: {md: 'h-32 w-auto' }, icon: { trailing: { pointer: '' } } }"
        @keydown.enter="searchAnime(1)"
    >
      <template #trailing>
        <UButton
            v-show="q !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="q = ''"
        />
      </template>
    </UInput>

    <!-- Display Results -->
    <div v-if="results.length > 0" class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Search Results:</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
        <AnimeCard v-for="(anime,x) in results.values()" :data="anime"/>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore" class="mt-4 text-center">
      <UButton
          color="primary"
          :loading="loading"
          @click="searchAnime(page + 1)"
      >
        Load More
      </UButton>
    </div>


    <!-- No Results Message -->
    <div v-else-if="q !== '' && results.length === 0" class="mt-4 text-gray-500">
      No results found.
    </div>
  </UContainer>
</template>

<style scoped>

</style>