import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import type { Mock } from "vitest";
import { beforeEach, expect } from "vitest";
import type { Ref } from "vue";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { getError } from "@tests/unit/utils/helpers/exception.helpers";
import { createFakeUseRoute } from "@tests/unit/utils/factories/composables/nuxt/useRoute.factory";
import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import type GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import type TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import GamePage from "~/pages/game/[id].vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const { useRoute: useRouteMock } = vi.hoisted(() => ({ useRoute: {} as ReturnType<typeof createFakeUseRoute> }));

describe("Game Page", () => {
  let mocks: {
    components: {
      gameFeedbackSubmitter: {
        showGameFeedbackSubmitter: Mock;
      };
    };
  };
  let wrapper: ReturnType<typeof mount<typeof GamePage>>;

  beforeAll(() => {
    mockNuxtImport<typeof useRoute>("useRoute", () => vi.fn(() => createFakeUseRoute(useRouteMock)));
  });

  beforeEach(async() => {
    mocks = {
      components: {
        gameFeedbackSubmitter: {
          showGameFeedbackSubmitter: vi.fn(),
        },
      },
    };
    useRouteMock.params = { id: "1" };
    wrapper = await mountSuspendedComponent(GamePage, {
      global: {
        stubs: {
          GameFeedbackSubmitter: {
            template: "<div id='game-feedback-submitter-stub'></div>",
            methods: mocks.components.gameFeedbackSubmitter,
          },
        },
      },
    });
    const gameStore = useGameStore();
    gameStore.fetchingGameStatus = "pending";
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = {
      title: "pages.game.playingGame",
      meta: [{ name: "robots", content: "noindex, nofollow" }],
    };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  it("should fetch and set game in store when rendered with valid game id as string.", () => {
    const gameStore = useGameStore();

    expect(gameStore.fetchAndSetGame).toHaveBeenCalledExactlyOnceWith("1");
  });

  it("should fetch and set game in store when rendered with valid game id as array of strings.", async() => {
    useRouteMock.params.id = ["4", "2", "3"];
    wrapper = await mountSuspendedComponent(GamePage);
    const gameStore = useGameStore();

    expect(gameStore.fetchAndSetGame).toHaveBeenCalledExactlyOnceWith("4");
  });

  it("should load all audios when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.loadAllAudios).toHaveBeenCalledExactlyOnceWith();
  });

  describe("Game Status Containers", () => {
    it("should render game is loading container when game fetching status is pending.", () => {
      expect(wrapper.find<HTMLDivElement>("#loading-game-container").exists()).toBeTruthy();
    });

    it("should render loading game spinner with text when game fetching status is pending.", () => {
      const loadingGameSpinner = wrapper.findComponent<typeof TextProgressSpinner>("#loading-game-spinner");

      expect(loadingGameSpinner.props("text")).toBe("Loading game…");
    });

    it("should render game not found when game fetching status is error.", async() => {
      const gameStore = useGameStore();
      gameStore.fetchingGameStatus = "error";
      await nextTick();

      expect(wrapper.findComponent<typeof GameNotFound>("#game-not-found").exists()).toBeTruthy();
    });

    it("should render playing game when game fetching status is success and game status is playing.", async() => {
      const gameStore = useGameStore();
      gameStore.fetchingGameStatus = "success";
      gameStore.game.status = "playing";
      await nextTick();

      expect(wrapper.findComponent<typeof GamePlaying>(GamePlaying).exists()).toBeTruthy();
    });

    it("should render game over when game fetching status is success and game status is over.", async() => {
      const gameStore = useGameStore();
      gameStore.fetchingGameStatus = "success";
      gameStore.game.status = "over";
      await nextTick();

      expect(wrapper.findComponent<typeof GameOver>(GameOver).exists()).toBeTruthy();
    });

    it("should render game canceled when game fetching status is success and game status is canceled.", async() => {
      const gameStore = useGameStore();
      gameStore.fetchingGameStatus = "success";
      gameStore.game.status = "canceled";
      await nextTick();

      expect(wrapper.findComponent<typeof GameCanceled>(GameCanceled).exists()).toBeTruthy();
    });
  });

  describe("Game is found", () => {
    beforeEach(() => {
      const gameStore = useGameStore();
      gameStore.fetchingGameStatus = "success";
      gameStore.game.status = "playing";
    });

    it("should show game feedback submitter when game component emits a game feedback submitter button click.", async() => {
      const gamePlaying = wrapper.findComponent<typeof GamePlaying>(GamePlaying);
      (gamePlaying.vm as VueVm).$emit("gameFeedbackSubmitterButtonClick");
      await nextTick();

      expect(mocks.components.gameFeedbackSubmitter.showGameFeedbackSubmitter).toHaveBeenCalledExactlyOnceWith();
    });

    it("should throw an error when game component emits a game feedback submitter button click and game feedback submitter is not defined.", async() => {
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameFeedbackSubmitter: Ref }).gameFeedbackSubmitter.value = null;
      const gamePlaying = wrapper.findComponent<typeof GamePlaying>(GamePlaying);
      await getError(() => (gamePlaying.vm as VueVm).$emit("gameFeedbackSubmitterButtonClick"));

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Feedback Submitter is not defined");
    });
  });

  describe("Unmount", () => {
    it("should fade out playing background audio when unmounted.", () => {
      const audioStore = useAudioStore();
      wrapper.unmount();

      expect(audioStore.fadeOutPlayingBackgroundAudio).toHaveBeenCalledExactlyOnceWith();
    });
  });
});