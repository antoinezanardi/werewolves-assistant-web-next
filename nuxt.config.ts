import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "@nuxt/test-utils/module",
    "nuxt-primevue",
  ],
  css: ["primevue/resources/themes/bootstrap4-dark-blue/theme.css"],
  primevue: {
    components: {
      prefix: "VuePrime",
      include: ["Button"],
    },
    directives: {
      prefix: "p-",
      include: ["Tooltip"],
    },
    composables: { include: [] },
  },
  devtools: { enabled: true },
});