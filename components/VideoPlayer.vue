<template>
    <div class="">
        <video ref="videoPlayer" class="video-js" id="video_player"></video>
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
            url: ""
        }
    },
    mounted() {
        const details = { ...this.videoDetails }

        if (this.videoDetails.sources) {
            this.url = { ...details.sources[0] }

            var src = this.url.url ?? 'https://www.w3schools.com/html/mov_bbb.mp4'

            var subtitle = { ...details.subtitles[0] }

            var sub = subtitle.url ?? ''

            this.video = videojs('video_player', {
                controls: true,
                autoplay: false,
                preload: 'auto',
                fluid: true,
                sources: [{
                    src: src,
                }],
                track: [{
                    kind: 'captions',
                    src: sub,
                    srclang: 'en',
                    label: 'English'
                }]
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