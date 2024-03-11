import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import CurrentPlayQuestion from "~/components/pages/game/GamePlaying/GamePlayground/CurrentPlayQuestion/CurrentPlayQuestion.vue";
import type { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlayAccursedWolfFatherInfects, createFakeGamePlayActorChoosesCard, createFakeGamePlayBearTamerGrowls, createFakeGamePlayBigBadWolfEats, createFakeGamePlayCharmedMeetEachOther, createFakeGamePlayCupidCharms, createFakeGamePlayDefenderProtects, createFakeGamePlayFoxSniffs, createFakeGamePlayHunterShoots, createFakeGamePlayLoversMeetEachOther, createFakeGamePlayPiedPiperCharms, createFakeGamePlayScandalmongerMarks, createFakeGamePlayScapegoatBansVoting, createFakeGamePlaySeerLooks, createFakeGamePlaySheriffDelegates, createFakeGamePlaySheriffSettlesVotes, createFakeGamePlayStutteringJudgeRequestsAnotherVote, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlaySurvivorsVote, createFakeGamePlayThiefChoosesCard, createFakeGamePlayThreeBrothersMeetEachOther, createFakeGamePlayTwoSistersMeetEachOther, createFakeGamePlayWerewolvesEat, createFakeGamePlayWhiteWerewolfEats, createFakeGamePlayWildChildChoosesModel, createFakeGamePlayWitchUsesPotions, createFakeGamePlayWolfHoundChoosesSide } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Current Play Question Component", () => {
  let wrapper: ReturnType<typeof mount<typeof CurrentPlayQuestion>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ currentPlay: createFakeGamePlayCupidCharms() }) } } };

  async function mountCurrentPlayQuestionComponent(): Promise<ReturnType<typeof mount<typeof CurrentPlayQuestion>>> {
    return mountSuspendedComponent(CurrentPlayQuestion, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountCurrentPlayQuestionComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it.each<{
    currentPlay: GamePlay | null;
    expectedQuestion: string;
    test: string;
  }>([
    {
      currentPlay: null,
      expectedQuestion: "components.CurrentPlayQuestion.unknownQuestionForCurrentPlay",
      test: "should render nothing when current play is null.",
    },
    {
      currentPlay: createFakeGamePlayAccursedWolfFatherInfects(),
      expectedQuestion: "components.CurrentPlayQuestion.doesAccursedWolfFatherWantToInfect",
      test: "should render the question for accursed wolf father infects when current play is accursed wolf father who infects.",
    },
    {
      currentPlay: createFakeGamePlayActorChoosesCard(),
      expectedQuestion: "components.CurrentPlayQuestion.doesActorWantToChooseCard",
      test: "should render the question for actor chooses card when current play is actor who chooses card.",
    },
    {
      currentPlay: createFakeGamePlayBearTamerGrowls(),
      expectedQuestion: "components.CurrentPlayQuestion.bearGrowled",
      test: "should render the question for bear tamer growls when current play is bear tamer who growls.",
    },
    {
      currentPlay: createFakeGamePlayBigBadWolfEats(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesBigBadWolfEat",
      test: "should render the question for big bad wolf eats when current play is big bad wolf who eats.",
    },
    {
      currentPlay: createFakeGamePlayCharmedMeetEachOther(),
      expectedQuestion: "components.CurrentPlayQuestion.charmedPeopleMeetEachOther",
      test: "should render the question for charmed meet each other when current play is charmed who meet each other.",
    },
    {
      currentPlay: createFakeGamePlayCupidCharms(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayersDoesCupidCharm",
      test: "should render the question for cupid charms when current play is cupid who charms.",
    },
    {
      currentPlay: createFakeGamePlayDefenderProtects(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesDefenderProtect",
      test: "should render the question for defender protects when current play is defender who protects.",
    },
    {
      currentPlay: createFakeGamePlayFoxSniffs(),
      expectedQuestion: "components.CurrentPlayQuestion.doesFoxWantToSniff",
      test: "should render the question for fox sniffs when current play is fox who sniffs.",
    },
    {
      currentPlay: createFakeGamePlayHunterShoots(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesHunterShoot",
      test: "should render the question for hunter shoots when current play is hunter who shoots.",
    },
    {
      currentPlay: createFakeGamePlayLoversMeetEachOther(),
      expectedQuestion: "components.CurrentPlayQuestion.loversMeetEachOther",
      test: "should render the question for lovers meet each other when current play is lovers who meet each other.",
    },
    {
      currentPlay: createFakeGamePlayPiedPiperCharms(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayersDoesPiedPiperCharm",
      test: "should render the question for pied piper charms when current play is pied piper who charms.",
    },
    {
      currentPlay: createFakeGamePlayScandalmongerMarks(),
      expectedQuestion: "components.CurrentPlayQuestion.doesScandalmongerWantToMark",
      test: "should render the question for scandalmonger marks when current play is scandalmonger who marks.",
    },
    {
      currentPlay: createFakeGamePlayScapegoatBansVoting(),
      expectedQuestion: "components.CurrentPlayQuestion.doesScapegoatWantToBanVoting",
      test: "should render the question for scapegoat bans voting when current play is scapegoat who bans voting.",
    },
    {
      currentPlay: createFakeGamePlaySeerLooks(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSeerLook",
      test: "should render the question for seer looks when current play is seer who looks.",
    },
    {
      currentPlay: createFakeGamePlaySheriffDelegates(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSheriffDelegate",
      test: "should render the question for sheriff delegates when current play is sheriff who delegates.",
    },
    {
      currentPlay: createFakeGamePlaySheriffSettlesVotes(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSheriffSettleVotes",
      test: "should render the question for sheriff settles votes when current play is sheriff who settles votes.",
    },
    {
      currentPlay: createFakeGamePlayStutteringJudgeRequestsAnotherVote(),
      expectedQuestion: "components.CurrentPlayQuestion.doesJudgeRequestAnotherVote",
      test: "should render the question for stuttering judge requests another vote when current play is stuttering judge who requests another vote.",
    },
    {
      currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies(),
      expectedQuestion: "",
      test: "should render nothing when current play is survivors bury dead bodies.",
    },
    {
      currentPlay: createFakeGamePlaySurvivorsElectSheriff(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsElectAsSheriff",
      test: "should render the question for survivors elect sheriff when current play is survivors who elect sheriff.",
    },
    {
      currentPlay: createFakeGamePlaySurvivorsVote(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteFor",
      test: "should render the question for survivors vote when current play is survivors who vote and there is no cause.",
    },
    {
      currentPlay: createFakeGamePlaySurvivorsVote({ cause: "angel-presence" }),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteFor",
      test: "should render the question for survivors vote when current play is survivors who vote and cause is angel presence.",
    },
    {
      currentPlay: createFakeGamePlaySurvivorsVote({ cause: "stuttering-judge-request" }),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteForOnJudgeRequest",
      test: "should render the question for survivors vote when current play is survivors who vote and cause is stuttering judge request.",
    },
    {
      currentPlay: createFakeGamePlaySurvivorsVote({ cause: "previous-votes-were-in-ties" }),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteForOnTie",
      test: "should render the question for survivors vote when current play is survivors who vote and cause is stuttering judge request and target is player 1.",
    },
    {
      currentPlay: createFakeGamePlayThiefChoosesCard(),
      expectedQuestion: "components.CurrentPlayQuestion.doesThiefWantToChooseCard",
      test: "should render the question for thief chooses card when current play is thief who chooses card.",
    },
    {
      currentPlay: createFakeGamePlayThreeBrothersMeetEachOther(),
      expectedQuestion: "components.CurrentPlayQuestion.threeBrothersMeetEachOther",
      test: "should render the question for three brothers meet each other when current play is three brothers who meet each other.",
    },
    {
      currentPlay: createFakeGamePlayTwoSistersMeetEachOther(),
      expectedQuestion: "components.CurrentPlayQuestion.twoSistersMeetEachOther",
      test: "should render the question for two sisters meet each other when current play is two sisters who meet each other.",
    },
    {
      currentPlay: createFakeGamePlayWerewolvesEat(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesWerewolvesEat",
      test: "should render the question for werewolves eat when current play is werewolves who eat.",
    },
    {
      currentPlay: createFakeGamePlayWhiteWerewolfEats(),
      expectedQuestion: "components.CurrentPlayQuestion.doesWhiteWerewolfWantToEat",
      test: "should render the question for white werewolf eats when current play is white werewolf who eats.",
    },
    {
      currentPlay: createFakeGamePlayWildChildChoosesModel(),
      expectedQuestion: "components.CurrentPlayQuestion.whichPlayerDoesWildChildChoose",
      test: "should render the question for wild child chooses model when current play is wild child who chooses model.",
    },
    {
      currentPlay: createFakeGamePlayWitchUsesPotions(),
      expectedQuestion: "components.CurrentPlayQuestion.doesWitchWantToUsePotions",
      test: "should render the question for witch uses potions when current play is witch who uses potions.",
    },
    {
      currentPlay: createFakeGamePlayWolfHoundChoosesSide(),
      expectedQuestion: "components.CurrentPlayQuestion.whichSideDoesWolfHoundChoose",
      test: "should render the question for wolf hound chooses side when current play is wolf hound who chooses side.",
    },
    {
      currentPlay: createFakeGamePlayWitchUsesPotions({ action: "shoot" }),
      expectedQuestion: "components.CurrentPlayQuestion.unknownQuestionForCurrentPlay",
      test: "should render unknown question when action is not relevant.",
    },
    {
      currentPlay: createFakeGamePlayWitchUsesPotions({ cause: "stuttering-judge-request" }),
      expectedQuestion: "components.CurrentPlayQuestion.unknownQuestionForCurrentPlay",
      test: "should render unknown question when cause is not relevant.",
    },
  ])("$test", async({ currentPlay, expectedQuestion }) => {
    const gameStore = useGameStore();
    gameStore.game.currentPlay = currentPlay;
    await nextTick();
    const question = wrapper.find<HTMLHeadingElement>("#current-play-question");

    expect(question.text()).toBe(expectedQuestion);
  });
});