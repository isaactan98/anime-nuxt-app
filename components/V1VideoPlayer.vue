<template>
    <div>
        <div class="artplayer-app w-full"></div>
    </div>
</template>

<script>
import Artplater from 'artplayer'
import Hls from 'hls.js'
export default {
    data() {
        return {
            player: null,
            details: null,
            url: {
                1080: { url: "", quality: "1080" },
                720: { url: "", quality: "720" },
                480: { url: "", quality: "480" },
                360: { url: "", quality: "360" },
                auto: { url: "", quality: "auto" },
                backup: { url: "", quality: "backup" }
            },
        }
    },
    props: ['videoDetails', 'info'],
    mounted() {

        this.details = { ...this.videoDetails }
        const corsUrl = "https://cors.dekianime.site/"

        if (this.videoDetails.sources) {
            // console.log("video detail source: ", this.videoDetails.sources)
            var source = this.details.sources
            this.url.auto.url = corsUrl + source[0].file

            this.player = new Artplater({
                container: '.artplayer-app',
                url: this.url.auto.url,
                poster: this.info.animeImg,
                title: this.info.animeTitle,
                playbackRate: true,
                aspectRatio: true,
                setting: true,
                hotkey: true,
                fullscreen: true,
                fullscreenWeb: true,
                miniProgressBar: true,
                autoOrientation: true,
                type: 'm3u8',
                customType: {
                    m3u8: playM3u8,
                },
                icons: {
                    loading: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(241, 242, 243, 0); display: block;" width="111px" height="111px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g>
  <circle cx="60" cy="50" r="4" fill="#fae141">
    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s"></animate>
    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.67s"></animate>
  </circle>
  <circle cx="60" cy="50" r="4" fill="#fae141">
    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s"></animate>
    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="-0.33s"></animate>
  </circle>
  <circle cx="60" cy="50" r="4" fill="#fae141">
    <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s"></animate>
    <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1" begin="0s"></animate>
  </circle>
</g><g transform="translate(-15 0)">
  <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#9b4bd4" transform="rotate(90 50 50)"></path>
  <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#9b4bd4">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
  </path>
  <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#9b4bd4">
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
  </path>
</g>
</svg>`,
                },
            })
        }

        function playM3u8(video, url, art) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);

                // optional
                art.hls = hls;
                art.once('url', () => hls.destroy());
                art.once('destroy', () => hls.destroy());
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
            } else {
                art.notice.show = 'Unsupported playback format: m3u8';
            }
        }
    },
    methods: {
        filterFilter(obj, exp) {
            return obj.filter((item) => item[Object.keys(exp)[0]] == Object.values(exp)[0])
        },
    }
}
</script>

<style>
.artplayer-app {
    aspect-ratio: 16/9;
}

.art-progress-played,
.art-progress-indicator,
.art-layer-miniProgressBar {
    background-color: #a855f7 !important;
}

.art-video-player .art-mask .art-state {
    bottom: auto !important;
    right: auto !important;
}

.art-icon-state svg {
    fill: #a855f7 !important;
}
</style>