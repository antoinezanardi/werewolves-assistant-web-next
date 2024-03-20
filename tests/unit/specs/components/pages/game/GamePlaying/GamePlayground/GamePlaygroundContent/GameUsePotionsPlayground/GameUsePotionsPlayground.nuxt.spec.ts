import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameUsePotionsPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/GameUsePotionsPlayground.vue";
import type WitchUsePotionsTabView from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/WitchUsePotionsTabView/WitchUsePotionsTabView.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySourceInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlayWitchUsesPotions } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Use Potions Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameUsePotionsPlayground>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          currentPlay: createFakeGamePlayWitchUsesPotions({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "give-life-potion",
                  eligibleTargets: [
                    createFakePlayer(),
                    createFakePlayer(),
                  ],
                }),
              ],
            }),
          }),
        }),
      },
    },
  };

  async function mountGameUsePotionsPlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameUsePotionsPlayground>>> {
    return mountSuspendedComponent(GameUsePotionsPlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameUsePotionsPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("No potion left", () => {
    it("should render no potion container when witch has no potion left.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await wrapper.vm.$nextTick();
      const noPotionContainer = wrapper.find<HTMLHeadingElement>("#no-potion");

      expect(noPotionContainer.exists()).toBeTruthy();
    });

    it("should translate no potion text when witch has no potion left.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await wrapper.vm.$nextTick();
      const noPotionContainer = wrapper.find<HTMLHeadingElement>("#no-potion");

      expect(noPotionContainer.text()).toBe("The Witch has used both potions, the game can proceed");
    });
  });

  describe("At least one potion left", () => {
    it("should render witch use potions tab view when witch has her life potion.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
        source: createFakeGamePlaySource({
          interactions: [
            createFakeGamePlaySourceInteraction({
              type: "give-life-potion",
              eligibleTargets: [
                createFakePlayer(),
                createFakePlayer(),
              ],
            }),
          ],
        }),
      });
      await wrapper.vm.$nextTick();
      const witchUsePotionsTabView = wrapper.findComponent<typeof WitchUsePotionsTabView>("#witch-use-potions-tab-view");

      expect(witchUsePotionsTabView.exists()).toBeTruthy();
    });

    it("should render witch use potions tab view when witch has her death potion.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
        source: createFakeGamePlaySource({
          interactions: [
            createFakeGamePlaySourceInteraction({
              type: "give-death-potion",
              eligibleTargets: [
                createFakePlayer(),
                createFakePlayer(),
              ],
            }),
          ],
        }),
      });
      await wrapper.vm.$nextTick();
      const witchUsePotionsTabView = wrapper.findComponent<typeof WitchUsePotionsTabView>("#witch-use-potions-tab-view");

      expect(witchUsePotionsTabView.exists()).toBeTruthy();
    });
  });
});