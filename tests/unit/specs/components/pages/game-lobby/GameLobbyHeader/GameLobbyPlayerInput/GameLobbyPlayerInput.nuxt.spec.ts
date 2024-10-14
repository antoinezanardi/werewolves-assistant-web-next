import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputText from "primevue/inputtext";
import { expect } from "vitest";
import type { Ref } from "vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { getError } from "@tests/unit/utils/helpers/exception.helpers";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import type { GameLobbyPlayerInputProps } from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/game-lobby-player-input.types";
import GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const hoistedMocks = vi.hoisted(() => ({
  useDevice: { isOnTouchDevice: { value: false } },
}));

vi.mock("~/composables/misc/useDevice", () => ({
  useDevice: (): typeof hoistedMocks.useDevice => hoistedMocks.useDevice,
}));

describe("Game Lobby Player Input Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPlayerInput>>;
  const defaultProps: GameLobbyPlayerInputProps = { modelValue: "" };
  const defaultMountingOptions: ComponentMountingOptions<typeof GameLobbyPlayerInput> = {
    props: defaultProps,
    global: {
      stubs: {
        InputGroup: false,
        FloatLabel: false,
        ClientOnly: false,
      },
    },
  };

  async function mountGameLobbyPlayerInputComponent(options: ComponentMountingOptions<typeof GameLobbyPlayerInput> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyPlayerInput>>> {
    return mountSuspendedComponent(GameLobbyPlayerInput, {
      ...defaultMountingOptions,
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useDevice.isOnTouchDevice = ref(false);
    wrapper = await mountGameLobbyPlayerInputComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Text input", () => {
    it("should throw error when player name input is not defined in refs.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { playerNameInput: Ref }).playerNameInput.value = null;
      await getError(() => (wrapper.vm as unknown as { focusOnPlayerNameInput: () => void }).focusOnPlayerNameInput());

      expect(createError).toHaveBeenCalledExactlyOnceWith("Player name input is not defined");
    });

    it("should call focus method on player name input when focusOnPlayerNameInput method is called and not on touch device.", () => {
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      const focusSpy = vi.spyOn(input.element, "focus");
      (wrapper.vm as unknown as { focusOnPlayerNameInput: () => void }).focusOnPlayerNameInput();

      expect(focusSpy).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not call focus method on player name input when focusOnPlayerNameInput method is called and on touch device.", async() => {
      hoistedMocks.useDevice.isOnTouchDevice = ref(true);
      wrapper = await mountGameLobbyPlayerInputComponent();
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      const focusSpy = vi.spyOn(input.element, "focus");
      (wrapper.vm as unknown as { focusOnPlayerNameInput: () => void }).focusOnPlayerNameInput();

      expect(focusSpy).not.toHaveBeenCalled();
    });

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

    it("should have invalid class when player name exists in game.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
      ];
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      await input.setValue(" Player 2 ");

      expect(input.classes("p-invalid")).toBeTrue();
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
      wrapper = await mountGameLobbyPlayerInputComponent({
        global: {
          stubs: {
            InputGroup: false,
            Button: false,
            FloatLabel: false,
          },
        },
      });
      const button = wrapper.find<HTMLButtonElement>("#add-player-button");

      expect(button.text()).toBe("Add");
    });
  });

  describe("Help Text", () => {
    it("should translate max players reached help message when max players are reached in game.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = Array.from({ length: 40 }, createFakeCreateGamePlayerDto);
      await nextTick();
      const helpText = wrapper.find<HTMLLabelElement>("#player-name-input-help");

      expect(helpText.text()).toBe("components.GameLobbyPlayerInput.maxPlayersReached");
    });

    it("should translate player name exists help message when player name exists in game.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
      ];
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      await input.setValue("Player 2");
      const helpText = wrapper.find<HTMLLabelElement>("#player-name-input-help");

      expect(helpText.text()).toBe("components.GameLobbyPlayerInput.playerNameIsAlreadyTaken");
    });

    it("should translate player name max length help message when player name is too long.", async() => {
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      await input.setValue("  FrontLine incremental password  ");
      const helpText = wrapper.find<HTMLLabelElement>("#player-name-input-help");

      expect(helpText.text()).toBe("components.GameLobbyPlayerInput.playerNameMaxLengthReached");
    });

    it("should translate basic help message when rendered.", async() => {
      const input = wrapper.findComponent<typeof InputText>("#player-name-input");
      await input.setValue("  Antoine                       ");
      const helpText = wrapper.find<HTMLLabelElement>("#player-name-input-help");

      expect(helpText.text()).toBe("components.GameLobbyPlayerInput.pleaseEnterPlayerName");
    });
  });
});