import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Tab from "primevue/tab";
import type TabPanel from "primevue/tabpanel";
import type Tabs from "primevue/tabs";

import type { NuxtImg } from "#components";
import type GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import WitchUsePotionsTabView from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/WitchUsePotionsTabView/WitchUsePotionsTabView.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlayWitchUsesPotions } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Witch Use Potions Tab View Component", () => {
  let wrapper: ReturnType<typeof mount<typeof WitchUsePotionsTabView>>;
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

  async function mountWitchUsePotionsTabViewComponent(options: ComponentMountingOptions<typeof WitchUsePotionsTabView> = {}):
  Promise<ReturnType<typeof mount<typeof WitchUsePotionsTabView>>> {
    return mountSuspendedComponent(WitchUsePotionsTabView, {
      shallow: false,
      global: {
        stubs: {
          GamePlaygroundPlayerCard: true,
          NuxtImg: true,
        },
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountWitchUsePotionsTabViewComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Tab View", () => {
    it("should have active index set to life-potion when witch still has life potion.", async() => {
      wrapper = await mountWitchUsePotionsTabViewComponent({ shallow: true });
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
      await nextTick();
      const tabView = wrapper.findComponent<typeof Tabs>("#witch-use-potions-tab-view");

      expect(tabView.attributes("value")).toBe("life-potion");
    });

    it("should have active index set to death-potion when witch doesn't have life potion anymore.", async() => {
      wrapper = await mountWitchUsePotionsTabViewComponent({ shallow: true });
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
      await nextTick();
      const tabView = wrapper.findComponent<typeof Tabs>("#witch-use-potions-tab-view");

      expect(tabView.attributes("value")).toBe("death-potion");
    });
  });

  describe("Give Life Potion Tab", () => {
    it("should disable tab when witch doesn't have life potion anymore.", async() => {
      wrapper = await mountWitchUsePotionsTabViewComponent({
        global: {
          stubs: {
            Tab: true,
            GamePlaygroundPlayerCard: true,
            NuxtImg: true,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
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
      await nextTick();
      const giveLifePotionTab = wrapper.findComponent<typeof Tab>("#life-potion-tab");

      expect(giveLifePotionTab.attributes("disabled")).toBe("true");
    });

    it("should enable panel when witch still has life potion.", async() => {
      wrapper = await mountWitchUsePotionsTabViewComponent({
        global: {
          stubs: {
            TabPanel: true,
            GamePlaygroundPlayerCard: true,
            NuxtImg: true,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
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
      await nextTick();
      const giveLifePotionTab = wrapper.findComponent<typeof Tab>("#life-potion-tab");

      expect(giveLifePotionTab.attributes("disabled")).toBeUndefined();
    });

    it("should display life potion image when rendered.", () => {
      const lifePotionImage = wrapper.findComponent<typeof NuxtImg>("[alt='Image of the life potion']");

      expect(lifePotionImage.attributes("src")).toBe("svg/game/player/player-attribute/drank-life-potion.svg");
    });

    it("should translate give life potion panel title when rendered.", () => {
      const giveLifePotionPanel = wrapper.findComponent<typeof Tab>("#life-potion-tab");

      expect(giveLifePotionPanel.text()).toBe("Give life potion to save the player…");
    });

    it("should render eligible targets for life potion when there is an interaction for it.", async() => {
      const eligibleTargets = [
        createFakePlayer(),
        createFakePlayer(),
      ];
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
        source: createFakeGamePlaySource({
          interactions: [
            createFakeGamePlaySourceInteraction({
              type: "give-life-potion",
              eligibleTargets,
            }),
          ],
        }),
      });
      await wrapper.vm.$nextTick();
      const eligibleLifeTargets = wrapper.findAllComponents<typeof GamePlaygroundPlayerCard>(".life-potion-target");

      expect(eligibleLifeTargets).toHaveLength(2);
      expect(eligibleLifeTargets[0].props("player")).toStrictEqual<Player>(eligibleTargets[0]);
      expect(eligibleLifeTargets[1].props("player")).toStrictEqual<Player>(eligibleTargets[1]);
    });
  });

  describe("Give Death Potion Panel", () => {
    it("should disable panel when witch doesn't have death potion anymore.", async() => {
      wrapper = await mountWitchUsePotionsTabViewComponent({
        global: {
          stubs: {
            Tab: true,
            GamePlaygroundPlayerCard: true,
            NuxtImg: true,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
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
      await nextTick();
      const giveDeathPotionPanel = wrapper.findComponent<typeof TabPanel>("#death-potion-tab");

      expect(giveDeathPotionPanel.attributes("disabled")).toBe("true");
    });

    it("should enable panel when witch still has death potion.", async() => {
      wrapper = await mountWitchUsePotionsTabViewComponent({
        global: {
          stubs: {
            TabPanel: true,
            GamePlaygroundPlayerCard: true,
            NuxtImg: true,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
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
      await nextTick();
      const giveDeathPotionPanel = wrapper.findComponent<typeof TabPanel>("#death-potion-tab");

      expect(giveDeathPotionPanel.attributes("disabled")).toBeUndefined();
    });

    it("should display death potion image when rendered.", () => {
      const deathPotionImage = wrapper.findComponent<typeof NuxtImg>("[alt='Image of the death potion']");

      expect(deathPotionImage.attributes("src")).toBe("svg/game/player/player-attribute/drank-death-potion.svg");
    });

    it("should translate give death potion panel title when rendered.", () => {
      const giveDeathPotionPanel = wrapper.findComponent<typeof TabPanel>("#death-potion-tab");

      expect(giveDeathPotionPanel.text()).toBe("Give death potion to kill the player…");
    });

    it("should render eligible targets for death potion when there is an interaction for it.", async() => {
      const eligibleTargets = [
        createFakePlayer(),
        createFakePlayer(),
      ];
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
        source: createFakeGamePlaySource({
          interactions: [
            createFakeGamePlaySourceInteraction({
              type: "give-death-potion",
              eligibleTargets,
            }),
          ],
        }),
      });
      await wrapper.vm.$nextTick();
      const eligibleDeathTargets = wrapper.findAllComponents<typeof GamePlaygroundPlayerCard>(".death-potion-target");

      expect(eligibleDeathTargets).toHaveLength(2);
      expect(eligibleDeathTargets[0].props("player")).toStrictEqual<Player>(eligibleTargets[0]);
      expect(eligibleDeathTargets[1].props("player")).toStrictEqual<Player>(eligibleTargets[1]);
    });
  });
});