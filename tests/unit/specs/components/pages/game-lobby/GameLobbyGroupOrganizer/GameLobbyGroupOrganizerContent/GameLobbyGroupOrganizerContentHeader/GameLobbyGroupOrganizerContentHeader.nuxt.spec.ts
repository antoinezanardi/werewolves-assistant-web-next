import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameLobbyGroupOrganizerContentHeader from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerContentHeader/GameLobbyGroupOrganizerContentHeader.vue";

describe("Game Lobby Group Organizer Content Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizerContentHeader>>;

  async function mountGameLobbyGroupOrganizerContentHeaderComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizerContentHeader> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizerContentHeader>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizerContentHeader, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyGroupOrganizerContentHeaderComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Header", () => {
    it("should translate header when rendered.", () => {
      const header = wrapper.find<HTMLHeadElement>("#game-lobby-group-organize-content-header");

      expect(header.text()).toBe("Place players in groups below to play with the Prejudiced Manipulator");
    });
  });

  describe("SubHeader", () => {
    it("should translate subheader when rendered.", () => {
      const subHeader = wrapper.find<HTMLHeadElement>("#game-lobby-group-organize-content-subheader");

      expect(subHeader.text()).toBe("You can rename the groups by clicking on the name");
    });
  });
});