import { createTestingPinia } from "@pinia/testing";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeElderAlivePlayer, createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameElderHasTakenRevengeEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameElderHasTakenRevengeEvent/GameElderHasTakenRevengeEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Elder Has Taken Revenge Event Component", () => {
  const defaultElder = createFakeElderAlivePlayer({ name: "Antoine" });
  const defaultGame = createFakeGame({
    players: [
      defaultElder,
      createFakeSeerAlivePlayer(),
    ],
  });
  let wrapper: ReturnType<typeof mount<typeof GameElderHasTakenRevengeEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameElderHasTakenRevengeEventComponent(options: ComponentMountingOptions<typeof GameElderHasTakenRevengeEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameElderHasTakenRevengeEvent>>> {
    return mountSuspendedComponent(GameElderHasTakenRevengeEvent, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameElderHasTakenRevengeEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play thunder sound when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("thunder");
  });

  describe("Game Event Texts", () => {
    it("should pass texts when rendered.", () => {
      const gameElderHasTakenRevengeEventComponent = wrapper.findComponent<typeof GameElderHasTakenRevengeEvent>("#game-elder-has-taken-revenge-event");
      const expectedTexts: string[] = [
        "components.GameElderHasTakenRevengeEvent.elderHasBeenMurderedByVillager",
        "components.GameElderHasTakenRevengeEvent.elderHasTakenRevenge",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameElderHasTakenRevengeEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find elder player when elder is not found.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ players: [] });
      await nextTick();
      const gameElderHasTakenRevengeEventComponent = wrapper.findComponent<typeof GameElderHasTakenRevengeEvent>("#game-elder-has-taken-revenge-event");
      const expectedTexts: string[] = ["components.GameElderHasTakenRevengeEvent.cantFindElder"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameElderHasTakenRevengeEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Flipping Player Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameElderHasTakenRevengeEventComponent({
        global: {
          stubs: {
            GameEventWithTexts: false,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
      const gameStore = useGameStore();
      gameStore.game = createFakeGame(defaultGame);
    });

    it("should pass elder player when rendered.", () => {
      const gameEventFlippingPlayerCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-elder-card");

      expect(gameEventFlippingPlayerCardComponent.props("players")).toStrictEqual<Player[]>([defaultElder]);
    });

    it("should not render flipping player card when elder player is not found.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ players: [] });
      await nextTick();
      const gameEventFlippingPlayerCardComponent = wrapper.findComponent("#game-event-flipping-elder-card");

      expect(gameEventFlippingPlayerCardComponent.exists()).toBeFalsy();
    });
  });
});