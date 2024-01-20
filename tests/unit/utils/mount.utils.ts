import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { construct, crush } from "radash";
import Tooltip from "primevue/tooltip";

async function mountSuspendedComponent<T>(component: T, options: ComponentMountingOptions<typeof component> = {}): Promise<ReturnType<typeof mount<T>>> {
  const defaultMountingOptions: ComponentMountingOptions<typeof component> = {
    shallow: true,
    global: { directives: { PTooltip: Tooltip } },
  };
  const mergedOptions = construct({
    ...crush(defaultMountingOptions),
    ...crush(options),
  }) as ComponentMountingOptions<typeof component>;
  return mountSuspended(component, mergedOptions);
}

export { mountSuspendedComponent };