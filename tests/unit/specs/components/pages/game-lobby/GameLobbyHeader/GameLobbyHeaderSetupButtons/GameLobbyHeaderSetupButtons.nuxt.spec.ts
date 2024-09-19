import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { getError } from "@tests/unit/utils/helpers/exception.helpers";
import { flushPromises, type mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";
import type { Ref } from "vue";
import type { GameLobbyHeaderSetupButtonsExposed } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/game-lobby-header-setup-buttons.types";
import type GameLobbyHeaderAdditionalCardsManagerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderAdditionalCardsManagerButton/GameLobbyHeaderAdditionalCardsManagerButton.vue";
import type GameLobbyHeaderGroupOrganizerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderGroupOrganizerButton/GameLobbyHeaderGroupOrganizerButton.vue";
import type GameLobbyHeaderOptionsButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";
import type GameLobbyHeaderPositionCoordinatorButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/GameLobbyHeaderPositionCoordinatorButton.vue";
import GameLobbyHeaderSetupButtons from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderSetupButtons.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const hoistedMocks = vi.hoisted(() => ({
  useAnimateCss: { animateElementOnce: vi.fn() },
}));

vi.mock("~/composables/animate-css/useAnimateCss", () => ({
  useAnimateCss: (): typeof hoistedMocks.useAnimateCss => hoistedMocks.useAnimateCss,
}));

describe("Game Lobby Header Setup Buttons Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "seer" }) }),
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }) }),
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "prejudiced-manipulator" }) }),
    ],
  });
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderSetupButtons>>;
  const testingPinia = {
    initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } },
    stubActions: false,
  };

  async function mountGameLobbyHeaderSetupButtonsComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderSetupButtons> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderSetupButtons>>> {
    return mountSuspendedComponent(GameLobbyHeaderSetupButtons, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: { ButtonGroup: false },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyHeaderSetupButtonsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Options Button", () => {
    it("should emit 'gameOptionsButtonClick' event when clicked.", () => {
      const optionsButton = wrapper.findComponent<typeof GameLobbyHeaderOptionsButton>("#game-lobby-header-options-button");
      (optionsButton.vm as VueVm).$emit("gameOptionsButtonClick");

      expect(wrapper.emitted("gameOptionsButtonClick")).toBeTruthy();
    });

    it("should throw error when highlightOptionsButton method is called but component is not defined.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyHeaderOptionsButton: Ref }).gameLobbyHeaderOptionsButton.value = null;
      await getError(() => (wrapper.vm as unknown as GameLobbyHeaderSetupButtonsExposed).highlightGameOptionsButton());

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Header Options Button is not defined");
    });

    it("should highlight options button when method is called from parent component.", async() => {
      (wrapper.vm as unknown as GameLobbyHeaderSetupButtonsExposed).highlightGameOptionsButton();
      await flushPromises();

      expect(hoistedMocks.useAnimateCss.animateElementOnce).toHaveBeenCalledExactlyOnceWith(expect.anything(), "heartBeat");
    });
  });

  describe("Position Coordinator", () => {
    it("should not render position coordinator button when there are not enough players in game.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "seer" }) })],
      });
      await nextTick();
      const positionCoordinatorButton = wrapper.findComponent<typeof GameLobbyHeaderPositionCoordinatorButton>("#game-lobby-header-position-coordinator-button");

      expect(positionCoordinatorButton.exists()).toBeFalsy();
    });

    it("should emit 'positionCoordinatorButtonClick' event when clicked.", () => {
      const positionCoordinatorButton = wrapper.findComponent<typeof GameLobbyHeaderPositionCoordinatorButton>("#game-lobby-header-position-coordinator-button");
      (positionCoordinatorButton.vm as VueVm).$emit("positionCoordinatorButtonClick");

      expect(wrapper.emitted("positionCoordinatorButtonClick")).toBeTruthy();
    });

    it("should throw error when highlightPositionCoordinatorButton method is called but component is not defined.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyHeaderPositionCoordinatorButton: Ref }).gameLobbyHeaderPositionCoordinatorButton.value = null;
      await getError(() => (wrapper.vm as unknown as GameLobbyHeaderSetupButtonsExposed).highlightPositionCoordinatorButton());

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Header Position Coordinator Button is not defined");
    });

    it("should highlight position coordinator button when method is called from parent component.", async() => {
      (wrapper.vm as unknown as GameLobbyHeaderSetupButtonsExposed).highlightPositionCoordinatorButton();
      await flushPromises();

      expect(hoistedMocks.useAnimateCss.animateElementOnce).toHaveBeenCalledExactlyOnceWith(expect.anything(), "heartBeat");
    });
  });

  describe("Additional Cards Manager Button", () => {
    it("should not render additional cards manager button when there are no thief not actor.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "seer" }) })],
      });
      await nextTick();
      const additionalCardsManagerButton = wrapper.findComponent<typeof GameLobbyHeaderAdditionalCardsManagerButton>("#game-lobby-header-additional-cards-manager-button");

      expect(additionalCardsManagerButton.exists()).toBeFalsy();
    });

    it("should emit 'additionalCardsManagerButtonClick' event when clicked.", () => {
      const additionalCardsManagerButton = wrapper.findComponent<typeof GameLobbyHeaderAdditionalCardsManagerButton>("#game-lobby-header-additional-cards-manager-button");
      (additionalCardsManagerButton.vm as VueVm).$emit("additionalCardsManagerButtonClick");

      expect(wrapper.emitted("additionalCardsManagerButtonClick")).toBeTruthy();
    });

    it("should throw error when highlightAdditionalCardsManagerButton method is called but component is not defined.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyHeaderAdditionalCardsManagerButton: Ref }).gameLobbyHeaderAdditionalCardsManagerButton.value = null;
      await getError(() => (wrapper.vm as unknown as GameLobbyHeaderSetupButtonsExposed).highlightAdditionalCardsManagerButton());

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Header Additional Cards Manager Button is not defined");
    });

    it("should highlight additional cards manager button when method is called from parent component.", async() => {
      (wrapper.vm as unknown as GameLobbyHeaderSetupButtonsExposed).highlightAdditionalCardsManagerButton();
      await flushPromises();

      expect(hoistedMocks.useAnimateCss.animateElementOnce).toHaveBeenCalledExactlyOnceWith(expect.anything(), "heartBeat");
    });
  });

  describe("Group Organizer", () => {
    it("should not render group organizer button when prejudiced manipulator is not present.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }) })],
      });
      await nextTick();
      const groupOrganizerButton = wrapper.findComponent<typeof GameLobbyHeaderGroupOrganizerButton>("#game-lobby-header-group-organizer-button");

      expect(groupOrganizerButton.exists()).toBeFalsy();
    });

    it("should emit 'groupOrganizerButtonClick' event when clicked.", () => {
      const groupOrganizerButton = wrapper.findComponent<typeof GameLobbyHeaderGroupOrganizerButton>("#game-lobby-header-group-organizer-button");
      (groupOrganizerButton.vm as VueVm).$emit("groupOrganizerButtonClick");

      expect(wrapper.emitted("groupOrganizerButtonClick")).toBeTruthy();
    });
  });
});