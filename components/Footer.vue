<template>
    <!-- This is an example component -->
    <div class=" bg-gray-800 rounded-lg mx-auto">
        <div class="max-w-2xl mx-auto text-white py-5 ">
            <div class="mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Shadow Anime <span id="year"></span> </p>
                <div class="order-1 md:order-2">
                    <NuxtLink to="about"><span class="px-2">About us</span></NuxtLink>
                    <span class="px-2 border-l">Contact us</span>
                    <span class="px-2 border-l">Privacy Policy</span>
                </div>
            </div>
        </div>
        <div class="text-xs text-zinc-400 container mx-auto py-5 px-5 text-center">
            This project is a non-profit project. All the content is provided by the third party. We do not own any
            of the content.
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        document.getElementById('year').innerHTML = new Date().getFullYear();
    }
}
</script>

<style>

</style>