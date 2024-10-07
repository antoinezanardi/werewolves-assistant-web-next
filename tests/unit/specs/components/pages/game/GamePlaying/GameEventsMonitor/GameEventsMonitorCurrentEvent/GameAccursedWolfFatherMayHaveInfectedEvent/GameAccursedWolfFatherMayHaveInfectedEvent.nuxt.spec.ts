import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameAccursedWolfFatherMayHaveInfectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameAccursedWolfFatherMayHaveInfectedEvent/GameAccursedWolfFatherMayHaveInfectedEvent.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

import type GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";

describe("Game Accursed Wolf Father May Have Infected Event Component", () => {
  const defaultPlayer = createFakeSeerAlivePlayer({ name: "Antoine" });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "accursed-wolf-father-may-have-infected",
      players: [defaultPlayer],
    }),
  };
  const defaultGame = createFakeGame({
    lastGameHistoryRecord: createFakeGameHistoryRecord({
      play: createFakeGameHistoryRecordPlay({
        action: "infect",
        targets: [createFakeGameHistoryRecordPlayTarget({ player: defaultPlayer })],
      }),
    }),
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };
  let wrapper: ReturnType<typeof mount<typeof GameAccursedWolfFatherMayHaveInfectedEvent>>;

  async function mountGameAccursedWolfFatherMayHaveInfectedEventComponent(options: ComponentMountingOptions<typeof GameAccursedWolfFatherMayHaveInfectedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameAccursedWolfFatherMayHaveInfectedEvent>>> {
    return mountSuspendedComponent(GameAccursedWolfFatherMayHaveInfectedEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameAccursedWolfFatherMayHaveInfectedEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameAccursedWolfFatherMayHaveInfectedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts", () => {
    it("should pass game accursed wolf father may have infected event texts when rendered.", () => {
      const gameAccursedWolfFatherMayHaveInfectedEvent = wrapper.findComponent<typeof GameEventWithTexts>("#game-accursed-wolf-father-may-have-infected-event");
      const expectedTexts: string[] = [
        "components.GameAccursedWolfFatherMayHaveInfectedEvent.accursedWolfFatherMayHaveInfectedAPlayer",
        "components.GameAccursedWolfFatherMayHaveInfectedEvent.gameMasterWillTapAccursedWolfFatherMarkVictim",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameAccursedWolfFatherMayHaveInfectedEvent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Event Flipping Last Play Targets Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameAccursedWolfFatherMayHaveInfectedEventComponent({
        global: {
          plugins: [createTestingPinia(testingPinia)],
          stubs: { GameEventWithTexts: false },
        },
      });
    });

    it("should not pass svg icon path when accursed wolf father didn't infect anyone.", async() => {
      wrapper = await mountGameAccursedWolfFatherMayHaveInfectedEventComponent({
        global: {
          plugins: [createTestingPinia(testingPinia)],
          stubs: { GameEventWithTexts: false },
        },
        props: {
          event: createFakeGameEvent({
            type: "accursed-wolf-father-may-have-infected",
            players: [],
          }),
        },
      });
      const gameAccursedWolfFatherVictimComponent = wrapper.findComponent<typeof GameEventFlippingLastPlayTargetsCard>("#game-event-flipping-card");

      expect(gameAccursedWolfFatherVictimComponent.props("svgIconPath")).toBeUndefined();
    });

    it("should pass svg icon path when accursed wolf father infected someone.", () => {
      const gameAccursedWolfFatherVictimComponent = wrapper.findComponent<typeof GameEventFlippingLastPlayTargetsCard>("#game-event-flipping-card");

      expect(gameAccursedWolfFatherVictimComponent.props("svgIconPath")).toBe("/svg/role/werewolf.svg");
    });
  });

  describe("Sound Effect", () => {
    it("should play evil demonic laugh sound effect when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("evil-demonic-laugh");
    });
  });
});