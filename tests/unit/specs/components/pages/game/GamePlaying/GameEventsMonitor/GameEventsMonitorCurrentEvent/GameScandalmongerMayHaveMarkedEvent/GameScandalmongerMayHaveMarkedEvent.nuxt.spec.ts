import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameScandalmongerMayHaveMarkedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerMayHaveMarkedEvent/GameScandalmongerMayHaveMarkedEvent.vue";
import type GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Scandalmonger May Have Marked Event Component", () => {
  const defaultMarkedPlayer = createFakeSeerAlivePlayer({ name: "Antoine" });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "scandalmonger-may-have-marked",
      players: [defaultMarkedPlayer],
    }),
  };
  const defaultGame = createFakeGame();
  let wrapper: ReturnType<typeof mount<typeof GameScandalmongerMayHaveMarkedEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameScandalmongerMayHaveMarkedEventComponent(options: ComponentMountingOptions<typeof GameScandalmongerMayHaveMarkedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameScandalmongerMayHaveMarkedEvent>>> {
    return mountSuspendedComponent(GameScandalmongerMayHaveMarkedEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effect", () => {
    it("should play raven flying sound effect when scandalmonger didn't mark anyone.", async() => {
      wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "scandalmonger-may-have-marked",
            players: [],
          }),
        },
      });
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("raven-flying-away");
    });

    it("should play raven cry sound effect when scandalmonger marked someone.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("raven-cry");
    });
  });

  describe("Game Event Texts", () => {
    it("should pass raven didn't mark anyone texts when scandalmonger didn't mark anyone.", async() => {
      wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "scandalmonger-may-have-marked",
            players: [],
          }),
        },
      });
      const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameScandalmongerMayHaveMarkedEvent>("#game-scandalmonger-may-have-marked-event");
      const expectedTexts: string[] = ["components.GameScandalmongerMayHaveMarkedEvent.scandalMongerDidntMarkAnyone"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerHasMarkedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass raven didn't mark anyone texts when players are undefined in game event.", async() => {
      wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "scandalmonger-may-have-marked",
          }),
        },
      });
      const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameScandalmongerMayHaveMarkedEvent>("#game-scandalmonger-may-have-marked-event");
      const expectedTexts: string[] = ["components.GameScandalmongerMayHaveMarkedEvent.scandalMongerDidntMarkAnyone"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerHasMarkedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass raven marked someone texts when scandalmonger marked someone.", () => {
      const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameScandalmongerMayHaveMarkedEvent>("#game-scandalmonger-may-have-marked-event");
      const expectedTexts: string[] = [
        "components.GameScandalmongerMayHaveMarkedEvent.scandalmongerHasMarkedAPlayer",
        "components.GameScandalmongerMayHaveMarkedEvent.gameMasterWillPutScandalmongerMark",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerHasMarkedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("Event Flipping Last Play Targets Card", () => {
      beforeEach(async() => {
        wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent({
          global: {
            plugins: [createTestingPinia(testingPinia)],
            stubs: { GameEventWithTexts: false },
          },
        });
      });

      it("should not pass svg icon path when scandalmonger didn't mark anyone.", async() => {
        wrapper = await mountGameScandalmongerMayHaveMarkedEventComponent({
          props: {
            event: createFakeGameEvent({
              type: "scandalmonger-may-have-marked",
              players: [],
            }),
          },
          global: {
            plugins: [createTestingPinia(testingPinia)],
            stubs: { GameEventWithTexts: false },
          },
        });
        const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-last-play-targets-card");

        expect(gameScandalmongerHasMarkedEventComponent.props("svgIconPath")).toBeUndefined();
      });

      it("should pass svg icon path when scandalmonger marked someone.", () => {
        const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-last-play-targets-card");

        expect(gameScandalmongerHasMarkedEventComponent.props("svgIconPath")).toBe("/svg/game/player/player-attribute/scandalmonger-marked.svg");
      });
    });
  });
});