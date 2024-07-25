import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameDeathEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameDeathEvent/GameDeathEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Death Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameDeathEvent>>;
  const defaultGame = createFakeGame({ options: DEFAULT_GAME_OPTIONS });
  const defaultDeadPlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Benoit" }),
  ];
  const defaultProps: CurrentGameEventProps = { event: createFakeGameEvent({ players: defaultDeadPlayers }) };
  const initialState = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameDeathEventComponent(options: ComponentMountingOptions<typeof GameDeathEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameDeathEvent>>> {
    return mountSuspendedComponent(GameDeathEvent, {
      global: { plugins: [createTestingPinia(initialState)] },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameDeathEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameDeathEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play death sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("death");
  });

  describe("Player Dies Event Texts", () => {
    it("should pass event texts when rendered.", () => {
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GameDeathEvent>("#game-death-event");
      const expectedTexts: string[] = [
        "components.GameDeathEvent.playerDies, {\"playerName\":\"Antoine\"}",
        "components.GameDeathEvent.playerCanRevealRole",
        "components.GameDeathEvent.playerDies, {\"playerName\":\"Benoit\"}",
        "components.GameDeathEvent.playerCanRevealRole",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find dead player texts when player is not found in event.", async() => {
      wrapper = await mountGameDeathEventComponent({ props: { event: createFakeGameEvent({ players: [] }) } });
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GameDeathEvent>("#game-death-event");
      const expectedTexts: string[] = ["components.GameDeathEvent.cantFindDeadPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass can't find dead player texts when there are not players defined in event.", async() => {
      wrapper = await mountGameDeathEventComponent({ props: { event: createFakeGameEvent({ players: undefined }) } });
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GameDeathEvent>("#game-death-event");
      const expectedTexts: string[] = ["components.GameDeathEvent.cantFindDeadPlayer"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass event texts with player role remaining hidden when the options is activated.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ areRevealedOnDeath: false }) }) });
      await nextTick();
      const gamePlayerDiesEventComponent = wrapper.findComponent<typeof GameDeathEvent>("#game-death-event");
      const expectedTexts: string[] = [
        "components.GameDeathEvent.playerDies, {\"playerName\":\"Antoine\"}",
        "components.GameDeathEvent.playerDoesntRevealRole",
        "components.GameDeathEvent.playerDies, {\"playerName\":\"Benoit\"}",
        "components.GameDeathEvent.playerDoesntRevealRole",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePlayerDiesEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("On text change event", () => {
      it("should not call play sound effect when new game event text is not a death text.", () => {
        const audioStore = useAudioStore();
        const changedText = "components.GameDeathEvent.playerCanRevealRole";
        (wrapper.vm as unknown as { onGameEventTextChangeFromGameEventWithTexts: (event: string) => void }).onGameEventTextChangeFromGameEventWithTexts(changedText);

        expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("death");
      });

      it("should call play sound effect when new game event text is a death text.", () => {
        const audioStore = useAudioStore();
        const changedText = "components.GameDeathEvent.playerDies, {\"playerName\":\"Benoit\"}";
        (wrapper.vm as unknown as { onGameEventTextChangeFromGameEventWithTexts: (event: string) => void }).onGameEventTextChangeFromGameEventWithTexts(changedText);

        expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(1, "death");
        expect(audioStore.playSoundEffect).toHaveBeenNthCalledWith(2, "death");
      });
    });
  });

  describe("Player Dies Event Role Image", () => {
    beforeEach(async() => {
      wrapper = await mountGameDeathEventComponent({
        global: {
          stubs: { GameEventWithTexts: false },
          plugins: [createTestingPinia(initialState)],
        },
      });
    });

    it("should render player role image when dead player is found in event.", () => {
      const playerRoleImage = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");

      expect(playerRoleImage.props("players")).toStrictEqual<Player[]>(defaultDeadPlayers);
    });
  });
});