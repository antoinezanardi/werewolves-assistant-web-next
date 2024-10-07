import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import { Vue3Lottie } from "vue3-lottie";
import VueDraggable from "vuedraggable";
import VueCountdown from "@chenfengyuan/vue-countdown";
import VueEllipseProgress from "vue-ellipse-progress";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { clone, construct, crush } from "radash";

import { GlowCapture } from "#components";

function getDefaultMountingOptions<T>(): ComponentMountingOptions<T> {
  return {
    shallow: true,
    global: {
      directives: { PTooltip: Tooltip },
      components: {
        VueLottie: Vue3Lottie,
        VueDraggable,
        VueCountdown,
        VueEllipseProgress,
        GlowCapture,
        FontAwesomeIcon,
      },
    },
  };
}

function computeComponentMountingOptions<T>(options: ComponentMountingOptions<T>): ComponentMountingOptions<T> {
  const clonedOptions = clone(options);
  const plugins = clonedOptions.global?.plugins ?? [createTestingPinia()];
  plugins.push(ConfirmationService);
  if (clonedOptions.global?.plugins) {
    clonedOptions.global.plugins = undefined;
  }
  const defaultMountingOptions = getDefaultMountingOptions<T>();
  const mergedOptions = construct({
    ...crush(defaultMountingOptions),
    ...crush(options),
  }) as ComponentMountingOptions<T>;
  mergedOptions.props = options.props;
  if (mergedOptions.global) {
    mergedOptions.global.plugins = plugins;
  }
  return mergedOptions;
}

async function mountSuspendedComponent<T>(component: T, options: ComponentMountingOptions<T> = {}): Promise<ReturnType<typeof mount<T>>> {
  const mergedOptions = computeComponentMountingOptions(options);

  return mountSuspended(component, mergedOptions);
}

function mountComponent<T>(component: T, options: ComponentMountingOptions<T> = {}): ReturnType<typeof mount<T>> {
  const mergedOptions = computeComponentMountingOptions(options);

  return mount(component, mergedOptions) as ReturnType<typeof mount<T>>;
}

export {
  mountComponent,
  mountSuspendedComponent,
};