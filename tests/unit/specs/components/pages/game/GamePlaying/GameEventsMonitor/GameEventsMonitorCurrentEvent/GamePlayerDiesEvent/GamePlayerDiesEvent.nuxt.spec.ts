import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GamePlayerDiesEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/game-player-dies-event.types";
import GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/GamePlayerDiesEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { createFakeGameEvent } from "~/tests/unit/utils/factories/stores/game/game-event/game-event.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Player Dies Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlayerDiesEvent>>;
  const defaultGame = createFakeGame({ options: DEFAULT_GAME_OPTIONS });
  const defaultDeadPlayer = createFakeSeerAlivePlayer({ name: "Antoine" });
  const defaultProps: GamePlayerDiesEventProps = { event: createFakeGameEvent({ players: [defaultDeadPlayer] }) };
  const initialState = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGamePlayerDiesEventComponent(options: ComponentMountingOptions<typeof GamePlayerDiesEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlayerDiesEvent>>> {
    return mountSuspendedComponent(GamePlayerDiesEvent, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(initialState)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlayerDiesEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGamePlayerDiesEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play death sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("death");
  });

  describe("Player Dies Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GamePlayerDiesEvent>("#game-player-dies-event");
      const expectedTexts: string[] = [
        "components.GamePlayerDiesEvent.playerDies, {\"playerName\":\"Antoine\"}",
        "components.GamePlayerDiesEvent.playerCanRevealRole",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find dead player texts when player is not found in event.", async() => {
      wrapper = await mountGamePlayerDiesEventComponent({ props: { event: createFakeGameEvent({ players: [] }) } });
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GamePlayerDiesEvent>("#game-player-dies-event");
      const expectedTexts: string[] = ["components.GamePlayerDiesEvent.cantFindDeadPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find dead player texts when there are not players defined in event.", async() => {
      wrapper = await mountGamePlayerDiesEventComponent({ props: { event: createFakeGameEvent({ players: undefined }) } });
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GamePlayerDiesEvent>("#game-player-dies-event");
      const expectedTexts: string[] = ["components.GamePlayerDiesEvent.cantFindDeadPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with player role remaining hidden when the options is activated.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ areRevealedOnDeath: false }) }) });
      await nextTick();
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GamePlayerDiesEvent>("#game-player-dies-event");
      const expectedTexts: string[] = [
        "components.GamePlayerDiesEvent.playerDies, {\"playerName\":\"Antoine\"}",
        "components.GamePlayerDiesEvent.playerDoesntRevealRole",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });

  describe("Player Dies Event Role Image", () => {
    beforeEach(async() => {
      wrapper = await mountGamePlayerDiesEventComponent({
        global: {
          stubs: { GameEventWithTexts: false },
          plugins: [createTestingPinia(initialState)],
        },
      });
    });

    it("should render player role image when dead player is found in event.", () => {
      const playerRoleImage = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(playerRoleImage.props("players")).toStrictEqual<Player[]>([defaultDeadPlayer]);
    });

    it("should not render player role image when dead player is not found in event.", async() => {
      wrapper = await mountGamePlayerDiesEventComponent({
        global: {
          stubs: { GameEventWithTexts: false },
          plugins: [createTestingPinia(initialState)],
        },
        props: { event: createFakeGameEvent({ players: [] }) },
      });
      const playerRoleImage = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(playerRoleImage.exists()).toBeFalsy();
    });

    it("should not render player role image when there are not players defined in event.", async() => {
      wrapper = await mountGamePlayerDiesEventComponent({
        global: {
          stubs: { GameEventWithTexts: false },
          plugins: [createTestingPinia(initialState)],
        },
        props: { event: createFakeGameEvent({ players: undefined }) },
      });
      const playerRoleImage = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(playerRoleImage.exists()).toBeFalsy();
    });
  });
});