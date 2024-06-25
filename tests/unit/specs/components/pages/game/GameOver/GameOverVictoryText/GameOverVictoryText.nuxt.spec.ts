import type { NuxtImg } from "#components";
import { createTestingPinia } from "@pinia/testing";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeCupidGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/cupid-game-options/cupid-game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeGameVictory } from "@tests/unit/utils/factories/composables/api/game/game-victory/game-victory.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeCupidAlivePlayer, createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import GameOverVictoryText from "~/components/pages/game/GameOver/GameOverVictoryText/GameOverVictoryText.vue";
import type { GameVictory } from "~/composables/api/game/types/game-victory/game-victory.class";
import type { Game } from "~/composables/api/game/types/game.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Over Victory Text Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverVictoryText>>;
  const defaultGame = createFakeGame();
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameOverVictoryTextComponent(): Promise<ReturnType<typeof mount<typeof GameOverVictoryText>>> {
    return mountSuspendedComponent(GameOverVictoryText, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    testingPinia.initialState[StoreIds.GAME].game = createFakeGame(defaultGame);
    wrapper = await mountGameOverVictoryTextComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Trophy Icon", () => {
    it("should render trophy icon when rendered.", () => {
      const trophyIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Trophy icon']");

      expect(trophyIcon.exists()).toBeTruthy();
    });
  });

  describe("Victory Type Icon", () => {
    it.each<{
      victory: GameVictory | undefined;
      expectedIcon: string;
      test: string;
    }>([
      {
        victory: undefined,
        expectedIcon: "svg/misc/question-mark.svg",
        test: "should render question mark icon when victory is undefined.",
      },
      {
        victory: createFakeGameVictory({ type: "werewolves" }),
        expectedIcon: "svg/role/werewolf.svg",
        test: "should render werewolves icon when victory type is werewolves.",
      },
      {
        victory: createFakeGameVictory({ type: "villagers" }),
        expectedIcon: "svg/role/villager.svg",
        test: "should render villagers icon when victory type is villagers.",
      },
      {
        victory: createFakeGameVictory({ type: "lovers" }),
        expectedIcon: "svg/role/lovers.svg",
        test: "should render lovers icon when victory type is lovers.",
      },
      {
        victory: createFakeGameVictory({ type: "angel" }),
        expectedIcon: "svg/role/angel.svg",
        test: "should render angel icon when victory type is angel.",
      },
      {
        victory: createFakeGameVictory({ type: "none" }),
        expectedIcon: "svg/game/player/dead.svg",
        test: "should render none icon when victory type is none.",
      },
      {
        victory: createFakeGameVictory({ type: "pied-piper" }),
        expectedIcon: "svg/role/pied-piper.svg",
        test: "should render pied piper icon when victory type is pied piper.",
      },
      {
        victory: createFakeGameVictory({ type: "prejudiced-manipulator" }),
        expectedIcon: "svg/role/prejudiced-manipulator.svg",
        test: "should render prejudiced manipulator icon when victory type is prejudiced manipulator.",
      },
      {
        victory: createFakeGameVictory({ type: "white-werewolf" }),
        expectedIcon: "svg/role/white-werewolf.svg",
        test: "should render white werewolf icon when victory type is white werewolf.",
      },
    ])("$test", async({ victory, expectedIcon }) => {
      const gameStore = useGameStore();
      gameStore.game.victory = victory;
      await nextTick();
      const victoryTypeIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Victory type icon']");

      expect(victoryTypeIcon.attributes("src")).toBe(expectedIcon);
    });
  });

  describe("Victory Type Text", () => {
    it.each<{
      game: Game;
      expectedText: string;
      test: string;
    }>([
      {
        game: createFakeGame({ victory: undefined }),
        expectedText: "??",
        test: "should render unknown text when victory is undefined.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "werewolves" }) }),
        expectedText: "components.GameOverVictoryText.werewolvesWin",
        test: "should render werewolves text when victory type is werewolves.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "villagers" }) }),
        expectedText: "components.GameOverVictoryText.villagersWin",
        test: "should render villagers text when victory type is villagers.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "lovers" }) }),
        expectedText: "components.GameOverVictoryText.loversWin",
        test: "should render lovers text when victory type is lovers.",
      },
      {
        game: createFakeGame({
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: true }) }) }),
          victory: createFakeGameVictory({ type: "lovers" }),
        }),
        expectedText: "components.GameOverVictoryText.loversAndCupidWin",
        test: "should render lovers and cupid text when victory type is lovers, cupid must win in options and there are 3 survivors.",
      },
      {
        game: createFakeGame({
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: true }) }) }),
          victory: createFakeGameVictory({ type: "lovers" }),
        }),
        expectedText: "components.GameOverVictoryText.loversWin",
        test: "should render lovers text when victory type is lovers, cupid must win in options but there are 2 survivors.",
      },
      {
        game: createFakeGame({
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeSeerAlivePlayer(),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: false }) }) }),
          victory: createFakeGameVictory({ type: "lovers" }),
        }),
        expectedText: "components.GameOverVictoryText.loversWin",
        test: "should render lovers text when victory type is lovers, there are 3 survivors but cupid must not win in options.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "angel" }) }),
        expectedText: "components.GameOverVictoryText.angelWins",
        test: "should render angel text when victory type is angel.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "none" }) }),
        expectedText: "components.GameOverVictoryText.nobodyWins",
        test: "should render none text when victory type is none.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "pied-piper" }) }),
        expectedText: "components.GameOverVictoryText.piedPiperWins",
        test: "should render pied piper text when victory type is pied piper.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "prejudiced-manipulator" }) }),
        expectedText: "components.GameOverVictoryText.prejudicedManipulatorWins",
        test: "should render prejudiced manipulator text when victory type is prejudiced manipulator.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "white-werewolf" }) }),
        expectedText: "components.GameOverVictoryText.whiteWerewolfWins",
        test: "should render white werewolf text when victory type is white werewolf.",
      },
    ])("$test", async({ game, expectedText }) => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame(game);
      await nextTick();
      const victoryTypeText = wrapper.find<HTMLHeadingElement>("#victory-text");

      expect(victoryTypeText.text()).toBe(expectedText);
    });
  });

  describe("Victory Type SubText", () => {
    it.each<{
      game: Game;
      expectedSubText: string;
      test: string;
    }>([
      {
        game: createFakeGame({
          victory: undefined,
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: true }) }) }),
        }),
        expectedSubText: "??",
        test: "should render unknown subtext when victory is undefined.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "werewolves" }) }),
        expectedSubText: "components.GameOverVictoryText.werewolvesHaveEatenALot",
        test: "should render werewolves subtext when victory type is werewolves.",
      },
      {
        game: createFakeGame({
          victory: createFakeGameVictory({ type: "villagers" }),
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: true }) }) }),
        }),
        expectedSubText: "components.GameOverVictoryText.villagersHaveSurvivedWerewolves",
        test: "should render villagers subtext when victory type is villagers.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "lovers" }) }),
        expectedSubText: "components.GameOverVictoryText.loversAreTogetherForever",
        test: "should render lovers subtext when victory type is lovers.",
      },
      {
        game: createFakeGame({
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: true }) }) }),
          victory: createFakeGameVictory({ type: "lovers" }),
        }),
        expectedSubText: "components.GameOverVictoryText.loversAndCupidAreTogetherForever",
        test: "should render lovers and cupid subtext when victory type is lovers, cupid must win in options and there are 3 survivors.",
      },
      {
        game: createFakeGame({
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: true }) }) }),
          victory: createFakeGameVictory({ type: "lovers" }),
        }),
        expectedSubText: "components.GameOverVictoryText.loversAreTogetherForever",
        test: "should render lovers subtext when victory type is lovers, cupid must win in options but there are 2 survivors.",
      },
      {
        game: createFakeGame({
          players: [
            createFakeSeerAlivePlayer(),
            createFakeSeerAlivePlayer({ isAlive: false }),
            createFakeSeerAlivePlayer(),
            createFakeCupidAlivePlayer(),
          ],
          options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ cupid: createFakeCupidGameOptions({ mustWinWithLovers: false }) }) }),
          victory: createFakeGameVictory({ type: "lovers" }),
        }),
        expectedSubText: "components.GameOverVictoryText.loversAreTogetherForever",
        test: "should render lovers subtext when victory type is lovers, there are 3 survivors but cupid must not win in options.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "angel" }) }),
        expectedSubText: "components.GameOverVictoryText.angelComesBackToParadise",
        test: "should render angel subtext when victory type is angel.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "none" }) }),
        expectedSubText: "components.GameOverVictoryText.everybodyMurderedEachOther",
        test: "should render none subtext when victory type is none.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "pied-piper" }) }),
        expectedSubText: "components.GameOverVictoryText.piedPiperHasControl",
        test: "should render pied piper subtext when victory type is pied piper.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "prejudiced-manipulator" }) }),
        expectedSubText: "components.GameOverVictoryText.prejudicedManipulatorGroupRemainsAlive",
        test: "should render prejudiced manipulator subtext when victory type is prejudiced manipulator.",
      },
      {
        game: createFakeGame({ victory: createFakeGameVictory({ type: "white-werewolf" }) }),
        expectedSubText: "components.GameOverVictoryText.whiteWerewolfWinsAlone",
        test: "should render white werewolf subtext when victory type is white werewolf.",
      },
    ])("$test", async({ game, expectedSubText }) => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame(game);
      await nextTick();
      const victoryTypeSubText = wrapper.find<HTMLParagraphElement>("#victory-sub-text");

      expect(victoryTypeSubText.text()).toBe(expectedSubText);
    });
  });
});