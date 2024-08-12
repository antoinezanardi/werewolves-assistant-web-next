import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { ConfirmationOptions } from "primevue/confirmationoptions";
import { expect, type Mock, vi } from "vitest";
import type { Ref } from "vue";
import type { GameLobbyStartGameConfirmDialogStep } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/game-lobby-start-game-confirm-dialog.types";
import GameLobbyStartGameConfirmDialog from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialog.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

type GameLobbyStartGameConfirmDialogPrivateVariables = {
  gameLobbyStartGameConfirmDialog: Ref<typeof GameLobbyStartGameConfirmDialog | null>;
  confirmSteps: GameLobbyStartGameConfirmDialogStep[];
  confirmStepIndex: Ref<number>;
  currentConfirmStep: GameLobbyStartGameConfirmDialogStep;
  open: () => void;
  onConfirmStepFromGameLobbyStartGameConfirmDialogContainer: () => void;
  confirmStartGame: () => void;
  onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialogContainer: (rejectCallback: () => void) => void;
};

const hoistedMocks = vi.hoisted(() => ({
  useConfirm: { require: vi.fn() },
}));

vi.mock("primevue/useconfirm", () => ({
  useConfirm: (): { require: Mock } => ({
    require: hoistedMocks.useConfirm.require,
  }),
}));

describe("Game Lobby Start Game Confirm Dialog Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialog>>;
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
    ],
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyStartGameConfirmDialogComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialog> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialog>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialog, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Confirm Steps", () => {
    it("should contain only players ready confirm step when there is no position dependent roles in create game dto.", () => {
      const expectedConfirmSteps: GameLobbyStartGameConfirmDialogStep[] = ["players-ready"];

      expect((wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).confirmSteps).toStrictEqual<GameLobbyStartGameConfirmDialogStep[]>(expectedConfirmSteps);
    });

    it("should contain players ready and players positioned confirm steps when there is position dependent roles in create game dto.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "rusty-sword-knight" } }),
        ],
      });
      await nextTick();
      const expectedConfirmSteps: GameLobbyStartGameConfirmDialogStep[] = ["players-positioned", "players-ready"];

      expect((wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).confirmSteps).toStrictEqual<GameLobbyStartGameConfirmDialogStep[]>(expectedConfirmSteps);
    });
  });

  describe("Open Dialog", () => {
    it("should set confirm step index to 0 when dialog is opened.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as GameLobbyStartGameConfirmDialogPrivateVariables).confirmStepIndex.value = 1;
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).open();
      await nextTick();

      expect((wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).confirmStepIndex.value).toBe(0);
    });

    it("should confirm step when dialog is opened.", async() => {
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).open();
      await nextTick();
      const expectedConfirmOptions: ConfirmationOptions = {
        group: "game-lobby-start-game-confirm-dialog",
        position: "bottom",
        accept: expect.any(Function) as () => void,
      };

      expect(hoistedMocks.useConfirm.require).toHaveBeenCalledExactlyOnceWith(expectedConfirmOptions);
    });
  });

  describe("Confirm Step", () => {
    it("should increment confirm step index when step is confirmed.", () => {
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).onConfirmStepFromGameLobbyStartGameConfirmDialogContainer();

      expect((wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).confirmStepIndex.value).toBe(1);
    });

    it("should set the current confirm step to the next step when step is confirmed.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "rusty-sword-knight" } }),
        ],
      });
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).onConfirmStepFromGameLobbyStartGameConfirmDialogContainer();
      await nextTick();

      expect((wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).currentConfirmStep).toBe("players-ready");
    });
  });

  describe("Confirm Start Game", () => {
    it("should emit confirm start game event when confirm start game is called.", () => {
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).confirmStartGame();

      expect(wrapper.emitted("confirmStartGame")).toHaveLength(1);
    });
  });

  describe("Reject Players Position Step", () => {
    it("should call reject callback pass as argument when reject players position step is called.", () => {
      const rejectCallback = vi.fn();
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialogContainer(rejectCallback);

      expect(rejectCallback).toHaveBeenCalledExactlyOnceWith();
    });

    it("should emit reject players position step event when reject players position step is called.", () => {
      const rejectCallback = vi.fn();
      (wrapper.vm as unknown as GameLobbyStartGameConfirmDialogPrivateVariables).onRejectPlayersPositionStepFromGameLobbyStartGameConfirmDialogContainer(rejectCallback);

      expect(wrapper.emitted("rejectPlayersPositionStep")).toHaveLength(1);
    });
  });
});