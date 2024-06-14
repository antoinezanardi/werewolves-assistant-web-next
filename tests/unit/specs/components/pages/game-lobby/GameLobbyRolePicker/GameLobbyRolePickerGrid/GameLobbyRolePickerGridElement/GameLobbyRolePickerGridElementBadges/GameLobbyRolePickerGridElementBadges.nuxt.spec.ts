import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Badge from "primevue/badge";

import type { GameLobbyRolePickerGridElementBadgesProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElementBadges/game-lobby-role-picker-grid-element-badges.types";
import GameLobbyRolePickerGridElementBadges from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGridElement/GameLobbyRolePickerGridElementBadges/GameLobbyRolePickerGridElementBadges.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mockPiniaStore } from "@tests/unit/utils/helpers/mock.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Game Lobby Role Picker Grid Element Badges Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerGridElementBadges>>;
  const defaultProps: GameLobbyRolePickerGridElementBadgesProps = { role: createFakeRole({ name: "seer" }) };

  async function mountGameLobbyRolePickerGridElementBadgesComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerGridElementBadges>):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerGridElementBadges>>> {
    return mountSuspendedComponent(GameLobbyRolePickerGridElementBadges, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    const pinia = createTestingPinia();
    const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
    createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
    createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
    wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({
      shallow: false,
      global: { plugins: [pinia] },
    });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Count in Party Badge", () => {
    it("should render the count in party badge when there are players with this role.", () => {
      const countInPartyBadge = wrapper.findComponent<Badge>("#role-count-in-game-badge");

      expect(countInPartyBadge.exists()).toBeTruthy();
    });

    it("should assign tooltip to count in party badge when there are players with this role.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#role-count-in-game-badge") };
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({
        global: {
          plugins: [pinia],
          directives,
        },
      });

      expect(tooltip.value).toBe("Total in the party");
    });

    it("should not render the count in party badge when there are no players with this role.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([]);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({ global: { plugins: [pinia] } });
      const countInPartyBadge = wrapper.findComponent<Badge>("#role-count-in-game-badge");

      expect(countInPartyBadge.exists()).toBeFalsy();
    });

    it("should not render the count in party badge when role is not defined.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({
        global: { plugins: [pinia] },
        props: { role: undefined },
      });
      const countInPartyBadge = wrapper.findComponent<Badge>("#role-count-in-game-badge");

      expect(countInPartyBadge.exists()).toBeFalsy();
    });
  });

  describe("Left to Pick Badge", () => {
    it("should render the left to pick badge when there are roles left to pick.", () => {
      const leftToPickBadge = wrapper.findComponent<Badge>("#role-min-count-in-game-badge");

      expect(leftToPickBadge.exists()).toBeTruthy();
    });

    it("should assign tooltip to left to pick badge when there are roles left to pick.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#role-min-count-in-game-badge") };
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({
        global: {
          plugins: [pinia],
          directives,
        },
      });

      expect(tooltip.value).toBe("Minimum in the party not reached (1 left to pick)");
    });

    it("should not render the left to pick badge when there are no roles left to pick.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(0);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({ global: { plugins: [pinia] } });
      const leftToPickBadge = wrapper.findComponent<Badge>("#role-min-count-in-game-badge");

      expect(leftToPickBadge.exists()).toBeFalsy();
    });

    it("should not render the left to pick badge when there are no players with this role.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({ global: { plugins: [pinia] } });
      const leftToPickBadge = wrapper.findComponent<Badge>("#role-min-count-in-game-badge");

      expect(leftToPickBadge.exists()).toBeFalsy();
    });

    it("should not render the left to pick badge when role is not defined.", async() => {
      const pinia = createTestingPinia();
      const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
      createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
      createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
      wrapper = await mountGameLobbyRolePickerGridElementBadgesComponent({
        global: { plugins: [pinia] },
        props: { role: undefined },
      });
      const leftToPickBadge = wrapper.findComponent<Badge>("#role-min-count-in-game-badge");

      expect(leftToPickBadge.exists()).toBeFalsy();
    });
  });
});