import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputText from "primevue/inputtext";

import type { GameLobbyPlayerInputProps } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/game-lobby-player-input.types";
import GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Game Lobby Player Input Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPlayerInput>>;
  const defaultProps: GameLobbyPlayerInputProps = { modelValue: "" };
  const defaultMountingOptions: ComponentMountingOptions<typeof GameLobbyPlayerInput> = {
    props: defaultProps,
    global: { stubs: { InputGroup: false } },
  };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyPlayerInput, defaultMountingOptions);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Text input", () => {
    it("should be prefilled when v-model value is not empty.", async() => {
      wrapper = await mountSuspendedComponent(GameLobbyPlayerInput, {
        ...defaultMountingOptions,
        props: { modelValue: "Player 1" },
      });
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");

      expect(input.attributes("modelvalue")).toBe("Player 1");
    });

    it("should be disabled when create game dto has reached max players.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = Array.from({ length: 40 }, createFakeCreateGamePlayerDto);
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      await nextTick();

      expect(input.attributes("disabled")).toBe("true");
    });

    it("should not be disabled when create game dto has not reached max players.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = Array.from({ length: 39 }, createFakeCreateGamePlayerDto);
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      await nextTick();

      expect(input.attributes("disabled")).toBe("false");
    });

    it("should translate input label when rendered.", () => {
      const label = wrapper.find<HTMLLabelElement>("[for='player-name-input']");

      expect(label.text()).toBe("Player name");
    });
  });

  describe("Add button", () => {
    it("should be disabled when create game dto has reached max players.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = Array.from({ length: 40 }, createFakeCreateGamePlayerDto);
      const button = wrapper.find<HTMLButtonElement>("#add-player-button");
      await nextTick();

      expect(button.attributes("disabled")).toBe("true");
    });

    it("should be disabled when one player name is same as input value.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
      ];
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      const button = wrapper.find<HTMLButtonElement>("#add-player-button");
      await input.setValue("Player 1");

      expect(button.attributes("disabled")).toBe("true");
    });

    it("should be disabled when one player name is same as input value even with some spaces around it.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
      ];
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      const button = wrapper.find<HTMLButtonElement>("#add-player-button");
      await input.setValue("   Player 1   ");

      expect(button.attributes("disabled")).toBe("true");
    });

    it("should be enabled when input value is not empty and create game dto has not reached max players.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = Array.from({ length: 39 }, createFakeCreateGamePlayerDto);
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      const button = wrapper.find<HTMLButtonElement>("#add-player-button");
      await input.setValue("Player 2");

      expect(button.attributes("disabled")).toBe("false");
    });

    it("should translate button label when rendered.", async() => {
      wrapper = await mountSuspendedComponent(GameLobbyPlayerInput, {
        ...defaultMountingOptions,
        global: {
          stubs: {
            InputGroup: false,
            Button: false,
          },
        },
      });
      const button = wrapper.find<HTMLButtonElement>("#add-player-button");

      expect(button.text()).toBe("Add");
    });
  });
});