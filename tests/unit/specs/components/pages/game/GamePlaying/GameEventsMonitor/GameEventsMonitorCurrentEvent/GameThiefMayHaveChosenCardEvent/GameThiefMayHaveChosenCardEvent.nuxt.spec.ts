import { createTestingPinia } from "@pinia/testing";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeThiefAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { beforeEach } from "vitest";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import type GameActorMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameActorMayHaveChosenCardEvent/GameActorMayHaveChosenCardEvent.vue";
import GameThiefMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameThiefMayHaveChosenCardEvent/GameThiefMayHaveChosenCardEvent.vue";
import type GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Thief May Have Chosen Card Event Component", () => {
  const defaultThiefPlayer = createFakeThiefAlivePlayer({ name: "Antoine" });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "thief-may-have-chosen-card",
      players: [defaultThiefPlayer],
    }),
  };
  const defaultGame = createFakeGame({
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };
  let wrapper: ReturnType<typeof mount<typeof GameThiefMayHaveChosenCardEvent>>;

  async function mountGameThiefMayHaveChosenCardEventComponent(options: ComponentMountingOptions<typeof GameThiefMayHaveChosenCardEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameThiefMayHaveChosenCardEvent>>> {
    return mountSuspendedComponent(GameThiefMayHaveChosenCardEvent, {
      props: defaultProps,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameThiefMayHaveChosenCardEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameThiefMayHaveChosenCardEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effect", () => {
    it("should play evil laugh sound effect when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("evil-laugh");
    });
  });

  describe("Game Event Texts", () => {
    it("should pass can't find thief player text when thief player is not found.", async() => {
      wrapper = await mountGameThiefMayHaveChosenCardEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "thief-may-have-chosen-card",
          }),
        },
      });
      const gameThiefMayHaveChosenCardComponent = wrapper.findComponent<typeof GameActorMayHaveChosenCardEvent>("#game-thief-may-have-chosen-card-event");
      const expectedTexts: string[] = ["components.GameThiefMayHaveChosenCardEvent.cantFindThief"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameThiefMayHaveChosenCardComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass thief revealed card texts with revealed card when option is activated and thief has chosen a card.", async() => {
      const chosenCard = createFakeGameAdditionalCard({
        roleName: "seer",
      });
      const gameStore = useGameStore();
      gameStore.game.options.roles.thief.isChosenCardRevealed = true;
      gameStore.game.lastGameHistoryRecord = createFakeGameHistoryRecord({
        play: createFakeGameHistoryRecordPlay({
          chosenCard,
        }),
      });
      await nextTick();
      const gameThiefMayHaveChosenCardComponent = wrapper.findComponent<typeof GameActorMayHaveChosenCardEvent>("#game-thief-may-have-chosen-card-event");
      const expectedTexts: string[] = [
        "components.GameThiefMayHaveChosenCardEvent.thiefChosenCardIsRevealed",
        `components.GameThiefMayHaveChosenCardEvent.thiefHasChosenCard, {"roleName":"shared.role.definiteName.seer, 1"}`,
        "components.GameThiefMayHaveChosenCardEvent.gameMasterCanTakeAwayRemainingCards",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameThiefMayHaveChosenCardComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass thief has not chosen card text when option is activated and thief has not chosen a card.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.roles.thief.isChosenCardRevealed = true;
      await nextTick();
      const gameThiefMayHaveChosenCardComponent = wrapper.findComponent<typeof GameActorMayHaveChosenCardEvent>("#game-thief-may-have-chosen-card-event");
      const expectedTexts: string[] = [
        "components.GameThiefMayHaveChosenCardEvent.thiefChosenCardIsRevealed",
        "components.GameThiefMayHaveChosenCardEvent.thiefHasNotChosenCard",
        "components.GameThiefMayHaveChosenCardEvent.gameMasterCanTakeAwayRemainingCards",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameThiefMayHaveChosenCardComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass thief may have chosen card texts when chosen card is not revealed.", () => {
      const gameThiefMayHaveChosenCardComponent = wrapper.findComponent<typeof GameActorMayHaveChosenCardEvent>("#game-thief-may-have-chosen-card-event");
      const expectedTexts: string[] = [
        "components.GameThiefMayHaveChosenCardEvent.thiefMayHaveChosenCard",
        "components.GameThiefMayHaveChosenCardEvent.gameMasterWillSwitchCardsIfThiefChoseCard",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameThiefMayHaveChosenCardComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("Flipping Card", () => {
      beforeEach(async() => {
        wrapper = await mountGameThiefMayHaveChosenCardEventComponent({
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
        const gameThiefMayHaveChosenCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-last-play-source-card");

        expect(gameThiefMayHaveChosenCardComponent.props("svgIconPath")).toBeUndefined();
      });

      it("should set svg icon path to thief role svg icon path when chosen card is defined.", async() => {
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
        const gameThiefMayHaveChosenCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-last-play-source-card");

        expect(gameThiefMayHaveChosenCardComponent.props("svgIconPath")).toBe("/svg/role/thief.svg");
      });
    });
  });
});