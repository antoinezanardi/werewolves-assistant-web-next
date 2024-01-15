export default defineNuxtConfig({
  css: [
    "primevue/resources/themes/lara-dark-blue/theme.css",
    "bootstrap/dist/css/bootstrap-grid.css",
    "bootstrap/dist/css/bootstrap-utilities.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "./assets/scss/custom.scss",
  ],
  devtools: { enabled: true },
  i18n: { vueI18n: "./modules/i18n/i18n.config.ts" },
  modules: [
    "@nuxt/test-utils/module",
    "nuxt-primevue",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  pinia: { storesDirs: ["./stores/**"] },
  primevue: {
    components: {
      prefix: "VuePrime",
      include: [
        "Button",
        "Divider",
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