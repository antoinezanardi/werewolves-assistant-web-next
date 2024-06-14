import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";

import GameDevotedServantStealsRolePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameDevotedServantStealsRolePlayground/GameDevotedServantStealsRolePlayground.vue";
import type GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySurvivorsBuryDeadBodies } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Devoted Servant Steals Role Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameDevotedServantStealsRolePlayground>>;
  const eligibleTargets = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Florian" }),
  ];
  const defaultGame = createFakeGame({
    currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
      source: createFakeGamePlaySource({
        interactions: [
          createFakeGamePlaySourceInteraction({
            source: "devoted-servant",
            type: "steal-role",
            eligibleTargets,
          }),
        ],
      }),
    }),
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameDevotedServantStealsRolePlaygroundComponent(options: ComponentMountingOptions<typeof GameDevotedServantStealsRolePlayground> = {}):
  Promise<ReturnType<typeof mount<typeof GameDevotedServantStealsRolePlayground>>> {
    return mountSuspendedComponent(GameDevotedServantStealsRolePlayground, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameDevotedServantStealsRolePlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Devoted Servant steals role question", () => {
    it("should translate devoted servant steals role question when there are multiple players defined.", () => {
      const devotedServantStealsRoleQuestion = wrapper.find<HTMLHeadingElement>("#devoted-servant-steals-role-question");

      expect(devotedServantStealsRoleQuestion.text()).toBe("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole, 2");
    });

    it("should translate devoted servant steals role question when there is only one player defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                source: "devoted-servant",
                type: "steal-role",
                eligibleTargets: [eligibleTargets[0]],
              }),
            ],
          }),
        }),
      });
      const devotedServantStealsRoleQuestion = wrapper.find<HTMLHeadingElement>("#devoted-servant-steals-role-question");
      await nextTick();

      expect(devotedServantStealsRoleQuestion.text()).toBe("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole, 1");
    });

    it("should translate devoted servant steals role question as singular when there is no interaction.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({ source: createFakeGamePlaySource({ interactions: [] }) }),
      });
      const devotedServantStealsRoleQuestion = wrapper.find<HTMLHeadingElement>("#devoted-servant-steals-role-question");
      await nextTick();

      expect(devotedServantStealsRoleQuestion.text()).toBe("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole, 0");
    });

    it("should translate devoted servant steals role question as singular when there is no eliminated players.", async() => {
      const gameStore = useGameStore();

      gameStore.game = createFakeGame({
        ...defaultGame,
        currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                source: "devoted-servant",
                type: "steal-role",
                eligibleTargets: [],
              }),
            ],
          }),
        }),
      });
      const devotedServantStealsRoleQuestion = wrapper.find<HTMLHeadingElement>("#devoted-servant-steals-role-question");
      await nextTick();

      expect(devotedServantStealsRoleQuestion.text()).toBe("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole, 0");
    });
  });

  describe("Targets", () => {
    it("should render targets when there are multiple eligible targets for devoted servant.", () => {
      const targets = wrapper.findAllComponents<typeof GamePlaygroundPlayerCard>(".target");

      expect(targets).toHaveLength(2);
      expect(targets[0].props("player")).toStrictEqual<Player>(eligibleTargets[0]);
      expect(targets[1].props("player")).toStrictEqual<Player>(eligibleTargets[1]);
    });
  });
});