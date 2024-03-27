import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import { expect } from "vitest";

import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import type GameOverWinners from "~/components/pages/game/GameOver/GameOverWinners/GameOverWinners.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameVictory } from "~/tests/unit/utils/factories/composables/api/game/game-victory/game-victory.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer, createFakeVillagerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOver>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          victory: createFakeGameVictory({
            winners: [
              createFakeSeerAlivePlayer(),
              createFakeVillagerAlivePlayer(),
            ],
            type: "villagers",
          }),
        }),
      },
    },
  };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameOver, { global: { plugins: [createTestingPinia(testingPinia)] } });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = { title: "components.GameOver.gameOver" };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
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
});