import { createTestingPinia } from "@pinia/testing";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { beforeEach } from "vitest";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameActorMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameActorMayHaveChosenCardEvent/GameActorMayHaveChosenCardEvent.vue";
import type GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Actor May Have Chosen Card Event Component", () => {
  const defaultActorPlayer = createFakeActorAlivePlayer({ name: "Antoine" });
  let wrapper: ReturnType<typeof mount<typeof GameActorMayHaveChosenCardEvent>>;
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "actor-may-have-chosen-card",
      players: [defaultActorPlayer],
    }),
  };
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameActorMayHaveChosenCardEventComponent(options: ComponentMountingOptions<typeof GameActorMayHaveChosenCardEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameActorMayHaveChosenCardEvent>>> {
    return mountSuspendedComponent(GameActorMayHaveChosenCardEvent, {
      props: defaultProps,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameActorMayHaveChosenCardEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameActorMayHaveChosenCardEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effect", () => {
    it("should play actor clear throat and knocks sound effect when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("actor-clear-throat-and-knocks");
    });
  });

  describe("Game Event Texts", () => {
    it("should set default event texts when rendered.", () => {
      const expectedTexts: string[] = [
        "components.GameActorMayHaveChosenCardEvent.actorMayHaveChosenCard",
        "components.GameActorMayHaveChosenCardEvent.gameMasterTakeOutChosenCard",
      ];
      const expectedTextsAsString = expectedTexts.join(",");
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameActorMayHaveChosenCardEvent>("#game-actor-may-have-chosen-card-event");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Flipping Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameActorMayHaveChosenCardEventComponent({
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

    it("should set svg icon path to undefined when chosen card is undefined.", () => {
      const flippingCard = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-last-play-source-card");

      expect(flippingCard.props("svgIconPath")).toBeUndefined();
    });

    it("should set svg icon path to actor svg role when chosen card is defined.", async() => {
      const chosenCard = createFakeGameAdditionalCard({
        roleName: "seer",
      });
      const gameStore = useGameStore();
      gameStore.game.lastGameHistoryRecord = createFakeGameHistoryRecord({
        play: createFakeGameHistoryRecordPlay({
          chosenCard,
        }),
      });
      await nextTick();
      const flippingCard = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-last-play-source-card");

      expect(flippingCard.props("svgIconPath")).toBe("/svg/role/actor.svg");
    });
  });
});