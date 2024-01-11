export default defineNuxtConfig({
  modules: ["@nuxt/test-utils/module", "nuxt-primevue", "@nuxtjs/i18n", "@nuxt/image"],
  css: [
    "primevue/resources/themes/lara-dark-blue/theme.css",
    "bootstrap/dist/css/bootstrap-grid.css",
    "bootstrap/dist/css/bootstrap-utilities.css",
    "@fortawesome/fontawesome-free/css/all.css",
    "./assets/scss/custom.scss",
  ],
  primevue: {
    components: {
      prefix: "VuePrime",
      include: ["Button"],
    },
    directives: {
      prefix: "p-",
      include: ["Tooltip", "Ripple"],
    },
    composables: { include: [] },
    options: { ripple: true },
  },
  i18n: { vueI18n: "./modules/i18n/i18n.config.ts" },
  devtools: { enabled: true },
});