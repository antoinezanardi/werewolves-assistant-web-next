import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyGroupOrganizerContent from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerContent.vue";

describe("Game Lobby Group Organizer Content Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizerContent>>;

  async function mountGameLobbyGroupOrganizerContentComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizerContent> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizerContent>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizerContent, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyGroupOrganizerContentComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});