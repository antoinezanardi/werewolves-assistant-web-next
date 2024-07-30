import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { beforeEach } from "vitest";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameFoxMayHaveSniffedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameFoxMayHaveSniffedEvent/GameFoxMayHaveSniffedEvent.vue";
import type GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Fox May Have Sniffed Event Component", () => {
  const defaultTargetedPlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Baptiste" }),
    createFakeWerewolfAlivePlayer({ name: "Cyril" }),
  ];
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "fox-may-have-sniffed",
      players: defaultTargetedPlayers,
    }),
  };
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  let wrapper: ReturnType<typeof mount<typeof GameFoxMayHaveSniffedEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameFoxMayHaveSniffedEventComponent(options: ComponentMountingOptions<typeof GameFoxMayHaveSniffedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameFoxMayHaveSniffedEvent>>> {
    return mountSuspendedComponent(GameFoxMayHaveSniffedEvent, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFoxMayHaveSniffedEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameFoxMayHaveSniffedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play fox sniffing sound when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("fox-sniffing");
  });

  describe("Game Play Event Texts", () => {
    it("should pass default texts with game master thumb up and powerless disclaimer when fox have sniffed targets with werewolf and game options are default.", () => {
      const gameFoxMayHaveSniffedEventComponent = wrapper.findComponent<typeof GameFoxMayHaveSniffedEvent>("#game-fox-may-have-sniffed-event");
      const expectedTexts: string[] = [
        "components.GameFoxMayHaveSniffedEvent.foxMayHaveSniffed",
        "components.GameFoxMayHaveSniffedEvent.gameMasterWillTellIfPresentWerewolfInGroup",
        "components.GameFoxMayHaveSniffedEvent.foxHaveSniffedWerewolf",
        "components.GameFoxMayHaveSniffedEvent.foxIsPowerlessIfMissesWerewolf",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameFoxMayHaveSniffedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass default texts with game master thumb down and powerless disclaimer when fox have sniffed targets without werewolf and game options are default.", async() => {
      wrapper = await mountGameFoxMayHaveSniffedEventComponent({ props: { event: createFakeGameEvent({ players: [createFakeSeerAlivePlayer()] }) } });
      const gameFoxMayHaveSniffedEventComponent = wrapper.findComponent<typeof GameFoxMayHaveSniffedEvent>("#game-fox-may-have-sniffed-event");
      const expectedTexts: string[] = [
        "components.GameFoxMayHaveSniffedEvent.foxMayHaveSniffed",
        "components.GameFoxMayHaveSniffedEvent.gameMasterWillTellIfPresentWerewolfInGroup",
        "components.GameFoxMayHaveSniffedEvent.foxDidNotSniffWerewolf",
        "components.GameFoxMayHaveSniffedEvent.foxIsPowerlessIfMissesWerewolf",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameFoxMayHaveSniffedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass default texts without powerless disclaimer when fox have sniffed targets with werewolf and game options disabled fox powerless if misses.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.fox.isPowerlessIfMissesWerewolf = false;
      await nextTick();
      const gameFoxMayHaveSniffedEventComponent = wrapper.findComponent<typeof GameFoxMayHaveSniffedEvent>("#game-fox-may-have-sniffed-event");
      const expectedTexts: string[] = [
        "components.GameFoxMayHaveSniffedEvent.foxMayHaveSniffed",
        "components.GameFoxMayHaveSniffedEvent.gameMasterWillTellIfPresentWerewolfInGroup",
        "components.GameFoxMayHaveSniffedEvent.foxHaveSniffedWerewolf",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameFoxMayHaveSniffedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass default texts without game master thumb when fox skipped its turn.", async() => {
      wrapper = await mountGameFoxMayHaveSniffedEventComponent({ props: { event: createFakeGameEvent() } });
      const gameFoxMayHaveSniffedEventComponent = wrapper.findComponent<typeof GameFoxMayHaveSniffedEvent>("#game-fox-may-have-sniffed-event");
      const expectedTexts: string[] = [
        "components.GameFoxMayHaveSniffedEvent.foxMayHaveSniffed",
        "components.GameFoxMayHaveSniffedEvent.gameMasterWillTellIfPresentWerewolfInGroup",
        "components.GameFoxMayHaveSniffedEvent.foxIsPowerlessIfMissesWerewolf",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameFoxMayHaveSniffedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
  describe("Flipping Player Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameFoxMayHaveSniffedEventComponent({
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

    it("should pass werewolves svg icon path when there are werewolves in the group.", () => {
      const gameEventFlippingPlayerCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-players-card");

      expect(gameEventFlippingPlayerCardComponent.props("svgIconPath")).toBe("/svg/role/werewolf.svg");
    });

    it("should pass question mark svg icon path when there are no werewolves in the group.", async() => {
      wrapper = await mountGameFoxMayHaveSniffedEventComponent({
        props: { event: createFakeGameEvent({ players: [createFakeSeerAlivePlayer()] }) },
        global: {
          stubs: {
            GameEventWithTexts: false,
          },
          plugins: [createTestingPinia(testingPinia)],
        },
      });
      const gameEventFlippingPlayerCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-players-card");

      expect(gameEventFlippingPlayerCardComponent.props("svgIconPath")).toBe("/svg/misc/question-mark.svg");
    });
  });
});