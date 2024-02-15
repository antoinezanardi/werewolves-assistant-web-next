import type { mount } from "@vue/test-utils";

import App from "@/app.vue";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("App Component", () => {
  let wrapper: ReturnType<typeof mount<typeof App>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(App);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render component without shallow and match snapshot when rendered.", async() => {
    wrapper = await mountSuspendedComponent(App, { shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should fetch and set roles from store when rendered.", () => {
    const rolesStore = useRolesStore();

    expect(rolesStore.fetchAndSetRoles).toHaveBeenCalledWith();
  });
});