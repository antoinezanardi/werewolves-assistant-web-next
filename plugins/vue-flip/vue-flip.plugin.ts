import { VueFlip } from "vue-flip";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component("VueFlip", VueFlip);
});