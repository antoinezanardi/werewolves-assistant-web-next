import { createTestingPinia } from "@pinia/testing";
import { createFakeGamePlayLoversMeetEachOther, createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlaySurvivorsVote, createFakeGamePlayWerewolvesEat } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import GamePlaygroundFooter from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooter.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type GamePlaygroundFooterCountdown from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdown.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Playground Footer Component", () => {
  const defaultGame = createFakeGame({
    currentPlay: createFakeGamePlaySurvivorsVote(),
  });
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundFooter>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame(defaultGame) } } };

  async function mountGamePlaygroundFooterComponent(options: ComponentMountingOptions<typeof GamePlaygroundFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaygroundFooter>>> {
    return mountSuspendedComponent(GamePlaygroundFooter, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundFooterComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Countdown", () => {
    it("should render countdown when current game play action is vote.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsVote();
      await nextTick();
      const countdown = wrapper.findComponent<typeof GamePlaygroundFooterCountdown>("#game-playground-footer-countdown");

      expect(countdown.exists()).toBeTruthy();
    });

    it("should render countdown when current game play action is meet each other.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayLoversMeetEachOther();
      await nextTick();
      const countdown = wrapper.findComponent<typeof GamePlaygroundFooterCountdown>("#game-playground-footer-countdown");

      expect(countdown.exists()).toBeTruthy();
    });

    it("should render countdown when current game play action is elect sheriff.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsElectSheriff();
      await nextTick();
      const countdown = wrapper.findComponent<typeof GamePlaygroundFooterCountdown>("#game-playground-footer-countdown");

      expect(countdown.exists()).toBeTruthy();
    });

    it("should not render countdown when current game play action is not vote, meet each other or elect sheriff.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat();
      await nextTick();
      const countdown = wrapper.findComponent<typeof GamePlaygroundFooterCountdown>("#game-playground-footer-countdown");

      expect(countdown.exists()).toBeFalsy();
    });

    it("should not render countdown when current game play is null.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const countdown = wrapper.findComponent<typeof GamePlaygroundFooterCountdown>("#game-playground-footer-countdown");

      expect(countdown.exists()).toBeFalsy();
    });
  });
});