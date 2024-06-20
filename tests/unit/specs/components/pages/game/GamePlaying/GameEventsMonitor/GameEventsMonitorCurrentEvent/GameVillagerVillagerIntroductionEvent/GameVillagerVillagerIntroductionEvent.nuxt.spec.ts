import { createTestingPinia } from "@pinia/testing";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeAccursedWolfFatherAlivePlayer, createFakeVillagerVillagerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameVillagerVillagerIntroductionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameVillagerVillagerIntroductionEvent/GameVillagerVillagerIntroductionEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Villager Villager Introduction Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameVillagerVillagerIntroductionEvent>>;
  const defaultVillagerVillagerPlayer = createFakeVillagerVillagerAlivePlayer({ name: "Antoine" });
  const defaultGame = createFakeGame({
    players: [
      defaultVillagerVillagerPlayer,
      createFakeAccursedWolfFatherAlivePlayer(),
      createFakeAccursedWolfFatherAlivePlayer(),
    ],
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameVillagerVillagerIntroductionEventComponent(options: ComponentMountingOptions<typeof GameVillagerVillagerIntroductionEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameVillagerVillagerIntroductionEvent>>> {
    return mountSuspendedComponent(GameVillagerVillagerIntroductionEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameVillagerVillagerIntroductionEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameVillagerVillagerIntroductionEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play clearing throat and dings effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("clearing-throat-and-bell-dings");
  });

  describe("Villager Villager Event Texts", () => {
    it("should pass default texts when villager villager is in the game.", () => {
      const villagerVillagerIntroductionEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-villager-villager-introduction-event");
      const expectedTexts: string[] = [
        "components.GameVillagerVillagerIntroductionEvent.villagerVillagerIntroduction, {\"playerName\":\"Antoine\"}",
        "components.GameVillagerVillagerIntroductionEvent.idealPlayerForSheriff",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(villagerVillagerIntroductionEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find villager villager texts when villager villager is not in the game.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        players: [
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
        ],
      });
      await nextTick();
      const villagerVillagerIntroductionEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-villager-villager-introduction-event");
      const expectedTexts: string[] = ["components.GameVillagerVillagerIntroductionEvent.cantFindVillagerVillager"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(villagerVillagerIntroductionEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Game Event Flipping Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameVillagerVillagerIntroductionEventComponent({
        global: {
          stubs: { GameEventWithTexts: false },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
    });

    it("should pass villager-villager player when villager villager is in the game.", () => {
      const gameEventFlippingCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-sheriff-card");

      expect(gameEventFlippingCard.props("players")).toStrictEqual<Player[]>([defaultVillagerVillagerPlayer]);
    });

    it("should not render flipping card when villager villager is not in the game.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        players: [
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
        ],
      });
      await nextTick();
      const gameEventFlippingCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-sheriff-card");

      expect(gameEventFlippingCard.exists()).toBeFalsy();
    });
  });
});