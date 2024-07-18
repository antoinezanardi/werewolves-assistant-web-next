import VueEllipseProgress from "vue-ellipse-progress";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueEllipseProgress, "VueEllipseProgress");
});