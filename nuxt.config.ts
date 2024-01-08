import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxt/test-utils/module"],
  devtools: { enabled: true },
});