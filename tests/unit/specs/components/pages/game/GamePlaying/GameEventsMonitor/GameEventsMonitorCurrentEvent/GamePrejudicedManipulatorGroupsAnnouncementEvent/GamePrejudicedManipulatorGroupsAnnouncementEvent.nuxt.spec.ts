import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeAccursedWolfFatherAlivePlayer, createFakePrejudicedManipulatorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GamePrejudicedManipulatorGroupsAnnouncementEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePrejudicedManipulatorGroupsAnnouncementEvent/GamePrejudicedManipulatorGroupsAnnouncementEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";

describe("Game Prejudiced Manipulator Groups Announcement Event Component", () => {
  const defaultPrejudicedManipulatorPlayer = createFakePrejudicedManipulatorAlivePlayer({
    name: "Antoine",
    group: "Boys",
  });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "prejudiced-manipulator-groups-announcement",
      players: [defaultPrejudicedManipulatorPlayer],
    }),
  };
  const defaultGame = createFakeGame({
    players: [
      defaultPrejudicedManipulatorPlayer,
      createFakeAccursedWolfFatherAlivePlayer({
        name: "Bobby",
        group: "Boys",
      }),
      createFakeAccursedWolfFatherAlivePlayer({
        name: "Cathy",
        group: "Girls",
      }),
      createFakeAccursedWolfFatherAlivePlayer({
        name: "Diddy",
        group: "Girls",
      }),
    ],
  });
  let wrapper: ReturnType<typeof mount<typeof GamePrejudicedManipulatorGroupsAnnouncementEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGamePrejudicedManipulatorGroupsAnnouncementEventComponent(options: ComponentMountingOptions<typeof GamePrejudicedManipulatorGroupsAnnouncementEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GamePrejudicedManipulatorGroupsAnnouncementEvent>>> {
    return mountSuspendedComponent(GamePrejudicedManipulatorGroupsAnnouncementEvent, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePrejudicedManipulatorGroupsAnnouncementEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGamePrejudicedManipulatorGroupsAnnouncementEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play evil laugh 2 sound when the component is mounted.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("evil-laugh-2");
  });

  describe("Prejudiced Manipulator Event Texts", () => {
    it("should pass texts to game event texts component when rendered.", () => {
      const prejudicedManipulatorComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-prejudiced-manipulator-groups-announcement-event");
      const expectedTexts: string[] = [
        `components.GamePrejudicedManipulatorGroupsAnnouncementEvent.prejudicedManipulatorIsInTheGame`,
        `components.GamePrejudicedManipulatorGroupsAnnouncementEvent.groupWithPlayers, {"playerGroup":"Boys","playersText":"Antoine shared.and Bobby"}`,
        `components.GamePrejudicedManipulatorGroupsAnnouncementEvent.groupWithPlayers, {"playerGroup":"Girls","playersText":"Cathy shared.and Diddy"}`,
        `components.GamePrejudicedManipulatorGroupsAnnouncementEvent.ifPrejudicedGroupIsAliveHeWins`,
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(prejudicedManipulatorComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("Flipping Card", () => {
      beforeEach(async() => {
        wrapper = await mountGamePrejudicedManipulatorGroupsAnnouncementEventComponent({
          global: {
            stubs: { GameEventWithTexts: false },
            plugins: [createTestingPinia(testingPinia)],
          },
          props: defaultProps,
        });
      });

      it("should not render flipping card when prejudiced manipulator is not in the game.", async() => {
        wrapper = await mountGamePrejudicedManipulatorGroupsAnnouncementEventComponent({
          global: {
            stubs: { GameEventWithTexts: false },
            plugins: [createTestingPinia(testingPinia)],
          },
          props: { event: createFakeGameEvent({ type: "prejudiced-manipulator-groups-announcement" }) },
        });
        const gameEventFlippingCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-prejudiced-manipulator-groups-announcement-card");

        expect(gameEventFlippingCard.exists()).toBeFalsy();
      });

      it("should pass prejudiced manipulator player when prejudiced manipulator is in the game.", () => {
        const gameEventFlippingCard = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-prejudiced-manipulator-groups-announcement-card");

        expect(gameEventFlippingCard.props("players")).toStrictEqual<Player[]>([defaultPrejudicedManipulatorPlayer]);
      });
    });
  });
});