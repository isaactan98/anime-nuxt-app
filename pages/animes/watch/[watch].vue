<template>
    <div>
        <!-- video player -->
        <VideoPlayer v-if="video" :videoDetails="video"></VideoPlayer>
        <div v-else class="text-white">
            Loading...
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            video: null
        }
    },
    mounted() {
        const route = useRoute();
        const config = useRuntimeConfig();
        var id = route.params.watch;

        fetch(`${config.apiUrl2}watch?episodeId=${id}`)
            .then(res => {
                // console.log('res', res)
                return res.json()
            })
            .then(data => {
                // console.log('data', JSON.parse(JSON.stringify(data)))
                // unproxy data 
                this.video = JSON.parse(JSON.stringify(data));
                console.log('video', this.video)
            }).catch(err => console.log(err))

    },
}
</script>

<style>

</style>