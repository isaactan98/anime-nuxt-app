<template>
    <div class="min-h-screen container mx-auto px-5 mt-5 relative">
        <div v-if="list.length > 0" class="grid grid-cols-2 gap-5">
            <button v-for="(item, index) in list" :key="index" class="" @click="getVideo(item.id)">
                <div class="min-w-[220px] lg:min-w-[380px]">
                    <img :src="item.img" loading="lazy" alt=""
                        class="rounded-xl object-cover w-56 lg:w-96 h-72 lg:h-[32rem]">
                    <!-- <div class="bg-white p-10"></div> -->
                </div>
            </button>
        </div>
        <div v-if="hanime.episodes.length > 0" class="mx-auto min-h-screen w-full bg-black absolute top-0">
            <iframe :src="hanime.episodes" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            configs: null as any,
            list: [] as any,
            hanime: {
                id: null as any,
                img: null as any,
                title: null as any,
                episodes: [] as any,
            }
        }
    },
    mounted() {
        this.configs = useRuntimeConfig();
        this.mainPage();
    },
    methods: {
        async mainPage() {
            const url = this.configs.public.corsApi + this.configs.public.hanimeApi;
            await fetch(url).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                this.list = data;
            }).catch(err => {
                console.log(err);
            })
        },
        async getVideo(slug: string) {
            const url = this.configs.public.corsApi + this.configs.public.hanimeApi + "info/" + slug;
            await fetch(url).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                this.hanime.id = data.id;
                this.hanime.img = data.img;
                this.hanime.title = data.title;
                this.hanime.episodes = data.episodes;
                this.getSteam(data.id, data.episodes[0]);
            }).catch(err => {
                console.log(err);
            })
        },
        async getSteam(id: string, slug: string) {
            console.log(id, slug);
            const url = this.configs.public.corsApi + this.configs.public.hanimeApi + "video/" + id + '/' + slug;
            console.log(url);
            await fetch(url).then(res => {
                return res.json();
            }).then(data => {
                this.hanime.episodes = data[0].player;
                console.log(this.hanime);
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>