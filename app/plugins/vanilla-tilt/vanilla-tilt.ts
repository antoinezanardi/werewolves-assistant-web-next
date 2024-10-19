import VanillaTilt from "vanilla-tilt";
import type { TiltOptions } from "vanilla-tilt";
import type { DirectiveBinding } from "vue";

import { useDevice } from "~/composables/misc/useDevice";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("tilt", {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const { isOnTouchDevice } = useDevice();
      if (binding.value === false || isOnTouchDevice.value) {
        return;
      }
      const tiltOptions = typeof binding.value === "object" ? binding.value as TiltOptions : {};
      VanillaTilt.init(el, {
        "reverse": true,
        "glare": true,
        "scale": 1.1,
        "max-glare": 0.3,
        ...tiltOptions,
      });
    },
  });
});