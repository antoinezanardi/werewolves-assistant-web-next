import type { mount } from "@vue/test-utils";

import App from "@/app.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("App Component", () => {
  let wrapper: ReturnType<typeof mount<typeof App>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(App);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});