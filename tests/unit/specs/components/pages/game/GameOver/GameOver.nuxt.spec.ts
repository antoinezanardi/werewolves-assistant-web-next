import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { UseHeadInput } from "unhead";
import type { Mock } from "vitest";
import { expect } from "vitest";
import type { Ref } from "vue";

import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import type GameOverActions from "~/components/pages/game/GameOver/GameOverActions/GameOverActions.vue";
import type GameOverWinners from "~/components/pages/game/GameOver/GameOverWinners/GameOverWinners.vue";
import type { Game } from "~/composables/api/game/types/game.class";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameVictory } from "~/tests/unit/utils/factories/composables/api/game/game-victory/game-victory.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer, createFakeVillagerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { getError } from "~/tests/unit/utils/helpers/exception.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Over Component", () => {
  const defaultGame = createFakeGame({
    victory: createFakeGameVictory({
      winners: [
        createFakeSeerAlivePlayer(),
        createFakeVillagerAlivePlayer(),
      ],
      type: "villagers",
    }),
  });
  let mocks: {
    components: {
      gameOverHistory: {
        showGameHistory: Mock;
      }
    }
  };
  let wrapper: ReturnType<typeof mount<typeof GameOver>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameOverWinnersComponent(options: ComponentMountingOptions<typeof GameOver> = {}): Promise<ReturnType<typeof mount<typeof GameOver>>> {
    return mountSuspendedComponent(GameOver, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    mocks = { components: { gameOverHistory: { showGameHistory: vi.fn() } } };
    wrapper = await mountGameOverWinnersComponent({
      global: {
        stubs: {
          GameOverHistory: {
            template: "<div id='game-over-history-stub'></div>",
            methods: mocks.components.gameOverHistory,
          },
        },
      },
    });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = { title: "components.GameOver.gameOver" };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  it("should fetch and set game history records when rendered.", () => {
    const gameHistoryRecordsStore = useGameHistoryRecordsStore();

    expect(gameHistoryRecordsStore.fetchAndSetGameHistoryRecords).toHaveBeenCalledExactlyOnceWith(defaultGame._id);
  });

  describe("Game Over Winners", () => {
    it("should display game over winners when there are winners.", () => {
      const gameOverWinners = wrapper.findComponent<typeof GameOverWinners>("#game-over-winners");

      expect(gameOverWinners.exists()).toBeTruthy();
    });

    it("should not display game over winners when there is no victory.", async() => {
      const gameStore = useGameStore();
      gameStore.game.victory = undefined;
      await nextTick();
      const gameOverWinners = wrapper.findComponent<typeof GameOverWinners>("#game-over-winners");

      expect(gameOverWinners.exists()).toBeFalsy();
    });

    it("should not display game over winners when there are no winners.", async() => {
      const gameStore = useGameStore();
      gameStore.game.victory = createFakeGameVictory({ winners: undefined });
      await nextTick();
      const gameOverWinners = wrapper.findComponent<typeof GameOverWinners>("#game-over-winners");

      expect(gameOverWinners.exists()).toBeFalsy();
    });
  });

  describe("Sound Effect", () => {
    it.each<{
      test: string;
      expectedSoundEffect: SoundEffectName;
      game: Game;
    }>([
      {
        test: "should play angelic intervention sound effect when angels win.",
        expectedSoundEffect: "angelic-intervention",
        game: createFakeGame({ victory: createFakeGameVictory({ type: "angel" }) }),
      },
    ])("$test", async({ expectedSoundEffect, game }) => {
      wrapper = await mountGameOverWinnersComponent({ global: { plugins: [createTestingPinia({ initialState: { [StoreIds.GAME]: { game } } })] } });
      const { playSoundEffect } = useAudioStore();

      expect(playSoundEffect).toHaveBeenCalledExactlyOnceWith(expectedSoundEffect);
    });
  });

  describe("Game History", () => {
    it("should show game history when the show game history button is clicked.", async() => {
      const gameOverActions = wrapper.findComponent<typeof GameOverActions>("#game-over-actions");
      (gameOverActions.vm as VueVm).$emit("show-game-history");
      await nextTick();

      expect(mocks.components.gameOverHistory.showGameHistory).toHaveBeenCalledExactlyOnceWith();
    });

    it("should throw an error when the show game history button is clicked and the game history is not defined.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameOverHistory: Ref }).gameOverHistory.value = null;
      const gameOverActions = wrapper.findComponent<typeof GameOverActions>("#game-over-actions");
      await getError(() => (gameOverActions.vm as VueVm).$emit("showGameHistory"));

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Over History is not defined");
    });
  });
});