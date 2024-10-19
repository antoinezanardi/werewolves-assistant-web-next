import VanillaTilt from "vanilla-tilt";
import type { DirectiveBinding } from "vue";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("tilt", {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      if (binding.value === false) {
        return;
      }
      VanillaTilt.init(el, {
        "reverse": true,
        "glare": true,
        "scale": 1.1,
        "max-glare": 0.3,
        ...binding.value as DirectiveBinding,
      });
    },
  });
});