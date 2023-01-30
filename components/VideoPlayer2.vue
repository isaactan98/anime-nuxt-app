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
                auto: { url: "", quality: "auto" }
            },
        }
    },
    props: ['videoDetails', 'info'],
    mounted() {

        this.details = { ...this.videoDetails }

        if (this.videoDetails.sources) {
            var source = this.details.sources
            this.url.auto.url = this.filterFilter(source, { quality: "default" })[0] ? this.filterFilter(source, { quality: "default" })[0].url : this.filterFilter(source, { quality: "auto" })[0].url
            this.url[1080].url = this.filterFilter(source, { quality: "1080p" })[0] ? this.filterFilter(source, { quality: "1080p" })[0].url : this.url.auto.url
            this.url[720].url = this.filterFilter(source, { quality: "720p" })[0] ? this.filterFilter(source, { quality: "720p" })[0].url : this.url.auto.url
            this.url[480].url = this.filterFilter(source, { quality: "480p" })[0] ? this.filterFilter(source, { quality: "480p" })[0].url : this.url.auto.url
            this.url[360].url = this.filterFilter(source, { quality: "360p" })[0] ? this.filterFilter(source, { quality: "360p" })[0].url : this.url.auto.url

            this.player = new Artplater({
                container: '.artplayer-app',
                url: this.url.auto.url,
                poster: this.info.image,
                title: this.info.title,
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
                quality: [
                    {
                        html: '1080p',
                        url: this.url[1080].url,
                    },
                    {
                        html: '720p',
                        url: this.url[720].url,
                    },
                    {
                        html: '480p',
                        url: this.url[480].url,
                    },
                    {
                        html: '360p',
                        url: this.url[360].url,
                    },
                    {
                        default: true,
                        html: 'Auto',
                        url: this.url.auto.url,
                    },
                ],
                icons: {
                    loading: '<img src="https://shadow-garden.jp/assets/img/character/chara10_main1.png" class="w-1/2 drop-shadow-lg">',
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