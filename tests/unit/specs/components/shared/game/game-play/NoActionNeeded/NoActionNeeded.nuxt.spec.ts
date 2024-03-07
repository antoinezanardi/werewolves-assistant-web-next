import type { mount } from "@vue/test-utils";

import NoActionNeeded from "~/components/shared/game/game-play/NoNeededAction/NoActionNeeded.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("No Action Needed Component", () => {
  let wrapper: ReturnType<typeof mount<typeof NoActionNeeded>>;

  async function mountNoActionNeededComponent(): Promise<ReturnType<typeof mount<typeof NoActionNeeded>>> {
    return mountSuspendedComponent(NoActionNeeded);
  }

  beforeEach(async() => {
    wrapper = await mountNoActionNeededComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Message", () => {
    it("should translate no action needed message when rendered.", () => {
      const message = wrapper.find<HTMLHeadingElement>("#no-action-needed-message");

      expect(message.text()).toBe("No action needed, the game can proceed");
    });
  });
});