import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GamePlaygroundHeaderCurrentPlay from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderCurrentPlay/GamePlaygroundHeaderCurrentPlay.vue";
import type { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay, createFakeGamePlayAccursedWolfFatherInfects, createFakeGamePlayActorChoosesCard, createFakeGamePlayBearTamerGrowls, createFakeGamePlayBigBadWolfEats, createFakeGamePlayCharmedMeetEachOther, createFakeGamePlayCupidCharms, createFakeGamePlayDefenderProtects, createFakeGamePlayFoxSniffs, createFakeGamePlayHunterShoots, createFakeGamePlayLoversMeetEachOther, createFakeGamePlayPiedPiperCharms, createFakeGamePlayScandalmongerMarks, createFakeGamePlayScapegoatBansVoting, createFakeGamePlaySeerLooks, createFakeGamePlaySheriffDelegates, createFakeGamePlaySheriffSettlesVotes, createFakeGamePlayStutteringJudgeRequestsAnotherVote, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlaySurvivorsVote, createFakeGamePlayThiefChoosesCard, createFakeGamePlayThreeBrothersMeetEachOther, createFakeGamePlayTwoSistersMeetEachOther, createFakeGamePlayWerewolvesEat, createFakeGamePlayWhiteWerewolfEats, createFakeGamePlayWildChildChoosesModel, createFakeGamePlayWitchUsesPotions, createFakeGamePlayWolfHoundChoosesSide } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Header Current Play Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundHeaderCurrentPlay>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          currentPlay: createFakeGamePlay({
            source: createFakeGamePlaySource({ name: "sheriff" }),
            action: "delegate",
          }),
        }),
      },
    },
  };

  async function mountGamePlaygroundHeaderCurrentPlayComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundHeaderCurrentPlay>>> {
    return mountSuspendedComponent(GamePlaygroundHeaderCurrentPlay, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundHeaderCurrentPlayComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Current play SVG icon", () => {
    it("should not render the current play SVG icon when the current play is unknown.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({
        source: createFakeGamePlaySource({ name: RoleNames.HUNTER }),
        action: "delegate",
      });
      await nextTick();
      const currentPlayIcon = wrapper.find<HTMLImageElement>("[alt='Current play icon']");

      expect(currentPlayIcon.exists()).toBeFalsy();
    });

    it.each<{
      currentGamePlay: GamePlay;
      expectedIconPath: string;
      test: string;
    }>([
      {
        currentGamePlay: createFakeGamePlayAccursedWolfFatherInfects(),
        expectedIconPath: "/svg/role/accursed-wolf-father.svg",
        test: "should render the current play SVG icon for the accursed wolf father infects.",
      },
      {
        currentGamePlay: createFakeGamePlayActorChoosesCard(),
        expectedIconPath: "/svg/role/actor.svg",
        test: "should render the current play SVG icon for the actor chooses card.",
      },
      {
        currentGamePlay: createFakeGamePlayBearTamerGrowls(),
        expectedIconPath: "/svg/role/bear-tamer.svg",
        test: "should render the current play SVG icon for the bear tamer growls.",
      },
      {
        currentGamePlay: createFakeGamePlayBigBadWolfEats(),
        expectedIconPath: "/svg/role/big-bad-wolf.svg",
        test: "should render the current play SVG icon for the big bad wolf eats.",
      },
      {
        currentGamePlay: createFakeGamePlayCharmedMeetEachOther(),
        expectedIconPath: "/svg/role/pied-piper.svg",
        test: "should render the current play SVG icon for the charmed meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayCupidCharms(),
        expectedIconPath: "/svg/role/cupid.svg",
        test: "should render the current play SVG icon for the cupid charms.",
      },
      {
        currentGamePlay: createFakeGamePlayDefenderProtects(),
        expectedIconPath: "/svg/role/defender.svg",
        test: "should render the current play SVG icon for the defender protects.",
      },
      {
        currentGamePlay: createFakeGamePlayFoxSniffs(),
        expectedIconPath: "/svg/role/fox.svg",
        test: "should render the current play SVG icon for the fox sniffs.",
      },
      {
        currentGamePlay: createFakeGamePlayHunterShoots(),
        expectedIconPath: "/svg/role/hunter.svg",
        test: "should render the current play SVG icon for the hunter shoots.",
      },
      {
        currentGamePlay: createFakeGamePlayLoversMeetEachOther(),
        expectedIconPath: "/svg/role/lovers.svg",
        test: "should render the current play SVG icon for the lovers meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayPiedPiperCharms(),
        expectedIconPath: "/svg/role/pied-piper.svg",
        test: "should render the current play SVG icon for the pied piper charms.",
      },
      {
        currentGamePlay: createFakeGamePlayScandalmongerMarks(),
        expectedIconPath: "/svg/role/scandalmonger.svg",
        test: "should render the current play SVG icon for the scandalmonger marks.",
      },
      {
        currentGamePlay: createFakeGamePlayScapegoatBansVoting(),
        expectedIconPath: "/svg/role/scapegoat.svg",
        test: "should render the current play SVG icon for the scapegoat bans voting.",
      },
      {
        currentGamePlay: createFakeGamePlaySeerLooks(),
        expectedIconPath: "/svg/role/seer.svg",
        test: "should render the current play SVG icon for the seer looks.",
      },
      {
        currentGamePlay: createFakeGamePlaySheriffDelegates(),
        expectedIconPath: "/svg/game/player/player-attribute/sheriff.svg",
        test: "should render the current play SVG icon for the sheriff delegates.",
      },
      {
        currentGamePlay: createFakeGamePlaySheriffSettlesVotes(),
        expectedIconPath: "/svg/game/game-play/game-play-action/settle-votes.svg",
        test: "should render the current play SVG icon for the sheriff settles votes.",
      },
      {
        currentGamePlay: createFakeGamePlayStutteringJudgeRequestsAnotherVote(),
        expectedIconPath: "/svg/role/stuttering-judge.svg",
        test: "should render the current play SVG icon for the stuttering judge requests another vote.",
      },
      {
        currentGamePlay: createFakeGamePlaySurvivorsBuryDeadBodies(),
        expectedIconPath: "/svg/game/player/dead.svg",
        test: "should render the current play SVG icon for the survivors bury dead bodies.",
      },
      {
        currentGamePlay: createFakeGamePlaySurvivorsElectSheriff(),
        expectedIconPath: "/svg/game/player/player-attribute/sheriff.svg",
        test: "should render the current play SVG icon for the survivors elect sheriff.",
      },
      {
        currentGamePlay: createFakeGamePlaySurvivorsVote(),
        expectedIconPath: "/svg/game/game-play/game-play-action/vote.svg",
        test: "should render the current play SVG icon for the survivors vote.",
      },
      {
        currentGamePlay: createFakeGamePlayThiefChoosesCard(),
        expectedIconPath: "/svg/role/thief.svg",
        test: "should render the current play SVG icon for the thief chooses card.",
      },
      {
        currentGamePlay: createFakeGamePlayThreeBrothersMeetEachOther(),
        expectedIconPath: "/svg/role/three-brothers.svg",
        test: "should render the current play SVG icon for the three brothers meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayTwoSistersMeetEachOther(),
        expectedIconPath: "/svg/role/two-sisters.svg",
        test: "should render the current play SVG icon for the two sisters meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayWerewolvesEat(),
        expectedIconPath: "/svg/role/werewolf.svg",
        test: "should render the current play SVG icon for the werewolves eat.",
      },
      {
        currentGamePlay: createFakeGamePlayWhiteWerewolfEats(),
        expectedIconPath: "/svg/role/white-werewolf.svg",
        test: "should render the current play SVG icon for the white werewolf eats.",
      },
      {
        currentGamePlay: createFakeGamePlayWildChildChoosesModel(),
        expectedIconPath: "/svg/role/wild-child.svg",
        test: "should render the current play SVG icon for the wild child chooses model.",
      },
      {
        currentGamePlay: createFakeGamePlayWitchUsesPotions(),
        expectedIconPath: "/svg/role/witch.svg",
        test: "should render the current play SVG icon for the witch uses potions.",
      },
      {
        currentGamePlay: createFakeGamePlayWolfHoundChoosesSide(),
        expectedIconPath: "/svg/role/wolf-hound.svg",
        test: "should render the current play SVG icon for the wolf hound chooses side.",
      },
    ])("$test", async({ currentGamePlay, expectedIconPath }) => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = currentGamePlay;
      await nextTick();
      const currentPlayIcon = wrapper.find<HTMLImageElement>("[alt='Current play icon']");

      expect(currentPlayIcon.attributes("src")).toBe(expectedIconPath);
    });
  });

  describe("Current play text", () => {
    it.each<{
      currentGamePlay: GamePlay | null;
      expectedText: string;
      test: string;
    }>([
      {
        currentGamePlay: null,
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.unknownGamePlay",
        test: "should render the current play text for an unknown game play when game current play is null.",
      },
      {
        currentGamePlay: createFakeGamePlay({
          source: createFakeGamePlaySource({ name: RoleNames.HUNTER }),
          action: "delegate",
        }),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.unknownGamePlay",
        test: "should render the current play text for an unknown game play.",
      },
      {
        currentGamePlay: createFakeGamePlayAccursedWolfFatherInfects(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.accursedWolfFatherInfects",
        test: "should render the current play text for the accursed wolf father infects.",
      },
      {
        currentGamePlay: createFakeGamePlayActorChoosesCard(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.actorChoosesCard",
        test: "should render the current play text for the actor chooses card.",
      },
      {
        currentGamePlay: createFakeGamePlayBearTamerGrowls(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.bearTamerGrowls",
        test: "should render the current play text for the bear tamer growls.",
      },
      {
        currentGamePlay: createFakeGamePlayBigBadWolfEats(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.bigBadWolfEats",
        test: "should render the current play text for the big bad wolf eats.",
      },
      {
        currentGamePlay: createFakeGamePlayCharmedMeetEachOther(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.charmedPeopleMeetEachOther",
        test: "should render the current play text for the charmed meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayCupidCharms(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.cupidCharms",
        test: "should render the current play text for the cupid charms.",
      },
      {
        currentGamePlay: createFakeGamePlayDefenderProtects(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.defenderProtects",
        test: "should render the current play text for the defender protects.",
      },
      {
        currentGamePlay: createFakeGamePlayFoxSniffs(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.foxSniffs",
        test: "should render the current play text for the fox sniffs.",
      },
      {
        currentGamePlay: createFakeGamePlayHunterShoots(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.hunterShoots",
        test: "should render the current play text for the hunter shoots.",
      },
      {
        currentGamePlay: createFakeGamePlayLoversMeetEachOther(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.loversMeetEachOther",
        test: "should render the current play text for the lovers meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayPiedPiperCharms(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.piedPiperCharms",
        test: "should render the current play text for the pied piper charms.",
      },
      {
        currentGamePlay: createFakeGamePlayScandalmongerMarks(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.scandalmongerMarks",
        test: "should render the current play text for the scandalmonger marks.",
      },
      {
        currentGamePlay: createFakeGamePlayScapegoatBansVoting(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.scapegoatBansVoting",
        test: "should render the current play text for the scapegoat bans voting.",
      },
      {
        currentGamePlay: createFakeGamePlaySeerLooks(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.seerLooks",
        test: "should render the current play text for the seer looks.",
      },
      {
        currentGamePlay: createFakeGamePlaySheriffDelegates(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.sheriffDelegates",
        test: "should render the current play text for the sheriff delegates.",
      },
      {
        currentGamePlay: createFakeGamePlaySheriffSettlesVotes(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.sheriffSettlesVotes",
        test: "should render the current play text for the sheriff settles votes.",
      },
      {
        currentGamePlay: createFakeGamePlayStutteringJudgeRequestsAnotherVote(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.stutteringJudgeRequestsAnotherVote",
        test: "should render the current play text for the stuttering judge requests another vote.",
      },
      {
        currentGamePlay: createFakeGamePlaySurvivorsBuryDeadBodies(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.survivorsBuryDeadBodies",
        test: "should render the current play text for the survivors bury dead bodies.",
      },
      {
        currentGamePlay: createFakeGamePlaySurvivorsElectSheriff(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.survivorsElectSheriff",
        test: "should render the current play text for the survivors elect sheriff.",
      },
      {
        currentGamePlay: createFakeGamePlaySurvivorsVote(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.survivorsVote",
        test: "should render the current play text for the survivors vote.",
      },
      {
        currentGamePlay: createFakeGamePlayThiefChoosesCard(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.thiefChoosesCard",
        test: "should render the current play text for the thief chooses card.",
      },
      {
        currentGamePlay: createFakeGamePlayThreeBrothersMeetEachOther(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.threeBrothersMeetEachOther",
        test: "should render the current play text for the three brothers meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayTwoSistersMeetEachOther(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.twoSistersMeetEachOther",
        test: "should render the current play text for the two sisters meet each other.",
      },
      {
        currentGamePlay: createFakeGamePlayWerewolvesEat(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.werewolvesEat",
        test: "should render the current play text for the werewolves eat.",
      },
      {
        currentGamePlay: createFakeGamePlayWhiteWerewolfEats(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.whiteWerewolfEats",
        test: "should render the current play text for the white werewolf eats.",
      },
      {
        currentGamePlay: createFakeGamePlayWildChildChoosesModel(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.wildChildChoosesModel",
        test: "should render the current play text for the wild child chooses model.",
      },
      {
        currentGamePlay: createFakeGamePlayWitchUsesPotions(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.witchUsesPotions",
        test: "should render the current play text for the witch uses potions.",
      },
      {
        currentGamePlay: createFakeGamePlayWolfHoundChoosesSide(),
        expectedText: "components.GamePlaygroundHeaderCurrentPlay.wolfHoundChoosesSide",
        test: "should render the current play text for the wolf hound chooses side.",
      },
    ])("$test", async({ currentGamePlay, expectedText }) => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = currentGamePlay;
      await nextTick();
      const currentPlayText = wrapper.find<HTMLHeadingElement>("#current-play-text");

      expect(currentPlayText.text()).toBe(expectedText);
    });
  });
});