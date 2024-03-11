import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameBuryDeadBodiesPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameBuryDeadBodiesPlayground.vue";
import type GameDevotedServantStealsRolePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameDevotedServantStealsRolePlayground/GameDevotedServantStealsRolePlayground.vue";
import type NoActionNeeded from "~/components/shared/game/game-play/NoNeededAction/NoActionNeeded.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlayEligibleTargets } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/game-play-eligible-targets.factory";
import { createFakeInteractablePlayer } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/interactable-player.factory";
import { createFakePlayerInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.factory";
import { createFakeGamePlay, createFakeGamePlaySurvivorsBuryDeadBodies } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Bury Dead Bodies Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameBuryDeadBodiesPlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() }) } } };

  async function mountGameBuryDeadBodiesPlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameBuryDeadBodiesPlayground>>> {
    return mountSuspendedComponent(GameBuryDeadBodiesPlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameBuryDeadBodiesPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Devoted Servant Playground", () => {
    it("should render devoted servant playground when one interaction for her is available.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({
        eligibleTargets: createFakeGamePlayEligibleTargets({
          interactablePlayers: [
            createFakeInteractablePlayer({
              player: createFakeSeerAlivePlayer(),
              interactions: [
                createFakePlayerInteraction({
                  source: "devoted-servant",
                  type: "steal-role",
                }),
              ],
            }),
          ],
        }),
      });
      await nextTick();
      const devotedServantPlayground = wrapper.findComponent<typeof GameDevotedServantStealsRolePlayground>("#game-devoted-servant-steals-role-playground");

      expect(devotedServantPlayground.exists()).toBeTruthy();
    });

    it("should not render devoted servant playground when no interaction for her is available.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay();
      await nextTick();
      const devotedServantPlayground = wrapper.findComponent<typeof GameDevotedServantStealsRolePlayground>("#game-devoted-servant-steals-role-playground");

      expect(devotedServantPlayground.exists()).toBeFalsy();
    });
  });

  describe("No Action needed", () => {
    it("should render no action needed when no interaction for devoted servant is available.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay();
      await nextTick();
      const noActionNeeded = wrapper.findComponent<typeof NoActionNeeded>("#no-action-needed");

      expect(noActionNeeded.exists()).toBeTruthy();
    });

    it("should not render no action needed when one interaction for her is available.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({
        eligibleTargets: createFakeGamePlayEligibleTargets({
          interactablePlayers: [
            createFakeInteractablePlayer({
              player: createFakeSeerAlivePlayer(),
              interactions: [
                createFakePlayerInteraction({
                  source: "devoted-servant",
                  type: "steal-role",
                }),
              ],
            }),
          ],
        }),
      });
      await nextTick();
      const noActionNeeded = wrapper.findComponent<typeof NoActionNeeded>("#no-action-needed");

      expect(noActionNeeded.exists()).toBeFalsy();
    });
  });
});