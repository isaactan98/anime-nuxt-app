<template>
    <div class="">
        <video ref="videoPlayer" class="video-js vjs-theme-fantasy" id="video_player">
        </video>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import '@videojs/themes/dist/fantasy/index.css'
import 'videojs-contrib-quality-levels';
import 'videojs-hls-quality-selector';

export default {
    props: ['videoDetails', 'info'],
    data() {
        return {
            video: null,
            url: {
                1080: { url: "", quality: "1080" },
                720: { url: "", quality: "720" },
                360: { url: "", quality: "360" },
                auto: { url: "", quality: "auto" }
            },
            subtitle: "",
            details: null
        }
    },
    mounted() {
        this.details = { ...this.videoDetails }
        if (this.videoDetails.sources) {
            var source = this.details.sources

            this.url[1080].url = this.filterFilter(source, { quality: "1080p" })[0].url
            this.url[720].url = this.filterFilter(source, { quality: "720p" })[0].url
            this.url[360].url = this.filterFilter(source, { quality: "360p" })[0].url
            this.url.auto.url = this.filterFilter(source, { quality: "default" })[0].url

            this.video = videojs('video_player', {
                html5: {
                    vhs: { experimentalBufferBasedABR: true, useDevicePixelRatio: true },
                    nativeAudioTracks: false,
                    nativeVideoTracks: false,
                    useBandwidthFromLocalStorage: true
                },
                controls: true,
                responsive: true,
                preload: 'auto',
                fluid: true,
                fullscreen: {
                    enterOnRotate: true,
                    iOS: true
                },
                poster: this.info.image,
                playbackRates: [0.75, 1, 1.25, 1.5, 2],
                VideoPlaybackQuality: true,
                controlBar: {
                    children: [
                        'playToggle',
                        'volumePanel',
                        'currentTimeDisplay',
                        'timeDivider',
                        'durationDisplay',
                        'progressControl',
                        'playbackRateMenuButton',
                        'fullscreenToggle',
                        'qualitySelector'
                    ]
                },
                sources: [
                    {
                        src: this.url.auto.url,
                        label: this.url.auto.quality
                    },
                ]
            });

            this.display()

        }
    },
    methods: {
        filterFilter(obj, exp) {
            return obj.filter((item) => item[Object.keys(exp)[0]] == Object.values(exp)[0])
        },
        display() {
            const innerThis = this;
            innerThis.video.qualityLevels();
            innerThis.video.on('ready', function () {
                innerThis.video.hlsQualitySelector({
                    displayCurrentQuality: true,
                    displayCurrentResolution: true,
                });
            })

            innerThis.video.on('error', (err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>