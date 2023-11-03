<template>
    <div class="min-h-screen grid grid-cols-2 gap-3">
        <div v-for="anime in animeList" :key="anime">
            <img :src="anime.coverImage" alt="">
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            anifyUrl: "",
            animeList: [] as any[]
        }
    },
    mounted() {
        fetch(this.anifyUrl + "eminence").then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res.length > 0) {
                this.animeList = res
            }
        }).catch(err => {
            console.log(err)
        })
    }
}
</script>