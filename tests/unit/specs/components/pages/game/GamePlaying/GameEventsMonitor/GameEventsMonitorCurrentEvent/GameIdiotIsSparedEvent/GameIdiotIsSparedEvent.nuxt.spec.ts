import { createTestingPinia } from "@pinia/testing";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeIdiotAlivePlayer, createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameIdiotIsSparedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameIdiotIsSparedEvent/GameIdiotIsSparedEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Idiot Is Spared Event Component", () => {
  const defaultGame = createFakeGame({
    players: [
      createFakeSeerAlivePlayer({ name: "Antoine" }),
      createFakeIdiotAlivePlayer({ name: "Benoit" }),
    ],
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };
  let wrapper: ReturnType<typeof mount<typeof GameIdiotIsSparedEvent>>;

  async function mountGameIdiotIsSparedEventComponent(options: ComponentMountingOptions<typeof GameIdiotIsSparedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameIdiotIsSparedEvent>>> {
    return mountSuspendedComponent(GameIdiotIsSparedEvent, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameIdiotIsSparedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameIdiotIsSparedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gameIdiotIsSparedEventComponent = wrapper.findComponent<typeof GameIdiotIsSparedEvent>("#game-idiot-is-spared-event");
      const expectedTexts: string[] = [
        "components.GameIdiotIsSparedEvent.playerDies, {\"playerName\":\"Benoit\"}",
        "components.GameIdiotIsSparedEvent.playerIsActuallyIdiot, {\"playerName\":\"Benoit\"}",
        "components.GameIdiotIsSparedEvent.idiotIsSpared",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameIdiotIsSparedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find idiot player texts when idiot player is not found.", async() => {
      const game = createFakeGame({
        players: [createFakeSeerAlivePlayer()],
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameIdiotIsSparedEventComponent = wrapper.findComponent<typeof GameIdiotIsSparedEvent>("#game-idiot-is-spared-event");
      const expectedTexts: string[] = ["components.GameIdiotIsSparedEvent.cantFindIdiot"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameIdiotIsSparedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Flipping Player Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameIdiotIsSparedEventComponent({
        global: {
          stubs: {
            GameEventWithTexts: false,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
    });

    it("should pass idiot player when rendered.", () => {
      const gameEventFlippingPlayerCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-idiot-card");

      expect(gameEventFlippingPlayerCardComponent.props("players")).toStrictEqual<Player[]>([defaultGame.players[1]]);
    });

    it("should not render flipping player card when idiot player is not found.", async() => {
      const game = createFakeGame({
        players: [createFakeSeerAlivePlayer()],
      });
      const gameStore = useGameStore();
      gameStore.game = game;
      await nextTick();
      const gameEventFlippingPlayerCardComponent = wrapper.findComponent("#game-event-flipping-idiot-card");

      expect(gameEventFlippingPlayerCardComponent.exists()).toBeFalsy();
    });
  });

  describe("Sound Effects", () => {
    it("should play death sound effect when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("death");
    });

    it("should play death sound effect when game event with texts component emits event text change to first text.", async() => {
      const audioStore = useAudioStore();
      const changedText = "components.GameIdiotIsSparedEvent.playerDies, {\"playerName\":\"Benoit\"}";
      (wrapper.vm as unknown as { onGameEventTextChangeFromGameEventWithTexts: (event: string | undefined) => void }).onGameEventTextChangeFromGameEventWithTexts(changedText);
      await nextTick();

      expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(2, "death");
    });

    it("should play dumb huh sound effect when game event with texts component emits event text change to second text.", async() => {
      const audioStore = useAudioStore();
      const changedText = "components.GameIdiotIsSparedEvent.playerIsActuallyIdiot, {\"playerName\":\"Benoit\"}";
      (wrapper.vm as unknown as { onGameEventTextChangeFromGameEventWithTexts: (event: string | undefined) => void }).onGameEventTextChangeFromGameEventWithTexts(changedText);
      await nextTick();

      expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(2, "dumb-huh");
    });

    it("should not play sound effect when game event with texts component emits event text change to last text.", async() => {
      const audioStore = useAudioStore();
      const changedText = "components.GameIdiotIsSparedEvent.idiotIsSpared";
      (wrapper.vm as unknown as { onGameEventTextChangeFromGameEventWithTexts: (event: string | undefined) => void }).onGameEventTextChangeFromGameEventWithTexts(changedText);
      await nextTick();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("death");
    });
  });
});