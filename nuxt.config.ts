export default defineNuxtConfig({
  app: { head: { link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }] } },
  css: [
    "primevue/resources/themes/lara-dark-blue/theme.css",
    "bootstrap/dist/css/bootstrap-grid.css",
    "bootstrap/dist/css/bootstrap-utilities.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "./assets/scss/custom.scss",
  ],
  devtools: { enabled: true },
  i18n: { vueI18n: "./modules/i18n/i18n.config.ts" },
  image: { domains: ["antoinezanardi.fr", "appspot.com"] },
  modules: [
    "@nuxt/test-utils/module",
    "nuxt-primevue",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  pinia: { storesDirs: [] },
  primevue: {
    components: {
      prefix: "VuePrime",
      include: [
        "Button",
        "Divider",
        "Menu",
      ],
    },
    directives: {
      prefix: "p-",
      include: [
        "Tooltip",
        "Ripple",
      ],
    },
    composables: { include: [] },
    options: { ripple: true },
  },
  runtimeConfig: { public: { werewolvesAssistantApi: { baseUrl: "" } } },
  typescript: {
    strict: true,
    typeCheck: true,
  },
});