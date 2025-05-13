<script setup lang="ts">
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/audio.css';
import 'vidstack/player/styles/default/layouts/video.css';
// Register elements.
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';

import {Subtitle} from "~/utils/Model";

const props = defineProps({
  src: {type: String},
  subtitle: {type: Array as () => Subtitle[]},
  title: {type: String},
  poster: {type: String}
})
</script>

<template>
  <media-player :title="title" :src="src" :poster="poster">
    <media-provider>
      <track v-for="s in subtitle" :src="s.url"
             kind="subtitles"
             :label="s.lang"
             data-type="vtt"/>
    </media-provider>
    <media-audio-layout/>
    <media-video-layout/>
  </media-player>
</template>

<style scoped>

</style>