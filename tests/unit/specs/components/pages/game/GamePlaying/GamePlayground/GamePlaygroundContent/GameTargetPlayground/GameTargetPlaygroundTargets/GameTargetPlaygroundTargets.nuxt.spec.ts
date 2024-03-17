import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import type GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import GameTargetPlaygroundTargets from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameTargetPlayground/GameTargetPlaygroundTargets/GameTargetPlaygroundTargets.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlay } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Target Playground Targets Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTargetPlaygroundTargets>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameTargetPlaygroundTargetsComponent(): Promise<ReturnType<typeof mount<typeof GameTargetPlaygroundTargets>>> {
    return mountSuspendedComponent(GameTargetPlaygroundTargets, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameTargetPlaygroundTargetsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("No targets", () => {
    it("should render no targets message when current play is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const noTargetsContainer = wrapper.find<HTMLDivElement>("#no-targets");

      expect(noTargetsContainer.exists()).toBeTruthy();
    });

    it("should render no targets message when current play is defined but there are no eligible targets.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay();
      await nextTick();
      const noTargetsContainer = wrapper.find<HTMLDivElement>("#no-targets");

      expect(noTargetsContainer.exists()).toBeTruthy();
    });

    it("should render no targets message when current play is defined but there are no eligible targets interactable players.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ eligibleTargets: createFakeGamePlayEligibleTargets() });
      await nextTick();
      const noTargetsContainer = wrapper.find<HTMLDivElement>("#no-targets");

      expect(noTargetsContainer.exists()).toBeTruthy();
    });

    it("should render translated no targets message when current play is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const noTargetsContainer = wrapper.find<HTMLDivElement>("#no-targets");

      expect(noTargetsContainer.text()).toBe("Nobody can be targeted…");
    });
  });

  describe("Targets", () => {
    it("should render targets when current play is defined and there are eligible targets interactable players.", async() => {
      const expectedTargets = [
        createFakeSeerAlivePlayer(),
        createFakeSeerAlivePlayer(),
        createFakeSeerAlivePlayer(),
      ];
      const expectedInteractablePlayers = [
        createFakeInteractablePlayer({ player: expectedTargets[0] }),
        createFakeInteractablePlayer({ player: expectedTargets[1] }),
        createFakeInteractablePlayer({ player: expectedTargets[2] }),
      ];
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ eligibleTargets: createFakeGamePlayEligibleTargets({ interactablePlayers: expectedInteractablePlayers }) });
      await nextTick();
      const targets = wrapper.findAllComponents<typeof GamePlaygroundPlayerCard>(".target");

      expect(targets).toHaveLength(expectedTargets.length);
      expect(targets[0].props("player")).toStrictEqual<Player>(expectedTargets[0]);
      expect(targets[1].props("player")).toStrictEqual<Player>(expectedTargets[1]);
      expect(targets[2].props("player")).toStrictEqual<Player>(expectedTargets[2]);
    });
  });
});