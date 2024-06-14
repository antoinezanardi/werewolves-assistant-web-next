import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";

import App from "@/app.vue";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

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

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = {
      title: "shared.werewolvesAssistant",
      meta: [
        { name: "application-name", content: "shared.werewolvesAssistant" },
        { name: "creator", content: "Antoine ZANARDI" },
        { name: "description", content: "components.App.seoDescription" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "charset", content: "utf-8" },
        { name: "generator", content: "nuxt" },
        { name: "color-scheme", content: "dark" },
      ],
    };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  it("should fetch and set roles from store when rendered.", () => {
    const rolesStore = useRolesStore();

    expect(rolesStore.fetchAndSetRoles).toHaveBeenCalledExactlyOnceWith();
  });
});