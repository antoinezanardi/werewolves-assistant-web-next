import { mountSuspended } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Tooltip from "primevue/tooltip";
import { clone, construct, crush } from "radash";

async function mountSuspendedComponent<T>(component: T, options: ComponentMountingOptions<typeof component> = {}): Promise<ReturnType<typeof mount<T>>> {
  const clonedOptions = clone(options);
  const plugins = clonedOptions.global?.plugins ?? [createTestingPinia()];
  if (clonedOptions.global?.plugins) {
    clonedOptions.global.plugins = undefined;
  }
  const defaultMountingOptions: ComponentMountingOptions<typeof component> = {
    shallow: true,
    global: { directives: { PTooltip: Tooltip } },
  };
  const mergedOptions = construct({
    ...crush(defaultMountingOptions),
    ...crush(options),
  }) as ComponentMountingOptions<typeof component>;
  mergedOptions.props = options.props;
  if (mergedOptions.global) {
    mergedOptions.global.plugins = plugins;
  }
  return mountSuspended(component, mergedOptions);
}

export { mountSuspendedComponent };