import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeCompositionGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/composition-game-options/composition-game-options.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Badge from "primevue/badge";
import type Button from "primevue/button";
import GameLobbyHeaderOptionsButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Header Options Button Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderOptionsButton>>;

  async function mountGameLobbyHeaderOptionsButtonComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderOptionsButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderOptionsButton>>> {
    return mountSuspendedComponent(GameLobbyHeaderOptionsButton, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          Button: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyHeaderOptionsButtonComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Options Button", () => {
    it("should translate button label when rendered.", () => {
      const button = wrapper.findComponent<typeof Button>("#game-lobby-header-options-button");

      expect(button.text()).toBe("Game options");
    });

    it("should render changed option badge when game options have been changed.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.composition.isHidden = true;
      await nextTick();
      const badge = wrapper.findComponent<typeof Badge>("#changed-game-options-count-badge");

      expect(badge.attributes("value")).toBe("1");
    });

    it("should not render changed option badge when game options have not been changed.", () => {
      const badge = wrapper.findComponent<typeof Badge>("#changed-game-options-count-badge");

      expect(badge.exists()).toBeFalsy();
    });

    it("should attach tooltip to badge when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#changed-game-options-count-badge") };
      wrapper = await mountGameLobbyHeaderOptionsButtonComponent({
        global: {
          directives,
          plugins: [
            createTestingPinia({
              initialState: {
                [StoreIds.CREATE_GAME_DTO]: {
                  createGameDto: createFakeCreateGameDto({
                    options: createFakeGameOptions({
                      ...DEFAULT_GAME_OPTIONS,
                      composition: createFakeCompositionGameOptions({ isHidden: true }),
                    }),
                  }),
                },
              },
            }),
          ],
          stubs: {
            Button: false,
          },
        },
      });

      expect(tooltip.value).toBe(`components.GameLobbyHeaderOptionsButton.youHaveChangedGameOptions, {"count":1}`);
    });

    describe("Click on button", () => {
      it("should emit 'gameOptionsButtonClick' event when clicked.", async() => {
        const button = wrapper.findComponent<typeof Button>("#game-lobby-header-options-button");
        await button.trigger("click");

        expect(wrapper.emitted("gameOptionsButtonClick")).toBeTruthy();
      });
    });
  });
});