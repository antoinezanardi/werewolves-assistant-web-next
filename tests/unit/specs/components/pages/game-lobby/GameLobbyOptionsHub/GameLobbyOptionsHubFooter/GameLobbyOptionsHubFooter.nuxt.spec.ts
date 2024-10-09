import type { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type Button from "primevue/button";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameLobbyOptionsHubFooter from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubFooter/GameLobbyOptionsHubFooter.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Options Hub Footer Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    options: DEFAULT_GAME_OPTIONS,
  });
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubFooter>>;
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyOptionsHubFooterComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubFooter>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubFooter, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubFooterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Reset Options Button", () => {
    it("should not render reset options button when no options have been changed based on default game options.", () => {
      const resetOptionsButton = wrapper.findComponent<typeof Button>("#reset-options-button");

      expect(resetOptionsButton.exists()).toBeFalsy();
    });

    describe("Button is rendered", () => {
      beforeEach(() => {
        const createGameDtoStore = useCreateGameDtoStore();
        createGameDtoStore.createGameDto.options.composition.isHidden = true;
      });

      it("should render reset options button when options have been changed.", () => {
        const resetOptionsButton = wrapper.findComponent<typeof Button>("#reset-options-button");

        expect(resetOptionsButton.exists()).toBeTruthy();
      });

      it("should translate label of reset options button when rendered.", () => {
        const resetOptionsButton = wrapper.findComponent<typeof Button>("#reset-options-button");

        expect(resetOptionsButton.attributes("label")).toBe("Restore official rules");
      });

      it("should attach tooltip to reset options button when rendered.", async() => {
        const tooltip: BoundTooltip = { value: undefined };
        const directives = { ...pTooltipDirectiveBinder(tooltip, `#reset-options-button`) };
        wrapper = await mountGameLobbyOptionsHubFooterComponent({
          global: {
            directives,
            plugins: [createTestingPinia(testingPinia)],
          },
        });
        const createGameDtoStore = useCreateGameDtoStore();
        createGameDtoStore.createGameDto.options.composition.isHidden = true;
        createGameDtoStore.createGameDto.options.votes.canBeSkipped = false;
        await nextTick();

        expect(tooltip.value).toBe("You have changed 2 options");
      });

      it("should reset options when reset options button is clicked.", async() => {
        const resetOptionsButton = wrapper.findComponent<typeof Button>("#reset-options-button");
        await resetOptionsButton.trigger("click");
        const createGameDtoStore = useCreateGameDtoStore();

        expect(createGameDtoStore.resetCreateGameOptionsDto).toHaveBeenCalledExactlyOnceWith();
      });
    });
  });

  describe("Close Button", () => {
    it("should translate close button when rendered.", () => {
      const closeButton = wrapper.findComponent<typeof Button>("#close-button");

      expect(closeButton.attributes("label")).toBe("Close");
    });

    it("should emit close event when close button is clicked.", async() => {
      const closeButton = wrapper.findComponent<typeof Button>("#close-button");
      await closeButton.trigger("click");

      expect(wrapper.emitted("closeDialog")).toBeTruthy();
    });
  });
});