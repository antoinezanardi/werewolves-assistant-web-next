import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeScandalmongerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Seer Has Seen Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSeerHasSeenEvent>>;
  const defaultSeenPlayer = createFakeScandalmongerAlivePlayer({ name: "Antoine" });
  const defaultGame = createFakeGame({
    lastGameHistoryRecord: createFakeGameHistoryRecord({
      play: createFakeGameHistoryRecordPlay({
        action: "look",
        targets: [createFakeGameHistoryRecordPlayTarget({ player: defaultSeenPlayer })],
      }),
    }),
    options: DEFAULT_GAME_OPTIONS,
  });
  const initialState = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameSeerHasSeenEventComponent(options: ComponentMountingOptions<typeof GameSeerHasSeenEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSeerHasSeenEvent>>> {
    return mountSuspendedComponent(GameSeerHasSeenEvent, {
      global: { plugins: [createTestingPinia(initialState)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSeerHasSeenEventComponent();
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

    it("should pass not found targeted player texts when last game history record is null.", async() => {
      const game = createFakeGame({
        lastGameHistoryRecord: null,
        options: DEFAULT_GAME_OPTIONS,
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = ["components.GameSeerHasSeenEvent.cantFindTargetedPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass not found targeted player texts when last game history record has no targets.", async() => {
      const game = createFakeGame({
        lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "look" }) }),
        options: DEFAULT_GAME_OPTIONS,
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameSeerHasSeenEventComponent = wrapper.findComponent<typeof GameSeerHasSeenEvent>("#game-seer-has-seen-event");
      const expectedTexts: string[] = ["components.GameSeerHasSeenEvent.cantFindTargetedPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSeerHasSeenEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass not found targeted player texts when last game history record has no player targets.", async() => {
      const game = createFakeGame({
        lastGameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            action: "look",
            targets: [],
          }),
        }),
        options: DEFAULT_GAME_OPTIONS,
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
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