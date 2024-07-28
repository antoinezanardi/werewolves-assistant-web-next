import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameScandalmongerMarkIsActiveEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerMarkIsActiveEvent/GameScandalmongerMarkIsActiveEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Scandalmonger Mark Is Active Event Component", () => {
  const defaultMarkedPlayer = createFakeSeerAlivePlayer({ name: "Antoine" });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "scandalmonger-mark-is-active",
      players: [defaultMarkedPlayer],
    }),
  };
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };
  let wrapper: ReturnType<typeof mount<typeof GameScandalmongerMarkIsActiveEvent>>;

  async function mountGameScandalmongerMarkIsActiveEventComponent(options: ComponentMountingOptions<typeof GameScandalmongerMarkIsActiveEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameScandalmongerMarkIsActiveEvent>>> {
    return mountSuspendedComponent(GameScandalmongerMarkIsActiveEvent, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameScandalmongerMarkIsActiveEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameScandalmongerMarkIsActiveEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effect", () => {
    it("should play raven cry sound effect when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("raven-cry");
    });
  });

  describe("Game Events Texts", () => {
    it("should pass can't find marked player when marked player is not in game events.", async() => {
      wrapper = await mountGameScandalmongerMarkIsActiveEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "scandalmonger-mark-is-active",
          }),
        },
      });
      const gameScandalmongerMarkIsActiveEventComponent = wrapper.findComponent<typeof GameScandalmongerMarkIsActiveEvent>("#game-scandalmonger-mark-is-active-event");
      const expectedTexts: string[] = ["components.GameScandalmongerMarkIsActiveEvent.cantFindScandalmongerMarkedPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerMarkIsActiveEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass default event texts when rendered.", () => {
      const gameScandalmongerMarkIsActiveEventComponent = wrapper.findComponent<typeof GameScandalmongerMarkIsActiveEvent>("#game-scandalmonger-mark-is-active-event");
      const expectedTexts: string[] = [
        "components.GameScandalmongerMarkIsActiveEvent.scandalmongerHasMarkedAPlayer, {\"playerName\":\"Antoine\"}",
        "components.GameScandalmongerMarkIsActiveEvent.playerHasPenaltyForVotes, {\"penalty\":2}, 2",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerMarkIsActiveEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});