import type { mount } from "@vue/test-utils";
import { expect } from "vitest";
import type { Ref } from "vue";

import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import type GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeader>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyHeader);
    const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
    (gameLobbyPlayerInput.vm as unknown as typeof GameLobbyPlayerInput).isAddButtonDisabled = false;
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should translate game lobby title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#game-lobby-header-title");

      expect(title.text()).toBe("Game Lobby");
    });
  });

  describe("Game Lobby Player Input Form", () => {
    describe("Game Lobby Player Input", () => {
      it("should pass empty input value when rendered.", () => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");

        expect(gameLobbyPlayerInput.props("modelValue")).toBe("");
      });

      it("should update ref when input emits update event.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1");
        await nextTick();

        expect(gameLobbyPlayerInput.props("modelValue")).toBe("Player 1");
      });
    });

    describe("Add Player Form", () => {
      it("should not empty input when game lobby player input ref is not set.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1");
        (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyPlayerInput: Ref<typeof GameLobbyPlayerInput | null> }).gameLobbyPlayerInput.value = null;
        const form = wrapper.find<HTMLFormElement>("#game-lobby-header-form");
        await form.trigger("submit");

        expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Player Input is not initialized");
      });

      it("should not empty input when add button is disabled.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1");
        (gameLobbyPlayerInput.vm as unknown as typeof GameLobbyPlayerInput).isAddButtonDisabled = true;
        const form = wrapper.find<HTMLFormElement>("#game-lobby-header-form");
        await form.trigger("submit");

        expect(gameLobbyPlayerInput.props("modelValue")).toBe("Player 1");
      });

      it("should not trim player input value when add button is disabled and form is submitted.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1  ");
        (gameLobbyPlayerInput.vm as unknown as typeof GameLobbyPlayerInput).isAddButtonDisabled = true;
        const form = wrapper.find<HTMLFormElement>("#game-lobby-header-form");
        await form.trigger("submit");

        expect(gameLobbyPlayerInput.props("modelValue")).toBe("Player 1  ");
      });

      it("should not add player when trimmed input is empty.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "   ");
        const form = wrapper.find<HTMLFormElement>("#game-lobby-header-form");
        await form.trigger("submit");
        const createGameDtoStore = useCreateGameDtoStore();

        expect(createGameDtoStore.addPlayerToCreateGameDto).not.toHaveBeenCalled();
      });

      it("should add player when form is valid and submitted.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1");
        const form = wrapper.find<HTMLFormElement>("#game-lobby-header-form");
        await form.trigger("submit");
        const createGameDtoStore = useCreateGameDtoStore();
        const expectedCreatedPlayer = createFakeCreateGamePlayerDto({
          name: "Player 1",
          role: { name: undefined },
        });

        expect(createGameDtoStore.addPlayerToCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreatedPlayer);
      });

      it("should empty player input when form is valid and submitted.", async() => {
        const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");
        (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1");
        const form = wrapper.find<HTMLFormElement>("#game-lobby-header-form");
        await form.trigger("submit");

        expect(gameLobbyPlayerInput.props("modelValue")).toBe("");
      });
    });
  });
});