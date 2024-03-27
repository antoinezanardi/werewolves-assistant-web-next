import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Dialog from "primevue/dialog";

import type { GameLobbyRolePickerExposed } from "~/components/pages/game-lobby/GameLobbyRolePicker/game-lobby-role-picker.types";
import GameLobbyRolePicker from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePicker.vue";
import type GameLobbyRolePickerDescription from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerDescription/GameLobbyRolePickerDescription.vue";
import type GameLobbyRolePickerFooter from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/GameLobbyRolePickerFooter.vue";
import type GameLobbyRolePickerGrid from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerGrid/GameLobbyRolePickerGrid.vue";
import type GameLobbyRolePickerHeader from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/GameLobbyRolePickerHeader.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { Role } from "~/composables/api/role/types/role.class";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Role Picker Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePicker>>;

  async function mountGameLobbyRolePickerComponent(options: ComponentMountingOptions<typeof GameLobbyRolePicker> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePicker>>> {
    return mountSuspendedComponent(GameLobbyRolePicker, {
      shallow: false,
      global: {
        stubs: {
          GameLobbyRolePickerHeader: true,
          GameLobbyRolePickerDescription: true,
          GameLobbyRolePickerGrid: true,
          GameLobbyRolePickerFooter: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog not open", () => {
    it("should set dialog to invisible when rendered.", async() => {
      await mountGameLobbyRolePickerComponent({ shallow: true });
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

      expect(dialog.props("visible")).toBeFalsy();
    });

    describe("Game Lobby Role Picker Header", () => {
      it("should not render game lobby role picker header when player is not defined.", () => {
        const gameLobbyRolePickerHeader = wrapper.findComponent<typeof GameLobbyRolePickerHeader>("#game-lobby-role-picker-header");

        expect(gameLobbyRolePickerHeader.exists()).toBeFalsy();
      });
    });

    describe("Game Lobby Role Picker Content", () => {
      it("should not render game lobby role picker content when player is not defined.", () => {
        const gameLobbyRolePickerDescription = wrapper.findComponent<typeof GameLobbyRolePickerDescription>("#game-lobby-role-picker-description");
        const gameLobbyRolePickerGrid = wrapper.findComponent<typeof GameLobbyRolePickerGrid>("#game-lobby-role-picker-grid");

        expect(gameLobbyRolePickerDescription.exists()).toBeFalsy();
        expect(gameLobbyRolePickerGrid.exists()).toBeFalsy();
      });
    });

    describe("Game Lobby Role Picker Footer", () => {
      it("should not render game lobby role picker footer when player is not defined.", () => {
        const gameLobbyRolePickerFooter = wrapper.findComponent<typeof GameLobbyRolePickerFooter>("#game-lobby-role-picker-footer");

        expect(gameLobbyRolePickerFooter.exists()).toBeFalsy();
      });
    });
  });

  describe("Dialog open", () => {
    const player = createFakeCreateGamePlayerDto();

    beforeEach(async() => {
      wrapper = await mountGameLobbyRolePickerComponent();
      (wrapper.vm as unknown as GameLobbyRolePickerExposed).openToPickRoleForPlayer(player);
    });

    it("should set dialog to visible when freshly opened.", async() => {
      wrapper = await mountGameLobbyRolePickerComponent({ shallow: true });
      (wrapper.vm as unknown as GameLobbyRolePickerExposed).openToPickRoleForPlayer(player);
      await nextTick();
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

      expect(dialog.attributes("visible")).toBe("true");
    });

    describe("Game Lobby Role Picker Header", () => {
      it("should render game lobby role picker header when player is defined.", () => {
        const gameLobbyRolePickerHeader = wrapper.findComponent<typeof GameLobbyRolePickerHeader>("#game-lobby-role-picker-header");

        expect(gameLobbyRolePickerHeader.exists()).toBeTruthy();
      });

      it("should pass player to game lobby role picker header when freshly opened.", () => {
        const gameLobbyRolePickerHeader = wrapper.findComponent<typeof GameLobbyRolePickerHeader>("#game-lobby-role-picker-header");

        expect(gameLobbyRolePickerHeader.props("player")).toStrictEqual<CreateGamePlayerDto>(player);
      });
    });

    describe("Game Lobby Role Picker Content", () => {
      it("should render game lobby role picker content when player is defined.", () => {
        const gameLobbyRolePickerDescription = wrapper.findComponent<typeof GameLobbyRolePickerDescription>("#game-lobby-role-picker-description");
        const gameLobbyRolePickerGrid = wrapper.findComponent<typeof GameLobbyRolePickerGrid>("#game-lobby-role-picker-grid");

        expect(gameLobbyRolePickerDescription.exists()).toBeTruthy();
        expect(gameLobbyRolePickerGrid.exists()).toBeTruthy();
      });

      it("should pass an undefined picked role to game lobby role picker description when freshly opened.", () => {
        const gameLobbyRolePickerDescription = wrapper.findComponent<typeof GameLobbyRolePickerGrid>("#game-lobby-role-picker-grid");

        expect(gameLobbyRolePickerDescription.attributes("pickedrole")).toBeUndefined();
      });

      it("should pick role when game lobby role picker grid emits role pick event.", async() => {
        const emittedRole = createFakeRole();
        const gameLobbyRolePickerGrid = wrapper.findComponent<typeof GameLobbyRolePickerGrid>("#game-lobby-role-picker-grid");
        (gameLobbyRolePickerGrid.vm as VueVm).$emit("pick-role", emittedRole);
        await nextTick();

        expect(gameLobbyRolePickerGrid.props("pickedRole")).toStrictEqual<Role>(emittedRole);
      });
    });

    describe("Game Lobby Role Picker Footer", () => {
      it("should render game lobby role picker footer when player is defined.", () => {
        const gameLobbyRolePickerFooter = wrapper.findComponent<typeof GameLobbyRolePickerFooter>("#game-lobby-role-picker-footer");

        expect(gameLobbyRolePickerFooter.exists()).toBeTruthy();
      });

      it("should pass player to game lobby role picker footer when freshly opened.", () => {
        const gameLobbyRolePickerFooter = wrapper.findComponent<typeof GameLobbyRolePickerFooter>("#game-lobby-role-picker-footer");

        expect(gameLobbyRolePickerFooter.props("player")).toStrictEqual<CreateGamePlayerDto>(player);
      });

      it("should close dialog when game lobby role picker footer emits player update event.", async() => {
        const emittedRole = createFakeRole();
        const gameLobbyRolePickerGrid = wrapper.findComponent<typeof GameLobbyRolePickerGrid>("#game-lobby-role-picker-grid");
        (gameLobbyRolePickerGrid.vm as VueVm).$emit("pick-role", emittedRole);
        await nextTick();
        let gameLobbyRolePickerFooter = wrapper.findComponent<typeof GameLobbyRolePickerFooter>("#game-lobby-role-picker-footer");
        (gameLobbyRolePickerFooter.vm as VueVm).$emit("player-update", player);
        await nextTick();
        gameLobbyRolePickerFooter = wrapper.findComponent<typeof GameLobbyRolePickerFooter>("#game-lobby-role-picker-footer");

        expect(gameLobbyRolePickerFooter.exists()).toBeFalsy();
      });
    });
  });
});