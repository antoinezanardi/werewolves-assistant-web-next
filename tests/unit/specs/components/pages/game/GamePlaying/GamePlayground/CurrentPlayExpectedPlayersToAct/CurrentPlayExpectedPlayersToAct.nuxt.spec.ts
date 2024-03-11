import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import CurrentPlayExpectedPlayersToAct from "~/components/pages/game/GamePlaying/GamePlayground/CurrentPlayExpectedPlayersToAct/CurrentPlayExpectedPlayersToAct.vue";
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
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          currentPlay: createFakeGamePlayCupidCharms({
            source: createFakeGamePlaySource({
              players: expectedPlayersToAct,
              name: "cupid",
            }),
          }),
        }),
      },
    },
  };

  async function mountCurrentPlayExpectedPlayersToActComponent(): Promise<ReturnType<typeof mount<typeof CurrentPlayExpectedPlayersToAct>>> {
    return mountSuspendedComponent(CurrentPlayExpectedPlayersToAct, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: { RoleImage: true },
      },
    });
  }

  beforeEach(async() => {
    wrapper = await mountCurrentPlayExpectedPlayersToActComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render the expected players to act when rendered.", () => {
    const expectedPlayersToActElements = wrapper.findAll<HTMLDivElement>(".expected-player-to-act");

    expect(expectedPlayersToActElements).toHaveLength(expectedPlayersToAct.length);
    expect(expectedPlayersToActElements[0].text()).toBe(expectedPlayersToAct[0].name);
    expect(expectedPlayersToActElements[1].text()).toBe(expectedPlayersToAct[1].name);
    expect(expectedPlayersToActElements[2].text()).toBe(expectedPlayersToAct[2].name);
  });

  it("should not render the expected players to act when there is no current play.", async() => {
    const gameStore = useGameStore();
    gameStore.game.currentPlay = null;
    await nextTick();
    const expectedPlayersToActElements = wrapper.findAll<HTMLDivElement>(".expected-player-to-act");

    expect(expectedPlayersToActElements).toHaveLength(0);
  });

  it("should not render the expected players to act when there is no source players in current play.", async() => {
    const gameStore = useGameStore();
    gameStore.game.currentPlay = createFakeGamePlayCupidCharms({ source: createFakeGamePlaySource({ players: undefined }) });
    await nextTick();
    const expectedPlayersToActElements = wrapper.findAll<HTMLDivElement>(".expected-player-to-act");

    expect(expectedPlayersToActElements).toHaveLength(0);
  });
});