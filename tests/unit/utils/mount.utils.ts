import { mountSuspended } from "@nuxt/test-utils/runtime";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

async function mountSuspendedComponent<T>(component: T, options?: ComponentMountingOptions<typeof component>): Promise<ReturnType<typeof mount<T>>> {
  const defaultMountingOptions: ComponentMountingOptions<typeof component> = { shallow: true };
  return mountSuspended(component, {
    ...defaultMountingOptions,
    ...options,
  });
}

export { mountSuspendedComponent };