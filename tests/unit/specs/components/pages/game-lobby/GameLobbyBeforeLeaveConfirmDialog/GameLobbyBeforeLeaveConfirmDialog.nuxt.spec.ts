import type { RouteLocationNormalizedGeneric } from "#vue-router";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeLocationNormalizedGuard } from "@tests/unit/utils/factories/composables/nuxt/useRouter.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { type Mock, vi } from "vitest";
import type { Ref } from "vue";
import GameLobbyBeforeLeaveConfirmDialog from "~/components/pages/game-lobby/GameLobbyBeforeLeaveConfirmDialog/GameLobbyBeforeLeaveConfirmDialog.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

type GameLobbyBeforeLeaveConfirmDialogPrivateVariables = {
  open: () => void;
  desiredDestinationFullPath: Ref<string>;
  doesConfirmToLeave: Ref<boolean>;
  acceptLeavingCallback: () => void;
  onBeforeEachRouteLeaving: (guard: RouteLocationNormalizedGeneric) => boolean;
};

const hoistedMocks = vi.hoisted(() => ({
  useConfirm: { require: vi.fn() },
  useRouter: {
    beforeEach: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
  },
}));

vi.mock("primevue/useconfirm", () => ({
  useConfirm: (): { require: Mock } => ({
    require: hoistedMocks.useConfirm.require,
  }),
}));

mockNuxtImport("useRouter", () => vi.fn(() => hoistedMocks.useRouter));

describe("Game Lobby Before Leave Confirm Dialog Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyBeforeLeaveConfirmDialog>>;
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
    ],
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyBeforeLeaveConfirmDialogComponent(options: ComponentMountingOptions<typeof GameLobbyBeforeLeaveConfirmDialog> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyBeforeLeaveConfirmDialog>>> {
    return mountSuspendedComponent(GameLobbyBeforeLeaveConfirmDialog, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyBeforeLeaveConfirmDialogComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("On Before Route Leaving", () => {
    it("should return false when there are enough players and confirm to leave is false.", () => {
      const guard = createFakeLocationNormalizedGuard({ fullPath: "/game-lobby" });
      const isLeaving = (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).onBeforeEachRouteLeaving(guard);

      expect(isLeaving).toBeFalsy();
    });

    it("should return true when guard destination name is game id.", () => {
      const guard = createFakeLocationNormalizedGuard({ name: "game-id" });
      const isLeaving = (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).onBeforeEachRouteLeaving(guard);

      expect(isLeaving).toBeTruthy();
    });

    it("should return true when there are enough players and confirm to leave is true.", async() => {
      (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).doesConfirmToLeave.value = true;
      const guard = createFakeLocationNormalizedGuard({ fullPath: "/game-lobby" });
      await nextTick();
      const isLeaving = (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).onBeforeEachRouteLeaving(guard);

      expect(isLeaving).toBeTruthy();
    });

    it("should return true when there are not enough players and confirm to leave is false.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [];
      const guard = createFakeLocationNormalizedGuard({ fullPath: "/game-lobby" });
      await nextTick();
      const isLeaving = (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).onBeforeEachRouteLeaving(guard);

      expect(isLeaving).toBeTruthy();
    });

    it("should not set desired destination full path when there are enough players and confirm to leave is false.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [];
      const guard = createFakeLocationNormalizedGuard({ fullPath: "/game-lobby" });
      (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).onBeforeEachRouteLeaving(guard);
      await nextTick();

      expect((wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).desiredDestinationFullPath.value).toBe("");
    });

    it("should set desired destination full path to guard full path when there are not enough players and confirm to leave is false.", async() => {
      const guard = createFakeLocationNormalizedGuard({ fullPath: "/game-lobby" });
      (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).onBeforeEachRouteLeaving(guard);
      await nextTick();

      expect((wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).desiredDestinationFullPath.value).toBe(guard.fullPath);
    });
  });

  describe("Confirm", () => {
    it("should set confirm parameters to confirm composable when open.", async() => {
      (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).open();
      await nextTick();

      expect(hoistedMocks.useConfirm.require).toHaveBeenCalledExactlyOnceWith({
        group: "game-lobby-before-leave-confirm-dialog",
        accept: expect.any(Function) as () => void,
        header: "components.GameLobbyBeforeLeaveConfirmDialog.youStartedComposition",
        message: "components.GameLobbyBeforeLeaveConfirmDialog.doYouWantToLeaveLobby",
        acceptLabel: "components.GameLobbyBeforeLeaveConfirmDialog.iWantToLeave",
        rejectLabel: "components.GameLobbyBeforeLeaveConfirmDialog.stayInLobby",
        defaultFocus: "reject",
        acceptIcon: "fa fa-sign-out",
        rejectIcon: "fa fa-times",
        acceptClass: "p-button-danger",
        rejectClass: "p-button-secondary",
      });
    });

    describe("On Leaving", () => {
      it("should set confirm to leave to true when accept leaving.", async() => {
        (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).acceptLeavingCallback();
        await nextTick();

        expect((wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).doesConfirmToLeave.value).toBeTruthy();
      });

      it("should push to desired destination full path when accept leaving.", async() => {
        (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).desiredDestinationFullPath.value = "/game-lobby";
        (wrapper.vm as unknown as GameLobbyBeforeLeaveConfirmDialogPrivateVariables).acceptLeavingCallback();
        await nextTick();

        expect(hoistedMocks.useRouter.push).toHaveBeenCalledExactlyOnceWith("/game-lobby");
      });
    });
  });
});