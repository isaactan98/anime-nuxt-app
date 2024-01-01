// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vite-pwa/nuxt"],
  app: {
    head: {
      title: "Shadow Anime",
      titleTemplate: "%s - Shadow Anime",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/delta_icon.png" },
        { rel: "manifest", href: "/manifest.json" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width; initial-scale=1; viewport-fit=cover" },
        { name: "theme-color", content: "#0d0d12" },
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
        "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ]
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      apiUrl2: process.env.NUXT_PUBLIC_API_URL2,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessageId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGE_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      apiUrl3: process.env.NUXT_PUBLIC_API_URL3,
      apiUrlV1: process.env.NUXT_PUBLIC_API_URL_V1,
      mangaApi: process.env.NUXT_PUBLIC_MANGA_API,
      newsApi: process.env.NUXT_PUBLIC_NEWS_API,
      corsApi: process.env.NUXT_PUBLIC_CORS_API,
      anifyApi: process.env.NUXT_PUBLIC_ANIFY_API,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag == "lottie-player" || tag.startsWith('media-') || tag == 'SpeedInsights',
    }
  }
});
