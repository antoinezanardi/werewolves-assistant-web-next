import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import type { GameLobbyRolePickerFooterProps } from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/game-lobby-role-picker-footer.types";
import GameLobbyRolePickerFooter from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/GameLobbyRolePickerFooter.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerRoleDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerSideDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-side/create-game-player-side.dto.factory";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mockPiniaStore } from "~/tests/unit/utils/helpers/mock.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerFooter>>;
  const defaultProps: GameLobbyRolePickerFooterProps = {
    player: createFakeCreateGamePlayerDto({
      name: "Antoine",
      role: createFakeCreateGamePlayerRoleDto({ name: "seer" }),
    }),
    pickedRole: createFakeRole({
      name: "werewolf",
      side: "werewolves",
    }),
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

    it("should be disabled when player is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerFooterComponent({
        props: {
          ...defaultProps,
          player: undefined,
        },
      });
      const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");

      expect(button.attributes("disabled")).toBe("true");
    });

    it("should be disabled when picked role is not defined.", async() => {
      wrapper = await mountGameLobbyRolePickerFooterComponent({
        props: {
          ...defaultProps,
          pickedRole: undefined,
        },
      });
      const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");

      expect(button.attributes("disabled")).toBe("true");
    });

    it("should be disabled when role selected is the one of the player.", async() => {
      wrapper = await mountGameLobbyRolePickerFooterComponent({
        props: {
          ...defaultProps,
          pickedRole: createFakeRole({
            name: "seer",
            side: "villagers",
          }),
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
      beforeEach(async() => {
        const pinia = createTestingPinia();
        const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
        createGameDtoStore.isRoleMaxReachedInCreateGameDto.mockReturnValue(false);
        createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([createFakeCreateGamePlayerDto()]);
        wrapper = await mountGameLobbyRolePickerFooterComponent({ global: { plugins: [pinia] } });
        const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");
        button.vm.$emit("click");
      });

      it("should update player in create game dto when clicked.", () => {
        const createGameDtoStore = useCreateGameDtoStore();
        const expectedPlayer = createFakeCreateGamePlayerDto({
          ...defaultProps.player,
          role: createFakeCreateGamePlayerRoleDto({ name: defaultProps.pickedRole?.name }),
          side: {
            current: defaultProps.pickedRole?.side,
            original: defaultProps.pickedRole?.side,
          },
        });

        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedPlayer);
      });

      it("should swap player role and side when clicked and max is reached for this role.", async() => {
        const otherPlayer = createFakeCreateGamePlayerDto({
          name: "Bob",
          role: createFakeCreateGamePlayerRoleDto({ name: "seer" }),
        });
        const sourcePlayer = createFakeCreateGamePlayerDto({
          name: "Antoine",
          role: createFakeCreateGamePlayerRoleDto({ name: "werewolf" }),
          side: createFakeCreateGamePlayerSideDto({ current: "werewolves", original: "werewolves" }),
        });
        const pinia = createTestingPinia();
        const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
        createGameDtoStore.isRoleMaxReachedInCreateGameDto.mockReturnValue(true);
        createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([otherPlayer]);
        wrapper = await mountGameLobbyRolePickerFooterComponent({
          global: { plugins: [pinia] },
          props: {
            player: sourcePlayer,
            pickedRole: createFakeRole({
              name: "seer",
              side: "villagers",
            }),
          },
        });
        const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");
        button.vm.$emit("click");
        const expectedOtherPlayer = createFakeCreateGamePlayerDto({
          ...otherPlayer,
          role: sourcePlayer.role,
          side: sourcePlayer.side,
        });
        const expectedSourcePlayer = createFakeCreateGamePlayerDto({
          ...sourcePlayer,
          role: { name: "seer" },
          side: {
            current: "villagers",
            original: "villagers",
          },
        });

        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenNthCalledWith(1, expectedOtherPlayer);
        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenNthCalledWith(2, expectedSourcePlayer);
      });

      it("should not swap player role and side when clicked and max is reached for this role but no other player has this role.", async() => {
        const sourcePlayer = createFakeCreateGamePlayerDto({
          name: "Antoine",
          role: createFakeCreateGamePlayerRoleDto({ name: "werewolf" }),
        });
        const pinia = createTestingPinia();
        const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
        createGameDtoStore.isRoleMaxReachedInCreateGameDto.mockReturnValue(true);
        createGameDtoStore.getPlayersWithRoleNameInCreateGameDto.mockReturnValue([]);
        wrapper = await mountGameLobbyRolePickerFooterComponent({
          global: { plugins: [pinia] },
          props: {
            player: sourcePlayer,
            pickedRole: createFakeRole({
              name: "seer",
              side: "villagers",
            }),
          },
        });
        const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");
        button.vm.$emit("click");
        const expectedSourcePlayer = createFakeCreateGamePlayerDto({
          ...sourcePlayer,
          role: { name: "seer" },
          side: {
            current: "villagers",
            original: "villagers",
          },
        });

        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedSourcePlayer);
      });

      it("should emit player update with updated player event when clicked.", () => {
        const emittedEvents = wrapper.emitted("playerUpdate");
        const expectedPlayer = createFakeCreateGamePlayerDto({
          ...defaultProps.player,
          role: createFakeCreateGamePlayerRoleDto({ name: defaultProps.pickedRole?.name }),
          side: {
            current: defaultProps.pickedRole?.side,
            original: defaultProps.pickedRole?.side,
          },
        });

        expect(emittedEvents).toHaveLength(1);
        expect(emittedEvents?.[0]).toStrictEqual<[CreateGamePlayerDto]>([expectedPlayer]);
      });

      it("should not emit player update with updated player event when picked role is not defined.", async() => {
        wrapper = await mountGameLobbyRolePickerFooterComponent({
          props: {
            ...defaultProps,
            pickedRole: undefined,
          },
        });
        const button = wrapper.findComponent<typeof Button>("#game-lobby-role-picker-footer-button");
        button.vm.$emit("click");
        const emittedEvents = wrapper.emitted("playerUpdate");

        expect(emittedEvents).toBeUndefined();
      });
    });
  });
});