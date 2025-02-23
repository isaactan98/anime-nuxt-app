import {vite as vidstack} from 'vidstack/plugins'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-02-21",
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@vite-pwa/nuxt'],
    app: {
        head: {
            title: "Shadow Anime",
            titleTemplate: "%s - Shadow Anime",
            link: [
                {rel: "icon", type: "image/x-icon", href: "/delta_icon.png"},
                {rel: "manifest", href: "/manifest.json"},
            ],
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width; initial-scale=1; viewport-fit=cover"},
                {name: "theme-color", content: "#0d0d12"},
                {
                    hid: "description",
                    name: "description",
                    content:
                        "Full list of the Most Popular and Must Watch Anime Online Free, with SUBBED and DUBBED. WATCH NOW!",
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: "Shadow Anime - Shadow Anime",
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content:
                        "Full list of the Most Popular and Must Watch Anime Online Free, with SUBBED and DUBBED. WATCH NOW!",
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content:
                        "https://static.wikia.nocookie.net/to-be-a-power-in-the-shadows/images/f/f7/Shadow-Garden-Anime.jpg/revision/latest?cb=20221031135138",
                },
                {
                    hid: "robots",
                    name: "robots",
                    content: "index, follow",
                },
                {
                    hid: "mobile-web-app-capable",
                    name: "mobile-web-app-capable",
                    content: "yes",
                },
                {
                    hid: "apple-mobile-web-app-capable",
                    name: "apple-mobile-web-app-capable",
                    content: "yes",
                },
                {
                    hid: "apple-mobile-web-app-status-bar-style",
                    name: "apple-mobile-web-app-status-bar-style",
                    content: "black-translucent",
                }
            ],
            script: [
                {src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"}
            ]
        }
    },
    runtimeConfig: {
        public: {
            api: `${process.env.NUXT_PUBLIC_API}`,
            apiUrl: `${process.env.NUXT_PUBLIC_API}anime/zoro/`,
        }
    },
    pwa: {
        manifest: {
            display: "standalone",
            name: "Shadow Anime",
            short_name: "Shadow Anime",
            description: "Shadow Anime - Home of Anime",
            lang: "en",
            theme_color: "#0d0d12",
            background_color: "#0d0d12",
            start_url: "/",
            icons: [
                {
                    src: "/delta_icon.png",
                    sizes: "400x400",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/delta_icon520.png",
                    sizes: "520x520",
                    type: "image/png",
                    purpose: "any"
                },
                {
                    src: "/delta_icon512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any"
                }
            ],
        }
    },
    vue: {
        compilerOptions: {
            isCustomElement: tag => tag.startsWith('media-') || tag == 'Analytics',
        }
    },
    vite: {
        plugins: [vidstack()]
    },
    colorMode: {
        preference: 'dark',
        fallback: 'dark'
    },
    ui: {
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 bottom-[unset]'
        }
    }
})