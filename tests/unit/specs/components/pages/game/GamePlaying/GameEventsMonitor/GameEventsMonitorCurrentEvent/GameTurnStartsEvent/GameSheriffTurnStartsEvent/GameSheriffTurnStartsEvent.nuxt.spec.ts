import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameSheriffTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSheriffTurnStartsEvent/GameSheriffTurnStartsEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySourceInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySheriffDelegates, createFakeGamePlaySheriffSettlesVotes } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Sheriff Turn Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSheriffTurnStartsEvent>>;
  const defaultGame = createFakeGame({
    currentPlay: createFakeGamePlaySheriffSettlesVotes({
      type: "target",
      source: createFakeGamePlaySource({
        interactions: [
          createFakeGamePlaySourceInteraction({
            type: "sentence-to-death",
            eligibleTargets: [
              createFakePlayer({ name: "Antoine" }),
              createFakePlayer({ name: "Benoit" }),
            ],
          }),
        ],
      }),
    }),
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameSheriffTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameSheriffTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSheriffTurnStartsEvent>>> {
    return mountSuspendedComponent(GameSheriffTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSheriffTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameSheriffTurnStartsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play dramatic drums sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("dramatic-drums");
  });

  describe("Game Event Texts", () => {
    it("should not pass any event texts when current play is null.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        currentPlay: null,
      });
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameSheriffTurnStartsEvent>("#game-sheriff-turn-starts-event");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe("");
    });

    it("should pass event texts when current play is settle votes.", () => {
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameSheriffTurnStartsEvent>("#game-sheriff-turn-starts-event");
      const expectedTexts: string[] = ["components.GameSheriffTurnStartsEvent.sheriffSettlesVotes, {\"players\":\"Antoine shared.and Benoit\"}"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts when current play is delegate sheriff role.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameSheriffTurnStartsEvent>("#game-sheriff-turn-starts-event");
      const expectedTexts: string[] = ["components.GameSheriffTurnStartsEvent.sheriffDelegates"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});