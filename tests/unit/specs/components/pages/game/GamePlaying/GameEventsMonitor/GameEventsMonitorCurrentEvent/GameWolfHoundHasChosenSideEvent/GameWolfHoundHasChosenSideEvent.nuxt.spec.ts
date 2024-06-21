import { createTestingPinia } from "@pinia/testing";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeWolfHoundGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayerSide } from "@tests/unit/utils/factories/composables/api/game/player/player-side/player-side.factory";
import { createFakeSeerAlivePlayer, createFakeWolfHoundAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameWolfHoundHasChosenSideEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWolfHoundHasChosenSideEvent/GameWolfHoundHasChosenSideEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Wolf Hound Has Chosen Side Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameWolfHoundHasChosenSideEvent>>;
  const defaultWolfHoundPlayer = createFakeWolfHoundAlivePlayer({
    name: "Antoine",
    side: createFakePlayerSide({ current: "werewolves" }),
  });
  const defaultGame = createFakeGame({
    players: [
      defaultWolfHoundPlayer,
      createFakeSeerAlivePlayer(),
    ],
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameWolfHoundHasChosenSideEventComponent(options: ComponentMountingOptions<typeof GameWolfHoundHasChosenSideEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameWolfHoundHasChosenSideEvent>>> {
    return mountSuspendedComponent(GameWolfHoundHasChosenSideEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameWolfHoundHasChosenSideEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameWolfHoundHasChosenSideEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effect", () => {
    it("should play distant dog howling sound effect when chosen side is not revealed.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("distant-dog-howling");
    });

    it("should play dog barking sound effect when chosen side is revealed and villagers.", async() => {
      const villagerSidedWolfHoundPlayer = createFakeWolfHoundAlivePlayer({
        name: "Antoine",
        side: createFakePlayerSide({ current: "villagers" }),
      });
      const game = createFakeGame({
        players: [
          villagerSidedWolfHoundPlayer,
          createFakeSeerAlivePlayer(),
        ],
        options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ wolfHound: createFakeWolfHoundGameOptions({ isChosenSideRevealed: true }) }) }),
      });
      wrapper = await mountGameWolfHoundHasChosenSideEventComponent({ global: { plugins: [createTestingPinia({ initialState: { [StoreIds.GAME]: { game } } })] } });
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("dog-barking");
    });

    it("should play werewolf howling sound effect when chosen side is revealed and werewolves.", async() => {
      const werewolfSidedWolfHoundPlayer = createFakeWolfHoundAlivePlayer({
        name: "Antoine",
        side: createFakePlayerSide({ current: "werewolves" }),
      });
      const game = createFakeGame({
        players: [
          werewolfSidedWolfHoundPlayer,
          createFakeSeerAlivePlayer(),
        ],
        options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ wolfHound: createFakeWolfHoundGameOptions({ isChosenSideRevealed: true }) }) }),
      });
      wrapper = await mountGameWolfHoundHasChosenSideEventComponent({ global: { plugins: [createTestingPinia({ initialState: { [StoreIds.GAME]: { game } } })] } });
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("werewolf-howling");
    });
  });

  describe("Game Event Texts", () => {
    it("should pass can't find wolf hound text when wolf hound is not in the game.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        players: [createFakeSeerAlivePlayer()],
      });
      await nextTick();
      const gameWolfHoundHasChosenSideEventComponent = wrapper.findComponent<typeof GameWolfHoundHasChosenSideEvent>("#game-wolf-hound-has-chosen-side-event");
      const expectedTexts: string[] = ["components.GameWolfHoundHasChosenSideEvent.cantFindWolfHoundOrChosenSide"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWolfHoundHasChosenSideEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass assistant chose side for wolf hound revelation text when chosen side is random and revealed.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        options: createFakeGameOptions({
          roles: createFakeRolesGameOptions({
            wolfHound: createFakeWolfHoundGameOptions({
              isChosenSideRevealed: true,
              isSideRandomlyChosen: true,
            }),
          }),
        }),
      });
      await nextTick();
      const gameWolfHoundHasChosenSideEventComponent = wrapper.findComponent<typeof GameWolfHoundHasChosenSideEvent>("#game-wolf-hound-has-chosen-side-event");
      const expectedTexts: string[] = ["components.GameWolfHoundHasChosenSideEvent.assistantChoseSideForWolfHoundRevelation, {\"side\":\"shared.role.side.werewolves\"}"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWolfHoundHasChosenSideEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass wolf hound chose side for wolf hound revelation text when chosen side is not random and revealed.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        options: createFakeGameOptions({
          roles: createFakeRolesGameOptions({
            wolfHound: createFakeWolfHoundGameOptions({
              isChosenSideRevealed: true,
              isSideRandomlyChosen: false,
            }),
          }),
        }),
      });
      await nextTick();
      const gameWolfHoundHasChosenSideEventComponent = wrapper.findComponent<typeof GameWolfHoundHasChosenSideEvent>("#game-wolf-hound-has-chosen-side-event");
      const expectedTexts: string[] = ["components.GameWolfHoundHasChosenSideEvent.wolfHoundChoseSideRevelation, {\"side\":\"shared.role.side.werewolves\"}"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWolfHoundHasChosenSideEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass assistant chose side for wolf hound mime text when chosen side is random and not revealed.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        options: createFakeGameOptions({
          roles: createFakeRolesGameOptions({
            wolfHound: createFakeWolfHoundGameOptions({
              isChosenSideRevealed: false,
              isSideRandomlyChosen: true,
            }),
          }),
        }),
      });
      await nextTick();
      const gameWolfHoundHasChosenSideEventComponent = wrapper.findComponent<typeof GameWolfHoundHasChosenSideEvent>("#game-wolf-hound-has-chosen-side-event");
      const expectedTexts: string[] = ["components.GameWolfHoundHasChosenSideEvent.assistantChoseSideForWolfHoundMime, {\"side\":\"shared.role.side.werewolves\"}"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWolfHoundHasChosenSideEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass wolf hound chose side quietly for wolf hound mime text when chosen side is not random and not revealed.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        ...defaultGame,
        options: createFakeGameOptions({
          roles: createFakeRolesGameOptions({
            wolfHound: createFakeWolfHoundGameOptions({
              isChosenSideRevealed: false,
              isSideRandomlyChosen: false,
            }),
          }),
        }),
      });
      await nextTick();
      const gameWolfHoundHasChosenSideEventComponent = wrapper.findComponent<typeof GameWolfHoundHasChosenSideEvent>("#game-wolf-hound-has-chosen-side-event");
      const expectedTexts: string[] = ["components.GameWolfHoundHasChosenSideEvent.wolfHoundChoseSideQuietly"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameWolfHoundHasChosenSideEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});