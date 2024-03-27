import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameLobbyRolePickerDescriptionBoundariesProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionBoundaries/game-lobby-role-picker-description-boundaries.types";
import GameLobbyRolePickerDescriptionBoundaries from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescriptionContent/GameLobbyRolePickerDescriptionBoundaries/GameLobbyRolePickerDescriptionBoundaries.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mockPiniaStore } from "~/tests/unit/utils/helpers/mock.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Description Boundaries Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerDescriptionBoundaries>>;
  const defaultProps: GameLobbyRolePickerDescriptionBoundariesProps = {
    pickedRole: createFakeRole({
      name: "werewolf",
      recommendedMinPlayers: 5,
      minInGame: 1,
      maxInGame: 3,
    }),
  };

  async function mountGameLobbyRolePickerDescriptionBoundariesComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerDescriptionBoundaries> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerDescriptionBoundaries>>> {
    return mountSuspendedComponent(
      GameLobbyRolePickerDescriptionBoundaries,
      {
        props: defaultProps,
        ...options,
      },
    );
  }

  beforeEach(async() => {
    const pinia = createTestingPinia();
    const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
    createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
    ]);
    wrapper = await mountGameLobbyRolePickerDescriptionBoundariesComponent({ global: { plugins: [pinia] } });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role count", () => {
    it("should translate role count in create game dto when rendered.", () => {
      const roleCount = wrapper.find("#role-count-in-party");

      expect(roleCount.text()).toBe("components.GameLobbyRolePickerDescriptionBoundaries.roleCountInParty, {\"count\":2}");
    });
  });

  describe("Role max reached", () => {
    it("should render role max reached when max is reached in create game dto.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.isRoleMaxReachedInCreateGameDto.mockReturnValue(true);
      wrapper = await mountGameLobbyRolePickerDescriptionBoundariesComponent({ global: { plugins: [pinia] } });
      const roleMaxReached = wrapper.find("#role-count-max-reached");

      expect(roleMaxReached.text()).toBe("(components.GameLobbyRolePickerDescriptionBoundaries.roleCountMaxReached)");
    });

    it("should not render role max reached when max is not reached in create game dto.", () => {
      const roleMaxReached = wrapper.find("#role-count-max-reached");

      expect(roleMaxReached.exists()).toBeFalsy();
    });
  });

  describe("Recommended min players", () => {
    it("should render recommended min players when role has recommended min players.", () => {
      const recommendedMinPlayers = wrapper.find("#recommended-role-min-in-game");

      expect(recommendedMinPlayers.text()).toBe("components.GameLobbyRolePickerDescriptionBoundaries.recommendedMinPlayers, {\"count\":5}");
    });

    it("should not render recommended min players when role has no recommended min players.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([
        createFakeCreateGamePlayerDto(),
        createFakeCreateGamePlayerDto(),
      ]);
      wrapper = await mountGameLobbyRolePickerDescriptionBoundariesComponent({
        props: { pickedRole: createFakeRole({ recommendedMinPlayers: undefined }) },
        global: { plugins: [pinia] },
      });
      const recommendedMinPlayers = wrapper.find("#recommended-role-min-in-game");

      expect(recommendedMinPlayers.exists()).toBeFalsy();
    });
  });

  describe("Min in game not reached", () => {
    it("should render min in game not reached when min is not reached in create game dto and there is at least one role already.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(2);
      createGameDtoStore.isRoleMinReachedInCreateGameDto.mockReturnValue(false);
      wrapper = await mountGameLobbyRolePickerDescriptionBoundariesComponent({ global: { plugins: [pinia] } });
      const roleMinNotReached = wrapper.find("#min-in-game-not-reached");

      expect(roleMinNotReached.text()).toBe("components.GameLobbyRolePickerDescriptionBoundaries.minInGameNotReached, {\"count\":2}");
    });

    it("should not render min in game not reached when min is reached in create game dto.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(2);
      createGameDtoStore.isRoleMinReachedInCreateGameDto.mockReturnValue(true);
      wrapper = await mountGameLobbyRolePickerDescriptionBoundariesComponent({ global: { plugins: [pinia] } });
      const roleMinNotReached = wrapper.find("#min-in-game-not-reached");

      expect(roleMinNotReached.exists()).toBeFalsy();
    });

    it("should not render min in game not reached when there is no role in create game dto.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(2);
      createGameDtoStore.isRoleMinReachedInCreateGameDto.mockReturnValue(false);
      wrapper = await mountGameLobbyRolePickerDescriptionBoundariesComponent({ global: { plugins: [pinia] } });
      const roleMinNotReached = wrapper.find("#min-in-game-not-reached");

      expect(roleMinNotReached.exists()).toBeFalsy();
    });
  });
});