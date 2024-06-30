import VueDraggable from "vuedraggable";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component("VueDraggable", VueDraggable);
});