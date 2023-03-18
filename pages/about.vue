<template>
    <div class="min-h-screen container mx-auto px-4 mt-5">
        <div class="flex items-center w-full relative text-zinc-400">
            <h1 class="pr-3 text-white">
                <NuxtLink to="/">Home</NuxtLink>
            </h1>
            <h1 class="before:content-['•'] before:text-zinc-400 before:pr-3 before:inline-block">About</h1>
        </div>

        <div class="flex items-center mt-8">
            <h1 class="text-white text-4xl">About Shadow Garden Anime</h1>
            <img src="~/assets/images/7shadow-delta.png" alt="" class="w-1/6 md:hidden">
        </div>
        <!-- generate about me description -->
        <div class="md:flex">
            <div class="md:w-3/4 mt-10">
                <section class="text-zinc-400 mt-5 grid gap-4 text-justify">
                    <h1 class=" text-white">Welcome to our anime streaming platform!</h1>

                    <p>
                        We are a dedicated team of anime enthusiasts who have come together to create a one-stop
                        destination
                        for all things anime. Our platform offers a vast selection of anime series and movies for fans
                        to
                        enjoy.
                    </p>

                    <p>
                        We understand that anime fans have diverse preferences and that's why we strive to offer a wide
                        range of genres and titles to cater to everyone's taste. From classic hits to the latest
                        releases,
                        we've got you covered.
                    </p>

                    <p>
                        Our platform is constantly updated with new content to ensure that our viewers always have
                        something
                        new and exciting to watch. We also have a dedicated team that works hard to provide accurate and
                        up-to-date information about each anime series and movie on our platform.
                    </p>

                    <p>
                        We believe in providing the best streaming experience to our viewers. That's why we have
                        implemented
                        a high-quality streaming service with minimal buffering and interruption. Our platform is also
                        available on multiple devices, including desktop, mobile, and smart TVs, so you can enjoy anime
                        anywhere, anytime.
                    </p>

                    <p>
                        We are committed to providing an inclusive and welcoming community for all anime fans. Our
                        platform
                        promotes a safe and respectful environment for everyone, regardless of their background or
                        beliefs.
                    </p>

                    <p>
                        We would like to thank all our viewers for choosing our platform. We will continue to work hard
                        to
                        bring you the best anime content and streaming experience. If you have any questions or
                        suggestions,
                        please don't hesitate to contact us.
                    </p>
                    <div class="mt-5 text-zinc-400 text-xs">
                        <p>Project is created by <a href="https://isaactan.vercel.app/" target="_blank"
                                class="text-purple-500 underline underline-offset-2">
                                Isaac Tan
                            </a>
                        </p>
                    </div>
                </section>

            </div>
            <div class="mt-5 md:mt-0 md:1/4 flex justify-center">
                <div>
                    <img src="~/assets/images/7shadow-delta.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        useHead({
            title: 'About Shadow Garden Anime',
            meta: [
                {
                    name: 'description',
                    content: 'About Shadow Garden Anime',
                },
            ],
        })
    }
}
</script>

<style>

</style>