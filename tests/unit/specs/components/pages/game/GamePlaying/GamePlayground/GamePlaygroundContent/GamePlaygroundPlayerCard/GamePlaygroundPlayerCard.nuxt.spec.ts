import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import type { GamePlaygroundPlayerCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import type GamePlaygroundPlayerCardVoteInput from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/GamePlaygroundPlayerCardVoteInput.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlayWerewolvesEat } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Player Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };
  const defaultProps: GamePlaygroundPlayerCardProps = { player: createFakeSeerAlivePlayer({ name: "Antoine" }) };

  async function mountGamePlaygroundPlayerCardComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>> {
    return mountSuspendedComponent(GamePlaygroundPlayerCard, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundPlayerCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Vote Input", () => {
    it("should render vote input when game current play is vote type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsElectSheriff();
      await nextTick();
      const voteInput = wrapper.findComponent<typeof GamePlaygroundPlayerCardVoteInput>("#game-playground-player-card-vote-input");

      expect(voteInput.exists()).toBeTruthy();
    });

    it("should not render vote input when game current play is not vote type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat();
      await nextTick();
      const voteInput = wrapper.findComponent<typeof GamePlaygroundPlayerCardVoteInput>("#game-playground-player-card-vote-input");

      expect(voteInput.exists()).toBeFalsy();
    });
  });
});