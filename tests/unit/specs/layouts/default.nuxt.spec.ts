import type { mount } from "@vue/test-utils";

import Default from "~/layouts/default.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Default Layout", () => {
  let wrapper: ReturnType<typeof mount<typeof Default>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(Default);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});