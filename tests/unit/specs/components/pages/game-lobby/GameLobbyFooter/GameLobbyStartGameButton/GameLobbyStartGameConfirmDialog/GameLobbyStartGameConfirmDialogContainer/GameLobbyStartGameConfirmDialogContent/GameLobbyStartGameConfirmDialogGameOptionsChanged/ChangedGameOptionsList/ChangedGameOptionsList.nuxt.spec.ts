import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeCompositionGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/composition-game-options/composition-game-options.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeVotesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/votes-game-options/votes-game-options.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import ChangedGameOptionsList from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogGameOptionsChanged/ChangedGameOptionsList/ChangedGameOptionsList.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Changed Game Options List Component", () => {
  const defaultGameOptions = createFakeGameOptions({
    ...DEFAULT_GAME_OPTIONS,
    composition: createFakeCompositionGameOptions({ isHidden: true }),
    votes: createFakeVotesGameOptions({ duration: 10, canBeSkipped: true }),
  });
  const defaultCreateGameDto = createFakeCreateGameDto({
    options: defaultGameOptions,
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };
  let wrapper: ReturnType<typeof mount<typeof ChangedGameOptionsList>>;

  async function mountChangedGameOptionsListComponent(options: ComponentMountingOptions<typeof ChangedGameOptionsList> = {}):
  Promise<ReturnType<typeof mount<typeof ChangedGameOptionsList>>> {
    return mountSuspendedComponent(ChangedGameOptionsList, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountChangedGameOptionsListComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Changed Game Options List", () => {
    it("should render 2 list items when there are 2 changed game options.", () => {
      const listItems = wrapper.findAll<HTMLUListElement>(".changed-game-options-list-item");

      expect(listItems).toHaveLength(2);
    });

    describe("Reset Button", () => {
      it("should have an alt text for each button of list items when rendered.", () => {
        const resetButtons = wrapper.findAll<HTMLButtonElement>(".reset-changed-game-option-button");

        expect(resetButtons).toHaveLength(2);
        expect(resetButtons[0].attributes("aria-label")).toBe("Reset to official rule the option : composables.useGameOptionsTexts.composition.isHidden.yes");
        expect(resetButtons[1].attributes("aria-label")).toBe(`Reset to official rule the option : composables.useGameOptionsTexts.votes.duration, {"time":"shared.time.second, {\\"count\\":10}, 10"}`);
      });

      it("should not reset the game option when game option text is not recognized.", async() => {
        const createGameDtoStore = useCreateGameDtoStore();
        (wrapper.vm as unknown as { onClickFromResetChangedGameOptionButton: (text: string) => void }).onClickFromResetChangedGameOptionButton("unknown.game.option");
        await nextTick();

        expect(createGameDtoStore.resetCreateGameOptionDto).not.toHaveBeenCalled();
      });

      it("should reset the game option when clicked on the reset button.", async() => {
        const resetButtons = wrapper.findAll<HTMLButtonElement>(".reset-changed-game-option-button");
        await resetButtons[0].trigger("click");
        await nextTick();
        const createGameDtoStore = useCreateGameDtoStore();

        expect(createGameDtoStore.resetCreateGameOptionDto).toHaveBeenCalledExactlyOnceWith("composition.isHidden");
      });

      it("should reset both turn and phase name options for sheriff election when clicked on the reset button for the sheriff election time.", async() => {
        const createGameDtoStore = useCreateGameDtoStore();
        createGameDtoStore.createGameDto = createFakeCreateGameDto({
          options: createFakeGameOptions(DEFAULT_GAME_OPTIONS),
        });
        createGameDtoStore.createGameDto.options.roles.sheriff.electedAt.turn = 4;
        await nextTick();
        const resetButtons = wrapper.findAll<HTMLButtonElement>(".reset-changed-game-option-button");
        await resetButtons[0].trigger("click");

        expect(createGameDtoStore.resetCreateGameOptionDto).toHaveBeenNthCalledWith(1, "roles.sheriff.electedAt.turn");
        expect(createGameDtoStore.resetCreateGameOptionDto).toHaveBeenNthCalledWith(2, "roles.sheriff.electedAt.phaseName");
      });
    });
  });
});