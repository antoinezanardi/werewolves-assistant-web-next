import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameBuryDeadBodiesPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameBuryDeadBodiesPlayground.vue";
import GameChooseCardPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlayground.vue";
import GameChooseSidePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseSidePlayground/GameChooseSidePlayground.vue";
import GameNoActionPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameNoActionPlayground/GameNoActionPlayground.vue";
import GamePlaygroundContent from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundContent.vue";
import GameRequestAnotherVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameRequestAnotherVotePlayground/GameRequestAnotherVotePlayground.vue";
import GameTargetPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameTargetPlayground/GameTargetPlayground.vue";
import GameUsePotionsPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/GameUsePotionsPlayground.vue";
import GameVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameVotePlayground/GameVotePlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlayCupidCharms, createFakeGamePlayLoversMeetEachOther, createFakeGamePlayStutteringJudgeRequestsAnotherVote, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlayThiefChoosesCard, createFakeGamePlayWerewolvesEat, createFakeGamePlayWitchUsesPotions, createFakeGamePlayWolfHoundChoosesSide } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Content Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundContent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ currentPlay: createFakeGamePlayCupidCharms() }) } } };

  async function mountGamePlaygroundContentComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundContent>>> {
    return mountSuspendedComponent(GamePlaygroundContent, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundContentComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Playground Component", () => {
    it("should render game use potions playground component when current game play is use potions type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions();
      await nextTick();
      const gamePlaygroundUsePotions = wrapper.findComponent<typeof GameUsePotionsPlayground>(GameUsePotionsPlayground);

      expect(gamePlaygroundUsePotions.exists()).toBeTruthy();
    });

    it("should render game choose card playground component when current game play is choose card type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayThiefChoosesCard();
      await nextTick();
      const gamePlaygroundChooseCard = wrapper.findComponent<typeof GameChooseCardPlayground>(GameChooseCardPlayground);

      expect(gamePlaygroundChooseCard.exists()).toBeTruthy();
    });

    it("should render game choose side playground component when current game play is choose side type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWolfHoundChoosesSide();
      await nextTick();
      const gamePlaygroundChooseSide = wrapper.findComponent<typeof GameChooseSidePlayground>(GameChooseSidePlayground);

      expect(gamePlaygroundChooseSide.exists()).toBeTruthy();
    });

    it("should render game no action playground component when current game play is no action type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayLoversMeetEachOther();
      await nextTick();
      const gamePlaygroundNoAction = wrapper.findComponent<typeof GameNoActionPlayground>(GameNoActionPlayground);

      expect(gamePlaygroundNoAction.exists()).toBeTruthy();
    });

    it("should render game request another vote playground component when current game play is request another vote type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayStutteringJudgeRequestsAnotherVote();
      await nextTick();
      const gamePlaygroundRequestAnotherVote = wrapper.findComponent<typeof GameRequestAnotherVotePlayground>(GameRequestAnotherVotePlayground);

      expect(gamePlaygroundRequestAnotherVote.exists()).toBeTruthy();
    });

    it("should render game target playground component when current game play is target type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat();
      await nextTick();
      const gamePlaygroundTarget = wrapper.findComponent<typeof GameTargetPlayground>(GameTargetPlayground);

      expect(gamePlaygroundTarget.exists()).toBeTruthy();
    });

    it("should render game vote playground component when current game play is vote type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsElectSheriff();
      await nextTick();
      const gamePlaygroundVote = wrapper.findComponent<typeof GameVotePlayground>(GameVotePlayground);

      expect(gamePlaygroundVote.exists()).toBeTruthy();
    });

    it("should render game bury dead bodies playground component when current game play is bury dead bodies type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsBuryDeadBodies();
      await nextTick();
      const gamePlaygroundBuryDeadBodies = wrapper.findComponent<typeof GameBuryDeadBodiesPlayground>(GameBuryDeadBodiesPlayground);

      expect(gamePlaygroundBuryDeadBodies.exists()).toBeTruthy();
    });

    it("should not render any game playground component when current game play type is not defined.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const gamePlayground = wrapper.findComponent("#game-playground-type");

      expect(gamePlayground.exists()).toBeFalsy();
    });
  });
});