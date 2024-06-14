import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventFlippingPlaySourcePlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlaySourcePlayersCard/GameEventFlippingPlaySourcePlayersCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySurvivorsVote } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Event Flipping Play Source Players Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventFlippingPlaySourcePlayersCard>>;
  const defaultPlayers = [
    createFakePlayer({ name: "player-1" }),
    createFakePlayer({ name: "player-2" }),
    createFakePlayer({ name: "player-3" }),
  ];
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              name: "survivors",
              players: defaultPlayers,
            }),
          }),
        }),
      },
    },
  };

  async function mountGameEventFlippingPlaySourcePlayersCardComponent(options: ComponentMountingOptions<typeof GameEventFlippingPlaySourcePlayersCard> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventFlippingPlaySourcePlayersCard>>> {
    return mountSuspendedComponent(GameEventFlippingPlaySourcePlayersCard, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventFlippingPlaySourcePlayersCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Flipping Player Card", () => {
    it("should pass expected players to play for current play when rendered.", () => {
      const flippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(flippingPlayerCard.props("players")).toStrictEqual<Player[]>(defaultPlayers);
    });

    it("should pass empty array when there is no current play.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const flippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(flippingPlayerCard.props("players")).toStrictEqual<Player[]>([]);
    });

    it("should pass empty array when there is no source players.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsVote({ source: createFakeGamePlaySource({ players: undefined }) });
      await nextTick();
      const flippingPlayerCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(flippingPlayerCard.props("players")).toStrictEqual<Player[]>([]);
    });
  });
});