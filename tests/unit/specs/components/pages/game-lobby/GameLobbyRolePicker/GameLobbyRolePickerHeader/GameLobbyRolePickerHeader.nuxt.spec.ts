import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameLobbyRolePickerHeaderProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/game-lobby-role-picker-header.types";
import GameLobbyRolePickerHeader from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/GameLobbyRolePickerHeader.vue";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerHeader>>;
  const defaultProps: GameLobbyRolePickerHeaderProps = {
    player: createFakeCreateGamePlayerDto({
      name: "Toto",
      role: { name: "werewolf" },
    }),
  };

  async function mountGameLobbyRolePickerHeaderComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerHeader> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerHeader>>> {
    return mountSuspendedComponent(GameLobbyRolePickerHeader, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerHeaderComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Current Role", () => {
    it("should translate current role title when rendered.", () => {
      const currentRoleTitle = wrapper.find<HTMLSpanElement>("#current-role-title");

      expect(currentRoleTitle.text()).toBe("components.GameLobbyRolePickerHeader.currentRole");
    });

    it("should translate current role when rendered.", () => {
      const currentRole = wrapper.find<HTMLSpanElement>("#current-role-text");

      expect(currentRole.text()).toBe("shared.role.name.werewolf");
    });

    it("should translate no role text when player doesn't have any role yet.", async() => {
      wrapper = await mountGameLobbyRolePickerHeaderComponent({ props: { player: createFakeCreateGamePlayerDto({ name: "Toto" }) } });
      const currentRole = wrapper.find<HTMLSpanElement>("#current-role-text");

      expect(currentRole.text()).toBe("components.GameLobbyRolePickerHeader.noRole");
    });
  });

  describe("Title", () => {
    it("should translate title when rendered.", () => {
      const title = wrapper.find<HTMLHeadingElement>("#role-picker-header-title");

      expect(title.text()).toBe("components.GameLobbyRolePickerHeader.pickRoleForPlayer, {\"playerName\":\"Toto\"}");
    });
  });
});