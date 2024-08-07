import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeBearTamerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameBearGrowlsOrSleepsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameBearGrowlsOrSleepsEvent/GameBearGrowlsOrSleepsEvent.vue";
import type GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";

describe("Game Bear Growl Or Sleeps Event Component", () => {
  const defaultBearTamerPlayer = createFakeBearTamerAlivePlayer({
    name: "Antoine",
  });
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "bear-growls",
      players: [defaultBearTamerPlayer],
    }),
  };
  let wrapper: ReturnType<typeof mount<typeof GameBearGrowlsOrSleepsEvent>>;

  async function mountGameBearGrowlsOrSleepsEventComponent(options: ComponentMountingOptions<typeof GameBearGrowlsOrSleepsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameBearGrowlsOrSleepsEvent>>> {
    return mountSuspendedComponent(GameBearGrowlsOrSleepsEvent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameBearGrowlsOrSleepsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameBearGrowlsOrSleepsEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound effect", () => {
    it("should play bear growling sound effect when bear growls.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("bear-growling");
    });

    it("should play calm bear eating sound effect when bear sleeps.", async() => {
      wrapper = await mountGameBearGrowlsOrSleepsEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "bear-sleeps",
            players: [defaultBearTamerPlayer],
          }),
        },
      });
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("calm-bear-eating");
    });
  });

  describe("Game Event Texts", () => {
    it("should pass bear tamer growls text when bear growls.", () => {
      const gameBearGrowlsOrSleepsEventComponent = wrapper.findComponent<typeof GameBearGrowlsOrSleepsEvent>("#game-bear-growls-or-sleeps-event");
      const expectedTexts: string[] = ["components.GameBearGrowlsOrSleepsEvent.bearGrowls"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameBearGrowlsOrSleepsEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass bear tamer sleeps text when bear sleeps.", async() => {
      wrapper = await mountGameBearGrowlsOrSleepsEventComponent({
        props: {
          event: createFakeGameEvent({
            type: "bear-sleeps",
            players: [defaultBearTamerPlayer],
          }),
        },
      });
      const gameBearGrowlsOrSleepsEventComponent = wrapper.findComponent<typeof GameBearGrowlsOrSleepsEvent>("#game-bear-growls-or-sleeps-event");
      const expectedTexts: string[] = ["components.GameBearGrowlsOrSleepsEvent.bearSleeps"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameBearGrowlsOrSleepsEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("Event Flipping Players Card", () => {
      beforeEach(async() => {
        wrapper = await mountGameBearGrowlsOrSleepsEventComponent({
          global: {
            stubs: { GameEventWithTexts: false },
          },
          props: defaultProps,
        });
      });

      it("should pass angry bear svg for svg icon path when bear growls.", () => {
        const gameEventFlippingCard = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-bear-tamer-card");

        expect(gameEventFlippingCard.props("svgIconPath")).toBe("svg/role/angry-bear.svg");
      });

      it("should pass sleeping bear svg for svg icon path when bear sleeps.", async() => {
        wrapper = await mountGameBearGrowlsOrSleepsEventComponent({
          global: {
            stubs: { GameEventWithTexts: false },
          },
          props: {
            event: createFakeGameEvent({
              type: "bear-sleeps",
              players: [defaultBearTamerPlayer],
            }),
          },
        });
        const gameEventFlippingCard = wrapper.findComponent<typeof GameEventFlippingPlayersCard>("#game-event-flipping-bear-tamer-card");

        expect(gameEventFlippingCard.props("svgIconPath")).toBe("svg/role/cool-bear.svg");
      });
    });
  });
});