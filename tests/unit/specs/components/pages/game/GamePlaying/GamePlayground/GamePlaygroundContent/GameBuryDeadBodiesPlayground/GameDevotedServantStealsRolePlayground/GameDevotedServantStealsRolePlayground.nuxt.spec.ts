import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";

import type { VuePrimeToggleButton } from "#components";
import GameDevotedServantStealsRolePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameDevotedServantStealsRolePlayground/GameDevotedServantStealsRolePlayground.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeMakeGamePlayTargetDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto.factory";
import { createFakeGamePlayEligibleTargets } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/game-play-eligible-targets.factory";
import { createFakeInteractablePlayer } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/interactable-player.factory";
import { createFakePlayerInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.factory";
import { createFakeGamePlaySurvivorsBuryDeadBodies } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Devoted Servant Steals Role Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameDevotedServantStealsRolePlayground>>;
  const eliminatePlayer = createFakeSeerAlivePlayer({ name: "Antoine" });
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
            eligibleTargets: createFakeGamePlayEligibleTargets({
              interactablePlayers: [
                createFakeInteractablePlayer({
                  player: eliminatePlayer,
                  interactions: [
                    createFakePlayerInteraction({
                      source: RoleNames.DEVOTED_SERVANT,
                      type: "steal-role",
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      },
    },
  };

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
    it("should translate devoted servant steals role question when player is defined.", () => {
      const devotedServantStealsRoleQuestion = wrapper.find<HTMLHeadingElement>("#devoted-servant-steals-role-question");

      expect(devotedServantStealsRoleQuestion.text()).toBe("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole, {\"playerName\":\"Antoine\"}");
    });

    it("should translate devoted servant steals role question when player is undefined.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      const devotedServantStealsRoleQuestion = wrapper.find<HTMLHeadingElement>("#devoted-servant-steals-role-question");
      await nextTick();

      expect(devotedServantStealsRoleQuestion.text()).toBe("components.GameDevotedServantStealsRolePlayground.doesDevotedServantStealRole, {}");
    });
  });

  describe("Toggle Button", () => {
    it("should translate off button label when rendered.", async() => {
      wrapper = await mountGameDevotedServantStealsRolePlaygroundComponent({ shallow: false });
      const toggleButton = wrapper.findComponent<typeof VuePrimeToggleButton>("#does-devoted-servant-steal-role-button");

      expect(toggleButton.props("offLabel")).toBe("She doesn't steal the role");
    });

    it("should translate on button label when rendered.", async() => {
      wrapper = await mountGameDevotedServantStealsRolePlaygroundComponent({ shallow: false });
      const toggleButton = wrapper.findComponent<typeof VuePrimeToggleButton>("#does-devoted-servant-steal-role-button");

      expect(toggleButton.props("onLabel")).toBe("She steals the role");
    });

    it("should set the eliminated player as target when toggle emits true change event.", async() => {
      wrapper = await mountGameDevotedServantStealsRolePlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const toggleButtonCheckbox = wrapper.find("#does-devoted-servant-steal-role-button > .p-togglebutton-input");
      await toggleButtonCheckbox.setValue(true);
      const expectedMakeGamePlayTargetDto = createFakeMakeGamePlayTargetDto({ playerId: eliminatePlayer._id });

      expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith(expectedMakeGamePlayTargetDto);
      expect(makeGamePlayDtoStore.removeMakeGamePlayTargetDto).not.toHaveBeenCalled();
    });

    it("should remove the eliminated player as target when toggle emits first true and false change event.", async() => {
      wrapper = await mountGameDevotedServantStealsRolePlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const toggleButtonCheckbox = wrapper.find("#does-devoted-servant-steal-role-button > .p-togglebutton-input");
      await toggleButtonCheckbox.setValue(true);
      await toggleButtonCheckbox.setValue(false);

      expect(makeGamePlayDtoStore.removeMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith(eliminatePlayer._id);
    });

    it("should throw error when toggle emits change events but eliminated player is not set.", async() => {
      wrapper = await mountGameDevotedServantStealsRolePlaygroundComponent({ shallow: false });
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      await nextTick();
      const toggleButtonCheckbox = wrapper.find("#does-devoted-servant-steal-role-button > .p-togglebutton-input");
      await toggleButtonCheckbox.setValue(true);

      expect(createError).toHaveBeenCalledExactlyOnceWith("Eliminated player is not found.");
      expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).not.toHaveBeenCalled();
      expect(makeGamePlayDtoStore.removeMakeGamePlayTargetDto).not.toHaveBeenCalled();
    });
  });
});