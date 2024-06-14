import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameAccursedWolfFatherTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameAccursedWolfFatherTurnStartsEvent/GameAccursedWolfFatherTurnStartsEvent.vue";
import GameActorTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameActorTurnStartsEvent/GameActorTurnStartsEvent.vue";
import GameBearTamerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameBearTamerTurnStartsEvent/GameBearTamerTurnStartsEvent.vue";
import GameBigBadWolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameBigBadWolfTurnStartsEvent/GameBigBadWolfTurnStartsEvent.vue";
import GameCharmedTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameCharmedTurnStartsEvent/GameCharmedTurnStartsEvent.vue";
import GameCupidTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameCupidTurnStartsEvent/GameCupidTurnStartsEvent.vue";
import GameDefenderTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameDefenderTurnStartsEvent/GameDefenderTurnStartsEvent.vue";
import GameFoxTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameFoxTurnStartsEvent/GameFoxTurnStartsEvent.vue";
import GameHunterTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameHunterTurnStartsEvent/GameHunterTurnStartsEvent.vue";
import GameLoversTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameLoversTurnStartsEvent/GameLoversTurnStartsEvent.vue";
import GamePiedPiperTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GamePiedPiperTurnStartsEvent/GamePiedPiperTurnStartsEvent.vue";
import GameScandalmongerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameScandalmongerTurnStartsEvent/GameScandalmongerTurnStartsEvent.vue";
import GameScapegoatTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameScapegoatTurnStartsEvent/GameScapegoatTurnStartsEvent.vue";
import GameSeerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSeerTurnStartsEvent/GameSeerTurnStartsEvent.vue";
import GameSheriffTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSheriffTurnStartsEvent/GameSheriffTurnStartsEvent.vue";
import GameStutteringJudgeTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameStutteringJudgeTurnStartsEvent/GameStutteringJudgeTurnStartsEvent.vue";
import GameSurvivorsTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSurvivorsTurnStartsEvent/GameSurvivorsTurnStartsEvent.vue";
import GameThiefTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameThiefTurnStartsEvent/GameThiefTurnStartsEvent.vue";
import GameThreeBrothersTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameThreeBrothersTurnStartsEvent/GameThreeBrothersTurnStartsEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import GameTwoSistersTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTwoSistersTurnStartsEvent/GameTwoSistersTurnStartsEvent.vue";
import GameWerewolvesTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWerewolvesTurnStartsEvent/GameWerewolvesTurnStartsEvent.vue";
import GameWhiteWerewolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWhiteWerewolfTurnStartsEvent/GameWhiteWerewolfTurnStartsEvent.vue";
import GameWildChildTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWildChildTurnStartsEvent/GameWildChildTurnStartsEvent.vue";
import GameWitchTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWitchTurnStartsEvent/GameWitchTurnStartsEvent.vue";
import GameWolfHoundTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWolfHoundTurnStartsEvent/GameWolfHoundTurnStartsEvent.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlayAccursedWolfFatherInfects, createFakeGamePlayActorChoosesCard, createFakeGamePlayBearTamerGrowls, createFakeGamePlayBigBadWolfEats, createFakeGamePlayCharmedMeetEachOther, createFakeGamePlayCupidCharms, createFakeGamePlaySurvivorsVote, createFakeGamePlayDefenderProtects, createFakeGamePlayHunterShoots, createFakeGamePlayLoversMeetEachOther, createFakeGamePlayPiedPiperCharms, createFakeGamePlayFoxSniffs, createFakeGamePlaySeerLooks, createFakeGamePlaySheriffSettlesVotes, createFakeGamePlayWerewolvesEat, createFakeGamePlayThiefChoosesCard, createFakeGamePlayStutteringJudgeRequestsAnotherVote, createFakeGamePlayTwoSistersMeetEachOther, createFakeGamePlayWhiteWerewolfEats, createFakeGamePlayThreeBrothersMeetEachOther, createFakeGamePlayWildChildChoosesModel, createFakeGamePlayWitchUsesPotions, createFakeGamePlayWolfHoundChoosesSide, createFakeGamePlayScapegoatBansVoting, createFakeGamePlayScandalmongerMarks } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Turn Start Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTurnStartsEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() }) } } };

  async function mountGameTurnStartsEventComponent(options: ComponentMountingOptions<typeof GameTurnStartsEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameTurnStartsEvent>>> {
    return mountSuspendedComponent(GameTurnStartsEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTurnStartsEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Turn Starts Event Component type", () => {
    it("should render Accursed Wolf Father game turn starts event when the current play source is Accursed Wolf Father.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayAccursedWolfFatherInfects() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameAccursedWolfFatherTurnStartsEvent>(GameAccursedWolfFatherTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Actor game turn starts event when the current play source is Actor.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayActorChoosesCard() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameActorTurnStartsEvent>(GameActorTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Bear Tamer game turn starts event when the current play source is Bear Tamer.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayBearTamerGrowls() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameBearTamerTurnStartsEvent>(GameBearTamerTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Big Bad Wolf game turn starts event when the current play source is Big Bad Wolf.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayBigBadWolfEats() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameBigBadWolfTurnStartsEvent>(GameBigBadWolfTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Charmed game turn starts event when the current play source is Charmed.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayCharmedMeetEachOther() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameCharmedTurnStartsEvent>(GameCharmedTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Cupid game turn starts event when the current play source is Cupid.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayCupidCharms() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameCupidTurnStartsEvent>(GameCupidTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Defender game turn starts event when the current play source is Defender.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayDefenderProtects() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameDefenderTurnStartsEvent>(GameDefenderTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Fox game turn starts event when the current play source is Fox.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayFoxSniffs() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameFoxTurnStartsEvent>(GameFoxTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Hunter game turn starts event when the current play source is Hunter.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayHunterShoots() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameHunterTurnStartsEvent>(GameHunterTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Lovers game turn starts event when the current play source is Lovers.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayLoversMeetEachOther() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameLoversTurnStartsEvent>(GameLoversTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Pied Piper game turn starts event when the current play source is Pied Piper.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayPiedPiperCharms() });
      await nextTick();
      const component = wrapper.findComponent<typeof GamePiedPiperTurnStartsEvent>(GamePiedPiperTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Scandalmonger game turn starts event when the current play source is Scandalmonger.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayScandalmongerMarks() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameScandalmongerTurnStartsEvent>(GameScandalmongerTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Scapegoat game turn starts event when the current play source is Scapegoat.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayScapegoatBansVoting() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameScapegoatTurnStartsEvent>(GameScapegoatTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Seer game turn starts event when the current play source is Seer.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySeerLooks() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameSeerTurnStartsEvent>(GameSeerTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Sheriff game turn starts event when the current play source is Sheriff.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffSettlesVotes() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameSheriffTurnStartsEvent>(GameSheriffTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Stuttering Judge game turn starts event when the current play source is Stuttering Judge.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayStutteringJudgeRequestsAnotherVote() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameStutteringJudgeTurnStartsEvent>(GameStutteringJudgeTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Survivors game turn starts event when the current play source is Survivors.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsVote() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameSurvivorsTurnStartsEvent>(GameSurvivorsTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Thief game turn starts event when the current play source is Thief.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayThiefChoosesCard() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameThiefTurnStartsEvent>(GameThiefTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Three Brothers game turn starts event when the current play source is Three Brothers.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayThreeBrothersMeetEachOther() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameThreeBrothersTurnStartsEvent>(GameThreeBrothersTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Two Sisters game turn starts event when the current play source is Two Sisters.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayTwoSistersMeetEachOther() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameTwoSistersTurnStartsEvent>(GameTwoSistersTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Werewolves game turn starts event when the current play source is Werewolves.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayWerewolvesEat() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameWerewolvesTurnStartsEvent>(GameWerewolvesTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render White Werewolf game turn starts event when the current play source is White Werewolf.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayWhiteWerewolfEats() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameWhiteWerewolfTurnStartsEvent>(GameWhiteWerewolfTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Wild Child game turn starts event when the current play source is Wild Child.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayWildChildChoosesModel() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameWildChildTurnStartsEvent>(GameWildChildTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Witch game turn starts event when the current play source is Witch.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayWitchUsesPotions() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameWitchTurnStartsEvent>(GameWitchTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
    });

    it("should render Wolf Hound game turn starts event when the current play source is Wolf Hound.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: createFakeGamePlayWolfHoundChoosesSide() });
      await nextTick();
      const component = wrapper.findComponent<typeof GameWolfHoundTurnStartsEvent>(GameWolfHoundTurnStartsEvent);

      expect(component.exists()).toBeTruthy();
      expect(component.attributes("is")).toBeUndefined();
    });

    it("should render unknown game starts event text when the current play is null.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ currentPlay: null });
      await nextTick();
      const component = wrapper.find<HTMLDivElement>("#unknown-game-turn-starts-event");

      expect(component.text()).toBe("Unknown game turn starts event");
    });
  });
});