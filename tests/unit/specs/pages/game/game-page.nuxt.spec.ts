import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import { expect } from "vitest";

import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import type GameNotFound from "~/components/pages/game/GameNotFound/GameNotFound.vue";
import GameOver from "~/components/pages/game/GameOver/GameOver.vue";
import GamePlaying from "~/components/pages/game/GamePlaying/GamePlaying.vue";
import type TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeUseRoute } from "~/tests/unit/utils/factories/composables/nuxt/useRoute.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import GamePage from "~/pages/game/[id].vue";

const hoistedMocks = vi.hoisted(() => ({ useRoute: {} as ReturnType<typeof createFakeUseRoute> }));

describe("Game Page", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePage>>;

  beforeAll(() => {
    mockNuxtImport<typeof useRoute>("useRoute", () => vi.fn(() => createFakeUseRoute(hoistedMocks.useRoute)));
  });

  beforeEach(async() => {
    hoistedMocks.useRoute.params = { id: "1" };
    wrapper = await mountSuspendedComponent(GamePage);
    const gameStore = useGameStore();
    gameStore.fetchingGameStatus = "pending";
    await nextTick();
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
    hoistedMocks.useRoute.params.id = ["4", "2", "3"];
    wrapper = await mountSuspendedComponent(GamePage);
    const gameStore = useGameStore();

    expect(gameStore.fetchAndSetGame).toHaveBeenCalledExactlyOnceWith("4");
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
});