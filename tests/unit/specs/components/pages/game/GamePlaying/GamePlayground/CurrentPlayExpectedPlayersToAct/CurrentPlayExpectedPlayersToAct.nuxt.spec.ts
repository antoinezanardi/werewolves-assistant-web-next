import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import CurrentPlayExpectedPlayersToAct from "~/components/pages/game/GamePlaying/GamePlayground/CurrentPlayExpectedPlayersToAct/CurrentPlayExpectedPlayersToAct.vue";
import type PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlayCupidCharms } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeCupidAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Current Play Expected Players To Act Component", () => {
  let wrapper: ReturnType<typeof mount<typeof CurrentPlayExpectedPlayersToAct>>;
  const expectedPlayersToAct = [
    createFakeCupidAlivePlayer({ name: "Toto" }),
    createFakeCupidAlivePlayer({ name: "Juju" }),
    createFakeCupidAlivePlayer({ name: "Doudou" }),
  ];
  const defaultGame = createFakeGame({
    currentPlay: createFakeGamePlayCupidCharms({
      source: createFakeGamePlaySource({
        players: expectedPlayersToAct,
        name: "cupid",
      }),
    }),
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountCurrentPlayExpectedPlayersToActComponent(): Promise<ReturnType<typeof mount<typeof CurrentPlayExpectedPlayersToAct>>> {
    return mountSuspendedComponent(CurrentPlayExpectedPlayersToAct, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountCurrentPlayExpectedPlayersToActComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not render the expected players to act when there is no current play.", async() => {
    const gameStore = useGameStore();
    gameStore.game = createFakeGame({ currentPlay: null });
    await nextTick();
    const playersHorizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#player-horizontal-list");

    expect(playersHorizontalList.props("players")).toStrictEqual<Player[]>([]);
  });

  it("should not render the expected players to act when there is no source players in current play.", async() => {
    const gameStore = useGameStore();
    gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayCupidCharms({ source: createFakeGamePlaySource({ players: undefined }) }) });
    await nextTick();
    const playersHorizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#player-horizontal-list");

    expect(playersHorizontalList.props("players")).toStrictEqual<Player[]>([]);
  });

  it("should render the expected players to act when there is a current play.", () => {
    const playersHorizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#player-horizontal-list");

    expect(playersHorizontalList.props("players")).toStrictEqual<Player[]>(expectedPlayersToAct);
  });
});