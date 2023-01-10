<template>
    <div>
        <div v-if="release != null" class="mb-5 relative">
            <a :href="release.url" target="_blank" class="relative">
                <div class="min-w-[220px] lg:min-w-[380px]">
                    <img :src="release.image" alt="" class="rounded-xl object-cover w-56 lg:w-96 h-60 lg:h-[36rem]">
                </div>
                <div class="relative flex justify-between items-center min-w-[230px] lg:min-w-[380px]">
                    <a :href="release.url" target="_blank" class=" absolute left-1 bottom-1">
                        <div class="px-3 py-2 rounded-full bg-green-400">
                            <h3 class="truncate text-xs lg:text-sm max-w-[10rem] lg:max-w-xs">
                                {{ release.title }}
                            </h3>
                        </div>
                    </a>
                    <span class="bg-white rounded-md text-sm px-2 absolute bottom-1 right-2">
                        EP {{ release.episode }}
                    </span>
                </div>
            </a>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>

export default {
    props: ['release'],
}
</script>

<style>

</style>