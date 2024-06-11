import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type GameOver from "~/components/pages/game/GameOver/GameOver.vue";

import GameOverWinners from "~/components/pages/game/GameOver/GameOverWinners/GameOverWinners.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameVictory } from "~/tests/unit/utils/factories/composables/api/game/game-victory/game-victory.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer, createFakeVillagerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over Winners Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverWinners>>;
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

  async function mountGameOverWinnersComponent(): Promise<ReturnType<typeof mount<typeof GameOverWinners>>> {
    return mountSuspendedComponent(GameOverWinners, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverWinnersComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Players Horizontal List", () => {
    it("should display players horizontal list when there are winners.", () => {
      const playersHorizontalList = wrapper.findComponent<typeof GameOverWinners>("#players-horizontal-list");

      expect(playersHorizontalList.exists()).toBeTruthy();
    });

    it("should not display players horizontal list when there is no victory.", async() => {
      const gameStore = useGameStore();
      gameStore.game.victory = undefined;
      await nextTick();
      const playersHorizontalList = wrapper.findComponent<typeof GameOverWinners>("#players-horizontal-list");

      expect(playersHorizontalList.exists()).toBeFalsy();
    });

    it("should not display players horizontal list when there are no winners.", async() => {
      const gameStore = useGameStore();
      gameStore.game.victory = createFakeGameVictory({ winners: undefined });
      await nextTick();
      const playersHorizontalList = wrapper.findComponent<typeof GameOverWinners>("#players-horizontal-list");

      expect(playersHorizontalList.exists()).toBeFalsy();
    });
  });
});