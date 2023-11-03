<template>
    <div class="bg-slate-900">
        <!-- generate error page -->
        <main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <lottie-player src="https://lottie.host/3e800da4-0f90-445b-a99e-2f71edb41c1a/LhiojQCMle.json" background="##FFFFFF" speed="1" style="width: 300px; height: 300px" loop autoplay direction="1" mode="normal"></lottie-player>
            <button class="mt-5">
                <a class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                    href="/">
                    <span
                        class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                    <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        Go Home...
                    </span>
                </a>
            </button>
        </main>
    </div>
</template>

<script>
export default {
    mounted() {
        useHead({
            title: '404 - Page not found',
            meta: [
                {
                    name: 'description',
                    content: 'Page not found'
                }
            ]
        })
    }
}
</script>

<style></style>