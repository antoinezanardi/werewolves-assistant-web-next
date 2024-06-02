import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameHistoryRecordPlayTarget } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Event Flipping Last Play Targets Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventFlippingLastPlayTargetsCard>>;
  const defaultTargets = [
    createFakeGameHistoryRecordPlayTarget({ player: createFakePlayer({ name: "Antoine" }) }),
    createFakeGameHistoryRecordPlayTarget({ player: createFakePlayer({ name: "Benoit" }) }),
  ];
  const defaultGame = createFakeGame({
    lastGameHistoryRecord: createFakeGameHistoryRecord({
      play: createFakeGameHistoryRecordPlay({
        targets: defaultTargets,
        type: "target",
      }),
    }),
  });
  const initialState = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameEventFlippingLastPlayTargetsCardComponent(options: ComponentMountingOptions<typeof GameEventFlippingLastPlayTargetsCard> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventFlippingLastPlayTargetsCard>>> {
    return mountSuspendedComponent(GameEventFlippingLastPlayTargetsCard, {
      global: { plugins: [createTestingPinia(initialState)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventFlippingLastPlayTargetsCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Flipping Card", () => {
    it("should pass targets to the game event flipping card when rendered.", () => {
      const gameEventFlippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");
      const expectedPlayers = defaultTargets.map(target => target.player);

      expect(gameEventFlippingPlayerCard.props("players")).toStrictEqual<Player[]>(expectedPlayers);
    });

    it("should not pass targets to the game event flipping card when there is no last game history record.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ lastGameHistoryRecord: null });
      await nextTick();
      const gameEventFlippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(gameEventFlippingPlayerCard.props("players")).toStrictEqual<Player[]>([]);
    });

    it("should not pass targets to the game event flipping card when there are no targets defined in last game history record play.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay() }) });
      await nextTick();
      const gameEventFlippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(gameEventFlippingPlayerCard.props("players")).toStrictEqual<Player[]>([]);
    });

    it("should not pass targets to the game event flipping card when there are no targets in last game history record play.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ targets: [] }) }) });
      await nextTick();
      const gameEventFlippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(gameEventFlippingPlayerCard.props("players")).toStrictEqual<Player[]>([]);
    });
  });
});