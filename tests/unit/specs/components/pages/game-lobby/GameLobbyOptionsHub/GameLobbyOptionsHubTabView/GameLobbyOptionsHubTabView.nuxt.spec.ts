import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubTabView from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubTabView.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Options Hub Tab View Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubTabView>>;

  async function mountGameLobbyOptionsHubTabViewComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubTabView> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubTabView>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubTabView, {
      shallow: false,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubTabViewComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Tab Panel", () => {
    it("should translate role tab panel title when rendered.", () => {
      const roleTabPanel = wrapper.find<HTMLHeadElement>("#roles-tab-header-text");

      expect(roleTabPanel.text()).toBe("Roles");
    });
  });

  describe("Composition Tab Panel", () => {
    it("should translate composition tab panel title when rendered.", () => {
      const compositionTabPanel = wrapper.find<HTMLHeadElement>("#composition-tab-header-text");

      expect(compositionTabPanel.text()).toBe("Composition");
    });
  });

  describe("Votes Tab Panel", () => {
    it("should translate votes tab panel title when rendered.", () => {
      const votesTabPanel = wrapper.find<HTMLHeadElement>("#votes-tab-header-text");

      expect(votesTabPanel.text()).toBe("Votes");
    });
  });
});