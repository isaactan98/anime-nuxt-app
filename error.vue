<template>
    <div class="bg-slate-900">
        <!-- generate error page -->
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="text-9xl font-bold text-gray-400 mb-10">404</div>
            <div class="text-2xl font-bold text-gray-400">Page not found</div>
        </div>
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

<style>

</style>