import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubCompositionTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubCompositionTab/GameLobbyOptionsHubCompositionTab.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Composition Tab Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubCompositionTab>>;

  async function mountGameLobbyOptionsHubCompositionTabComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubCompositionTab> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubCompositionTab>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubCompositionTab, {
      global: {
        stubs: {
          GameOptionInputGroup: false,
          Fieldset: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubCompositionTabComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is Composition hidden option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-composition-tab-is-hidden-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Composition is hidden");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.composition.isHidden = true;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-composition-tab-is-hidden-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubCompositionTab.options.isHidden.descriptions.yes";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.composition.isHidden = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-composition-tab-is-hidden-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubCompositionTab.options.isHidden.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update create game dto when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-composition-tab-is-hidden-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.composition.isHidden = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});