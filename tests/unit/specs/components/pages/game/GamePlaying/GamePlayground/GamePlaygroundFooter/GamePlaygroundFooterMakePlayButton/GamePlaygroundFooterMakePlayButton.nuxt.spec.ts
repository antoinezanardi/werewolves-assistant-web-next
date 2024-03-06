import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { Ref } from "vue";

import type { VuePrimeButton } from "#components";
import GamePlaygroundFooterMakePlayButton from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterMakePlayButton/GamePlaygroundFooterMakePlayButton.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeMakeGamePlayDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play.dto.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Footer Make Play Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundFooterMakePlayButton>>;
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

  async function mountGamePlaygroundFooterMakePlayButtonComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundFooterMakePlayButton>>> {
    return mountSuspendedComponent(GamePlaygroundFooterMakePlayButton, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundFooterMakePlayButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Make Game Play Button", () => {
    it("should be disabled when make game play dto is not valid.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ canBeSkipped: false });
      await nextTick();
      const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");

      expect(makeGamePlayButton.attributes("disabled")).toBe("true");
    });

    it("should be enabled when make game play dto is valid.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ canBeSkipped: true });
      await nextTick();
      const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");

      expect(makeGamePlayButton.attributes("disabled")).toBe("false");
    });

    it("should have a translated label when rendered.", () => {
      const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");

      expect(makeGamePlayButton.attributes("label")).toBe("Make play");
    });

    describe("Click on button", () => {
      beforeEach(() => {
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlay({ canBeSkipped: true });
      });

      it("should make play when clicked.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        const gameStore = useGameStore();
        const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");
        await makeGamePlayButton.trigger("click");

        expect(gameStore.makeGamePlay).toHaveBeenCalledExactlyOnceWith(makeGamePlayDto);
      });

      it("should reset make game play dto when clicked.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");
        await makeGamePlayButton.trigger("click");

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).toHaveBeenCalledExactlyOnceWith();
      });

      it("should be loading when fetch is in progress.", () => {
        const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");
        void makeGamePlayButton.trigger("click");

        expect((wrapper.vm as unknown as { isLoadingMakePlay: Ref<boolean> }).isLoadingMakePlay.value).toBeTrue();
      });

      it("should not be loading when fetch is finished.", async() => {
        const makeGamePlayButton = wrapper.findComponent<typeof VuePrimeButton>("#make-play-button");
        await makeGamePlayButton.trigger("click");

        expect(makeGamePlayButton.attributes("loading")).toBe("false");
      });
    });
  });
});