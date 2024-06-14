import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Radash from "radash";
import { vi } from "vitest";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import type GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import type GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlayCupidCharms, createFakeGamePlaySurvivorsElectSheriff } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeActorAlivePlayer, createFakeCupidAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

const { radash: mockedRadash } = vi.hoisted(() => ({ radash: { shuffle: vi.fn() } }));

vi.mock("radash", async importOriginal => ({
  ...await importOriginal<typeof Radash>(),
  shuffle: vi.fn(mockedRadash.shuffle),
}));

describe("Game Starts Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameStartsEvent>>;
  const defaultPlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeCupidAlivePlayer({ name: "Benoit" }),
    createFakeActorAlivePlayer({ name: "Cyril" }),
    createFakeWerewolfAlivePlayer({ name: "Tak" }),
    createFakeWerewolfAlivePlayer({ name: "Joe" }),
  ];
  const defaultGame = createFakeGame({
    players: defaultPlayers,
    currentPlay: createFakeGamePlaySurvivorsElectSheriff(),
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameStartsEventComponent(options: ComponentMountingOptions<typeof GameStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameStartsEvent>>> {
    return mountSuspendedComponent(GameStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    mockedRadash.shuffle.mockReturnValue([]);
    wrapper = await mountGameStartsEventComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame({
      players: defaultPlayers,
      currentPlay: createFakeGamePlaySurvivorsElectSheriff(),
      options: DEFAULT_GAME_OPTIONS,
    });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Starts Event texts", () => {
    it("should have texts for the game starts event containing sheriff election when first action is sheriff election.", async() => {
      mockedRadash.shuffle.mockReturnValue([
        ["seer", 1],
        ["cupid", 1],
        ["actor", 1],
        ["werewolf", 2],
      ]);
      wrapper = await mountGameStartsEventComponent();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-starts-event");
      const expectedCompositionText = `1 shared.role.name.seer, 1, 1 shared.role.name.cupid, 1, 1 shared.role.name.actor, 1 shared.and 2 shared.role.name.werewolf, 2.`;
      const expectedTexts: string[] = [
        "components.GameStartsEvent.welcomeToTheVillage",
        `components.GameStartsEvent.gameCompositionEvent, {"composition":"${expectedCompositionText}"}`,
        "components.GameStartsEvent.looksLifeSomeWerewolvesSneakedIntoTheVillage",
        "components.GameStartsEvent.villagersMurderWerewolves",
        "components.GameStartsEvent.letsElectSheriffBefore",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should have texts for the game starts event without sheriff election when first action is not sheriff election.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayCupidCharms();
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-starts-event");
      const expectedTexts: string[] = [
        "components.GameStartsEvent.welcomeToTheVillage",
        `components.GameStartsEvent.gameCompositionEvent, {"composition":""}`,
        "components.GameStartsEvent.looksLifeSomeWerewolvesSneakedIntoTheVillage",
        "components.GameStartsEvent.villagersMurderWerewolves",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should have texts for the game starts event without sheriff election when there is no current play.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-starts-event");
      const expectedTexts: string[] = [
        "components.GameStartsEvent.welcomeToTheVillage",
        `components.GameStartsEvent.gameCompositionEvent, {"composition":""}`,
        "components.GameStartsEvent.looksLifeSomeWerewolvesSneakedIntoTheVillage",
        "components.GameStartsEvent.villagersMurderWerewolves",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should have texts for the game starts event with composition hidden when composition is hidden in game options.", async() => {
      const gameStore = useGameStore();
      gameStore.game.options.composition.isHidden = true;
      await nextTick();
      const gameEventWithTextsComponent = wrapper.findComponent<typeof GameEventWithTexts>("#game-starts-event");
      const expectedTexts: string[] = [
        "components.GameStartsEvent.welcomeToTheVillage",
        "components.GameStartsEvent.compositionIsHidden",
        "components.GameStartsEvent.looksLifeSomeWerewolvesSneakedIntoTheVillage",
        "components.GameStartsEvent.villagersMurderWerewolves",
        "components.GameStartsEvent.letsElectSheriffBefore",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameEventWithTextsComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("Game Event Flipping Player Card", () => {
      beforeEach(async() => {
        wrapper = await mountGameStartsEventComponent({
          global: {
            stubs: { GameEventWithTexts: false },
            plugins: [createTestingPinia(testingPinia)],
          },
        });
      });

      it("should pass all players to the game event flipping player card component when rendered.", () => {
        const gameEventFlippingPlayerCardComponent = wrapper.findComponent<typeof GameEventFlippingPlayerCard>("#game-event-flipping-player-card");
        const players = gameEventFlippingPlayerCardComponent.props("players") as Player[];

        expect(players).toStrictEqual<Player[]>(defaultPlayers);
      });
    });
  });
});