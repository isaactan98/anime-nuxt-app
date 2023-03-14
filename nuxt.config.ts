// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Shadow Anime",
      titleTemplate: "%s - Shadow Garden Anime",
      link: [{ rel: "icon", type: "image/x-icon", href: "/delta_icon.png" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Full list of the Most Popular and Must Watch Anime Online Free, with SUBBED and DUBBED. WATCH NOW!",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Shadow Anime - Shadow Garden Anime",
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
      ],
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
      apiUrlV1: process.env.NUXT_PUBLIC_API_URL_V1
    },
  },
});
