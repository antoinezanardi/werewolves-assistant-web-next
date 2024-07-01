import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameLobbyPositionCoordinatorSorterElementProps } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorterElement/game-lobby-position-coordinator-sorter-element.types";
import GameLobbyPositionCoordinatorSorterElement from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorterElement/GameLobbyPositionCoordinatorSorterElement.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

describe("Game Lobby Position Coordinator Sorter Element Component", () => {
  const defaultProps: GameLobbyPositionCoordinatorSorterElementProps = {
    player: createFakeCreateGamePlayerDto({
      name: "Player 1",
      role: { name: "seer" },
    }),
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPositionCoordinatorSorterElement>>;

  async function mountGameLobbyPositionCoordinatorSorterElementComponent(options: ComponentMountingOptions<typeof GameLobbyPositionCoordinatorSorterElement> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyPositionCoordinatorSorterElement>>> {
    return mountSuspendedComponent(GameLobbyPositionCoordinatorSorterElement, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyPositionCoordinatorSorterElementComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Square", () => {
    it("should set background color to square depending on player name when rendered.", () => {
      const playerSquare = wrapper.find<HTMLDivElement>("#position-coordinator-sorter-element-square");

      expect(playerSquare.attributes("style")).toBe("background-color: #daa42b;");
    });
  });

  describe("Role Image", () => {
    it("should set player role name to role image when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#position-coordinator-sorter-element-role-image");

      expect(roleImage.props("roleName")).toBe("seer");
    });
  });

  describe("Player Name", () => {
    it("should set player name to player name text when rendered.", () => {
      const playerName = wrapper.find<HTMLSpanElement>("#position-coordinator-sorter-element-player-name");

      expect(playerName.text()).toBe("Player 1");
    });
  });
});