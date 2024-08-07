import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeScandalmongerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Seer Has Seen Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSeerHasSeenEvent>>;
  const defaultSeenPlayer = createFakeScandalmongerAlivePlayer({ name: "Antoine" });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "seer-has-seen",
      players: [defaultSeenPlayer],
    }),
  };
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  const initialState = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameSeerHasSeenEventComponent(options: ComponentMountingOptions<typeof GameSeerHasSeenEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSeerHasSeenEvent>>> {
    return mountSuspendedComponent(GameSeerHasSeenEvent, {
      global: { plugins: [createTestingPinia(initialState)] },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSeerHasSeenEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameSeerHasSeenEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play seer has seen sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("magic-wand");
  });

  describe("Seer Has Seen Event Texts", () => {
    it("should pass default event texts when game options are default ones.", () => {
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = ["components.GameSeerHasSeenEvent.seerHasSeenRole, {\"role\":\"shared.role.indefiniteName.scandalmonger\"}"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass not found targeted player texts when there are no players in event.", async() => {
      wrapper = await mountGameSeerHasSeenEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "seer-has-seen",
            players: [],
          }),
        },
      });
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = ["components.GameSeerHasSeenEvent.cantFindTargetedPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass not found targeted player texts when players in event are undefined.", async() => {
      wrapper = await mountGameSeerHasSeenEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "seer-has-seen",
          }),
        },
      });
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = ["components.GameSeerHasSeenEvent.cantFindTargetedPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should add game master mime text when seer is not talking in game options.", async() => {
      const options = createFakeGameOptions(DEFAULT_GAME_OPTIONS);
      options.roles.seer.isTalkative = false;
      const game = createFakeGame({
        ...defaultGame,
        options,
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = [
        "components.GameSeerHasSeenEvent.gameMasterWillMimeRole",
        "components.GameSeerHasSeenEvent.seerHasSeenRole, {\"role\":\"shared.role.indefiniteName.scandalmonger\"}",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass seen see side texts when seer is seeing target's side only in game options.", async() => {
      const options = createFakeGameOptions(DEFAULT_GAME_OPTIONS);
      options.roles.seer.canSeeRoles = false;
      const game = createFakeGame({
        ...defaultGame,
        options,
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = ["components.GameSeerHasSeenEvent.seerHasSeenSide, {\"side\":\"shared.role.side.villagers\"}"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should add game master mime text when seer is not talking and seeing target's side only in game options.", async() => {
      const options = createFakeGameOptions(DEFAULT_GAME_OPTIONS);
      options.roles.seer.isTalkative = false;
      options.roles.seer.canSeeRoles = false;
      const game = createFakeGame({
        ...defaultGame,
        options,
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = [
        "components.GameSeerHasSeenEvent.gameMasterWillMimeSide",
        "components.GameSeerHasSeenEvent.seerHasSeenSide, {\"side\":\"shared.role.side.villagers\"}",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});