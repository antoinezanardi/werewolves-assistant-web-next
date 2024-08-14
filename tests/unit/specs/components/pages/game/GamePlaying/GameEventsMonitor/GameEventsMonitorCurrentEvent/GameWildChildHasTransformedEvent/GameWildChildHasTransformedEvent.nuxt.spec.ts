import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeWildChildGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wild-child-game-options/wild-child-game-options.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeWildChildAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameWildChildHasTransformedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWildChildHasTransformedEvent/GameWildChildHasTransformedEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Wild Child Has Transformed Event Component", () => {
  const wildChild = createFakeWildChildAlivePlayer({ name: "Antoine" });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "wild-child-has-transformed",
      players: [wildChild],
    }),
  };
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };
  let wrapper: ReturnType<typeof mount<typeof GameWildChildHasTransformedEvent>>;

  async function mountGameWildChildHasTransformedEventComponent(options: ComponentMountingOptions<typeof GameWildChildHasTransformedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWildChildHasTransformedEvent>>> {
    return mountSuspendedComponent(GameWildChildHasTransformedEvent, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameWildChildHasTransformedEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWildChildHasTransformedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effects", () => {
    it("should not play sound effects when transformation is not revealed.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).not.toHaveBeenCalled();
    });

    it("should play sound effects when transformation is revealed in game options.", async() => {
      const gameWithRevealedTransformation = createFakeGame({
        options: createFakeGameOptions({
          roles: createFakeRolesGameOptions({
            wildChild: createFakeWildChildGameOptions({ isTransformationRevealed: true }),
          }),
        }),
      });
      wrapper = await mountGameWildChildHasTransformedEventComponent({
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                [StoreIds.GAME]: { game: gameWithRevealedTransformation },
              },
            }),
          ],
        },
      });
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(1, "monkey-cry");
      expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(2, "werewolf-transformation");
    });
  });

  describe("Game Event Texts", () => {
    it("should pass game wild child has quietly transformed event texts when transformation is not revealed.", () => {
      const gameWildChildHasTransformedEvent = wrapper.findComponent<typeof GameWildChildHasTransformedEvent>("#game-wild-child-has-transformed-event");
      const expectedTexts: string[] = ["components.GameWildChildHasTransformedEvent.wildChildHasTransformedQuietly"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWildChildHasTransformedEvent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass game wild child has transformed event texts when transformation is revealed.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.wildChild.isTransformationRevealed = true;
      await nextTick();
      const gameWildChildHasTransformedEvent = wrapper.findComponent<typeof GameWildChildHasTransformedEvent>("#game-wild-child-has-transformed-event");
      const expectedTexts: string[] = ["components.GameWildChildHasTransformedEvent.wildChildHasTransformed"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWildChildHasTransformedEvent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});