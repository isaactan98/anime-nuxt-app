// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Shadow Anime - Shadow Garden",
      titleTemplate: "%s - Shadow Garden",
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
          content: "Anime Nuxt App - ANA",
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
            "https://img.zorores.com/_r/300x400/100/bc/a4/bca4a71e271a30fb1b44d33d56db8f8f/bca4a71e271a30fb1b44d33d56db8f8f.jpg",
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
    },
  },
});
