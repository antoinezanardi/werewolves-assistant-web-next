import type { mount } from "@vue/test-utils";

import Default from "~/layouts/default.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Default Layout", () => {
  let wrapper: ReturnType<typeof mount<typeof Default>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(Default);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});