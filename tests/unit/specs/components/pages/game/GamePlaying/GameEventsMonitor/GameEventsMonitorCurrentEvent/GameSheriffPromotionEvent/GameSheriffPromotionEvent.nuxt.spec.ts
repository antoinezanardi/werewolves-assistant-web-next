import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameSheriffHasBeenElectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffPromotionEvent/GameSheriffPromotionEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSheriffBySheriffPlayerAttribute } from "@tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute.factory";
import { createFakeAccursedWolfFatherAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Sheriff Has Been Elected Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSheriffHasBeenElectedEvent>>;
  const defaultSheriffPlayer = createFakeAccursedWolfFatherAlivePlayer({ name: "Antoine", attributes: [createFakeSheriffBySheriffPlayerAttribute()] });
  const defaultGame = createFakeGame({
    players: [
      createFakeAccursedWolfFatherAlivePlayer(),
      defaultSheriffPlayer,
      createFakeAccursedWolfFatherAlivePlayer(),
    ],
    lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "elect-sheriff" }) }),
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameSheriffHasBeenElectedEventComponent(options: ComponentMountingOptions<typeof GameSheriffHasBeenElectedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSheriffHasBeenElectedEvent>>> {
    return mountSuspendedComponent(GameSheriffHasBeenElectedEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSheriffHasBeenElectedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameSheriffHasBeenElectedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play sheriff promotion effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("trumpet-fanfare");
  });

  describe("Sheriff Has Been Elected Event Texts", () => {
    it("should pass sheriff promotion by old sheriff event texts when sheriff is defined and last game play action is delegate.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "delegate" }) }),
      });
      await nextTick();
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-sheriff-promotion-event");
      const expectedTexts: string[] = [
        "components.GameSheriffHasBeenElectedEvent.sheriffHasBeenElectedByDelegation, {\"playerName\":\"Antoine\"}",
        "components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSheriffHasBeenElectedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass sheriff promotion by survivors event texts when sheriff is defined but last game play action is null.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        lastGameHistoryRecord: null,
      });
      await nextTick();
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-sheriff-promotion-event");
      const expectedTexts: string[] = [
        "components.GameSheriffHasBeenElectedEvent.sheriffHasBeenElectedBySurvivors, {\"playerName\":\"Antoine\"}",
        "components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSheriffHasBeenElectedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass sheriff promotion by survivors event texts when sheriff is defined and last game play action is elect sheriff.", () => {
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-sheriff-promotion-event");
      const expectedTexts: string[] = [
        "components.GameSheriffHasBeenElectedEvent.sheriffHasBeenElectedBySurvivors, {\"playerName\":\"Antoine\"}",
        "components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSheriffHasBeenElectedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find sheriff event text when sheriff is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        players: [],
      });
      await nextTick();
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-sheriff-promotion-event");
      const expectedTexts: string[] = ["components.GameSheriffHasBeenElectedEvent.cantFindElectedSheriff"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSheriffHasBeenElectedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Game Event Flipping Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameSheriffHasBeenElectedEventComponent({
        global: {
          stubs: { GameEventWithTexts: false },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
    });

    it("should pass sheriff player when sheriff is defined.", () => {
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-sheriff-card");

      expect(gameSheriffHasBeenElectedEventComponent.props("players")).toStrictEqual<Player[]>([defaultSheriffPlayer]);
    });

    it("should not render flipping card when sheriff is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        players: [],
      });
      await nextTick();
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-sheriff-card");

      expect(gameSheriffHasBeenElectedEventComponent.exists()).toBeFalsy();
    });
  });
});