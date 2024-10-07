import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import DefaultOgImage from "~/components/OgImage/DefaultOgImage.vue";

describe("Default Og Image Component", () => {
  let wrapper: ReturnType<typeof mount<typeof DefaultOgImage>>;

  async function mountDefaultOgImageComponent(options: ComponentMountingOptions<typeof DefaultOgImage> = {}):
  Promise<ReturnType<typeof mount<typeof DefaultOgImage>>> {
    return mountSuspendedComponent(DefaultOgImage, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountDefaultOgImageComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});