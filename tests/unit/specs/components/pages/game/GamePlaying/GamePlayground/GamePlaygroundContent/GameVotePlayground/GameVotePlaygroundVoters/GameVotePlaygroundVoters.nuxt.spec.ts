import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import { vi } from "vitest";
import type Radash from "radash";

import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import GameVotePlaygroundVoters from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameVotePlayground/GameVotePlaygroundVoters/GameVotePlaygroundVoters.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

const hoistedMocks = vi.hoisted(() => ({ radash: { shuffle: vi.fn() } }));

vi.mock("radash", async importOriginal => ({
  ...await importOriginal<typeof Radash>(),
  ...hoistedMocks.radash,
}));

describe("Game Vote Playground Voter Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameVotePlaygroundVoters>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameVotePlaygroundVotersComponent(): Promise<ReturnType<typeof mount<typeof GameVotePlaygroundVoters>>> {
    return mountSuspendedComponent(GameVotePlaygroundVoters, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameVotePlaygroundVotersComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("No voters", () => {
    it("should render no voters message when current play is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const noVotersContainer = wrapper.find<HTMLDivElement>("#no-voters");

      expect(noVotersContainer.exists()).toBeTruthy();
    });

    it("should render no voters message when current play is defined but there are no expected players to vote.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ source: createFakeGamePlaySource({ players: [] }) });
      await nextTick();
      const noVotersContainer = wrapper.find<HTMLDivElement>("#no-voters");

      expect(noVotersContainer.exists()).toBeTruthy();
    });

    it("should render translated no voters message when current play is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const noVotersContainer = wrapper.find<HTMLDivElement>("#no-voters");

      expect(noVotersContainer.text()).toBe("Nobody can vote…");
    });
  });

  describe("Voters", () => {
    it("should render shuffled voters when current play is defined and there are expected players to vote.", async() => {
      const expectedPlayersToVote = [
        createFakeSeerAlivePlayer(),
        createFakeSeerAlivePlayer(),
        createFakeSeerAlivePlayer(),
      ];
      const shuffledPlayers = [
        createFakeSeerAlivePlayer(),
        createFakeSeerAlivePlayer(),
        createFakeSeerAlivePlayer(),
      ];
      hoistedMocks.radash.shuffle.mockReturnValue(shuffledPlayers);
      wrapper = await mountGameVotePlaygroundVotersComponent();
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ source: createFakeGamePlaySource({ players: expectedPlayersToVote }) });
      await nextTick();
      const voters = wrapper.findAllComponents<typeof GamePlaygroundPlayerCard>(GamePlaygroundPlayerCard);

      expect(voters).toHaveLength(shuffledPlayers.length);
      expect(voters[0].props("player")).toBe(shuffledPlayers[0]);
      expect(voters[1].props("player")).toBe(shuffledPlayers[1]);
      expect(voters[2].props("player")).toBe(shuffledPlayers[2]);
    });
  });
});