import type { mount } from "@vue/test-utils";

import App from "@/app.vue";
import * as Store from "~/stores/role/useRolesStore";
import { createFakeUseRoleStore } from "~/tests/unit/utils/factories/stores/role/useRoleStore.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

const useRolesStoreMock = createFakeUseRoleStore();

describe("App Component", () => {
  let wrapper: ReturnType<typeof mount<typeof App>>;

  beforeEach(async() => {
    vi.spyOn(Store, "useRolesStore").mockImplementation(() => useRolesStoreMock);
    wrapper = await mountSuspendedComponent(App);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should fetch and set roles from store when mounted.", () => {
    expect(useRolesStoreMock.fetchAndSetRoles).toHaveBeenCalledWith();
  });
});