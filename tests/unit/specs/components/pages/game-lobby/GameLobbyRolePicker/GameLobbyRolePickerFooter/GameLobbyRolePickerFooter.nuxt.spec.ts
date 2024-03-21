import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import type { GameLobbyRolePickerFooterProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/game-lobby-role-picker-footer.types";
import GameLobbyRolePickerFooter from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/GameLobbyRolePickerFooter.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerRoleDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerFooter>>;
  const defaultProps: GameLobbyRolePickerFooterProps = {
    player: createFakeCreateGamePlayerDto({
      name: "Antoine",
      role: createFakeCreateGamePlayerRoleDto({ name: "seer" }),
    }),
    pickedRole: "werewolf",
  };

  async function mountGameLobbyRolePickerFooterComponent(options: ComponentMountingOptions<typeof GameLobbyRolePickerFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerFooter>>> {
    return mountSuspendedComponent(GameLobbyRolePickerFooter, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerFooterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button", () => {
    it("should be enabled when role selected is not the one of the player.", () => {
      const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");

      expect(button.attributes("disabled")).toBe("false");
    });

    it("should be disabled when role selected is the one of the player.", async() => {
      wrapper = await mountGameLobbyRolePickerFooterComponent({
        props: {
          ...defaultProps,
          pickedRole: "seer",
        },
      });
      const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");

      expect(button.attributes("disabled")).toBe("true");
    });

    it("should translate button label when rendered.", () => {
      const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");

      expect(button.attributes("label")).toBe("Pick role for the player");
    });

    describe("On click", () => {
      beforeEach(() => {
        const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");
        button.vm.$emit("click");
      });

      it("should update player in create game dto when clicked.", () => {
        const createGameDtoStore = useCreateGameDtoStore();
        const expectedPlayer = createFakeCreateGamePlayerDto({
          ...defaultProps.player,
          role: createFakeCreateGamePlayerRoleDto({ name: defaultProps.pickedRole }),
        });

        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedPlayer);
      });

      it("should emit player update with updated player event when clicked.", () => {
        const emittedEvents = wrapper.emitted("playerUpdate");
        const expectedPlayer = createFakeCreateGamePlayerDto({
          ...defaultProps.player,
          role: createFakeCreateGamePlayerRoleDto({ name: defaultProps.pickedRole }),
        });

        expect(emittedEvents).toHaveLength(1);
        expect(emittedEvents?.[0]).toStrictEqual<[CreateGamePlayerDto]>([expectedPlayer]);
      });
    });
  });
});