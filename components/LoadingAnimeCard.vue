<template>
    <div class="rounded-2xl object-cover min-w-[150px] lg:min-w-[220px] bg-zinc-800 bg-opacity-40 animate-pulse"
        :class="height">
    </div>
</template>

<script lang="ts">
export default {
    name: "LoadingAnimeCard",
    props: {
        height: {
            type: String,
            default: "h-64 lg:h-[16rem]"
        }
    }
};
</script>