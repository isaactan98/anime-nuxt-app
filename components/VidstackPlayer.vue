<template>
    <media-player :title="title" :poster="poster" :src="src" aspect-ratio="16/9" crossorigin>
        <media-outlet></media-outlet>
        <media-community-skin></media-community-skin>
    </media-player>
</template>

<script lang="ts">
import 'vidstack/styles/defaults.css'
import 'vidstack/styles/community-skin/video.css'

import { defineCustomElements } from 'vidstack/elements';

export default {
    prop: {
        src: null,
        title: null,
        poster: null
    },
    mounted() {
        defineCustomElements();
    }
}

</script>