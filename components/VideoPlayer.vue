<template>
    <div class="">
        <video ref="videoPlayer" class="video-js" id="video_player">
        </video>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

export default {
    props: ['videoDetails'],
    data() {
        return {
            video: null,
            url: {
                1080: { url: "", quality: "1080p" },
                720: { url: "", quality: "720p" },
                360: { url: "", quality: "360p" },
                auto: { url: "", quality: "auto" }
            },
            subtitle: ""
        }
    },
    mounted() {
        const details = { ...this.videoDetails }

        if (this.videoDetails.sources) {
            var source = details.sources

            console.log(source)

            this.url[1080].url = this.filterFilter(source, { quality: "1080p" })[0].url
            this.url[720].url = this.filterFilter(source, { quality: "720p" })[0].url
            this.url[360].url = this.filterFilter(source, { quality: "360p" })[0].url
            this.url.auto.url = this.filterFilter(source, { quality: "default" })[0].url

            this.video = videojs('video_player', {
                html5: {
                    hls: {
                        nativeTextTracks: true
                    }
                },
                controls: true,
                autoplay: false,
                preload: 'auto',
                fluid: true,
                sources: [
                    {
                        src: this.url[1080].url,
                        label: this.url[1080].quality
                    },
                    {
                        src: this.url[720].url,
                        label: this.url[720].quality
                    },
                    {
                        src: this.url[360].url,
                        label: this.url[360].quality
                    },
                    {
                        src: this.url.auto.url,
                        label: this.url.auto.quality
                    },
                ],
            });

            this.video.on('error', (err) => {
                console.log(err)
            })
        }
    },
    beforeDestroy() {
        if (this.video) {
            this.video.dispose();
        }
    },
    methods: {
        filterFilter(obj, exp) {
            return obj.filter((item) => item[Object.keys(exp)[0]] == Object.values(exp)[0])
        }
    }
}
</script>

<style>

</style>