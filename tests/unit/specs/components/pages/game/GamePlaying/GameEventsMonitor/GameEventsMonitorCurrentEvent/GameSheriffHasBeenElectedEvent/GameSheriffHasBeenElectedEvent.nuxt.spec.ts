import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameSheriffHasBeenElectedEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffHasBeenElectedEvent/game-sheriff-has-been-elected-event.types";
import GameSheriffHasBeenElectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffHasBeenElectedEvent/GameSheriffHasBeenElectedEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { createFakeAccursedWolfFatherAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { createFakeGameEvent } from "~/tests/unit/utils/factories/stores/game/game-event/game-event.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Sheriff Has Been Elected Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameSheriffHasBeenElectedEvent>>;
  const defaultSheriffPlayer = createFakeAccursedWolfFatherAlivePlayer({ name: "Antoine" });
  const defaultProps: GameSheriffHasBeenElectedEventProps = {
    event: createFakeGameEvent({
      type: "sheriff-has-been-elected",
      players: [defaultSheriffPlayer],
    }),
  };

  async function mountGameSheriffHasBeenElectedEventComponent(options: ComponentMountingOptions<typeof GameSheriffHasBeenElectedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameSheriffHasBeenElectedEvent>>> {
    return mountSuspendedComponent(GameSheriffHasBeenElectedEvent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameSheriffHasBeenElectedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameSheriffHasBeenElectedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sheriff Has Been Elected Event Texts", () => {
    it("should pass default event texts when sheriff is defined.", () => {
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-sheriff-has-been-elected-event");
      const expectedTexts: string[] = [
        "components.GameSheriffHasBeenElectedEvent.sheriffHasBeenElected, {\"playerName\":\"Antoine\"}",
        "components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSheriffHasBeenElectedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find sheriff event text when sheriff is not defined.", async() => {
      wrapper = await mountGameSheriffHasBeenElectedEventComponent({ props: { event: createFakeGameEvent({ type: "sheriff-has-been-elected" }) } });
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-sheriff-has-been-elected-event");
      const expectedTexts: string[] = ["components.GameSheriffHasBeenElectedEvent.cantFindElectedSheriff"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameSheriffHasBeenElectedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Game Event Flipping Card", () => {
    beforeEach(async() => {
      wrapper = await mountGameSheriffHasBeenElectedEventComponent({ global: { stubs: { GameEventWithTexts: false } } });
    });

    it("should pass sheriff player when sheriff is defined.", () => {
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-sheriff-card");

      expect(gameSheriffHasBeenElectedEventComponent.props("players")).toStrictEqual<Player[]>([defaultSheriffPlayer]);
    });

    it("should not render flipping card when sheriff is not defined.", async() => {
      wrapper = await mountGameSheriffHasBeenElectedEventComponent({
        props: { event: createFakeGameEvent({ type: "sheriff-has-been-elected" }) },
        global: { stubs: { GameEventWithTexts: false } },
      });
      const gameSheriffHasBeenElectedEventComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-sheriff-card");

      expect(gameSheriffHasBeenElectedEventComponent.exists()).toBeFalsy();
    });
  });
});