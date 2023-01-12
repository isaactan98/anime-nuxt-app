<template>
    <div class="">
        <video ref="videoPlayer" class="video-js" id="video_player">
            <track kind="captions" :src="subtitle.url" srclang="en" label="English" default />
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

            this.url[1080].url = source[0].url
            this.url[720].url = source[1].url
            this.url[360].url = source[2].url
            this.url.auto.url = source[3].url

            var subtitle = { ...details.subtitles[0] }

            this.subtitle = subtitle.url ?? ''

            this.video = videojs('video_player', {
                html5: {
                    hls: {
                        withCredentials: true,
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
            }, () => {
                this.video.log('onPlayerReady', this);
            });
        }
    },
    beforeDestroy() {
        if (this.video) {
            this.video.dispose();
        }
    }
}
</script>

<style>

</style>