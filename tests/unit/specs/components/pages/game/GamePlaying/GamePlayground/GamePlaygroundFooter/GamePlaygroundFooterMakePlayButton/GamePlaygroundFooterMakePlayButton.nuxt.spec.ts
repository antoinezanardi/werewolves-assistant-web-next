import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import { createFakeUseMagicKeys } from "@tests/unit/utils/factories/composables/vue-use/useMagicKeys.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import type { mount } from "@vue/test-utils";
import type Button from "primevue/button";
import type { TooltipOptions } from "primevue/tooltip";
import type { Ref } from "vue";

import GamePlaygroundFooterMakePlayButton from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterMakePlayButton/GamePlaygroundFooterMakePlayButton.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeMakeGamePlayDto } from "@tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play.dto.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

const hoistedMocks = vi.hoisted(() => ({
  useMagicKeys: {} as unknown as ReturnType<typeof createFakeUseMagicKeys>,
}));

mockNuxtImport("useMagicKeys", () => vi.fn(() => hoistedMocks.useMagicKeys));

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
    hoistedMocks.useMagicKeys = createFakeUseMagicKeys();
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
      const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");

      expect(makeGamePlayButton.attributes("disabled")).toBe("true");
    });

    it("should be enabled when make game play dto is valid.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ canBeSkipped: true });
      await nextTick();
      const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");

      expect(makeGamePlayButton.attributes("disabled")).toBe("false");
    });

    it("should have a translated label when rendered.", () => {
      const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");

      expect(makeGamePlayButton.attributes("label")).toBe("Make play");
    });

    it("should not render tooltip when make game play dto is not valid.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-playground-footer-make-play-button") };
      wrapper = await mountSuspendedComponent(GamePlaygroundFooterMakePlayButton, {
        global: {
          plugins: [createTestingPinia(testingPinia)],
          directives,
        },
      });
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ canBeSkipped: false });
      await nextTick();
      const expectedTooltipOptions: TooltipOptions = {
        disabled: true,
        value: `<div class="flex flex-col gap-2 items-center">
              <div>components.GamePlaygroundFooterMakePlayButton.makePlayAndProceedToNextOne</div>
              <div class="flex gap-2 items-center">
                <img width="90" class="self-center" alt="shared.keyboard.shiftKey" src="/_ipx/_/svg/keyboard/shift-key.svg"/>
                <img width="45" alt="shared.keyboard.enterKey" src="/_ipx/_/svg/keyboard/enter-key.svg"/>
              </div>
            </div>`,
        escape: false,
        fitContent: false,
      };

      expect(tooltip.value).toStrictEqual<TooltipOptions>(expectedTooltipOptions);
    });

    it("should render tooltip when make game play is valid.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-playground-footer-make-play-button") };
      wrapper = await mountSuspendedComponent(GamePlaygroundFooterMakePlayButton, {
        global: {
          plugins: [createTestingPinia(testingPinia)],
          directives,
        },
      });
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ canBeSkipped: true });
      await nextTick();
      const expectedTooltipOptions: TooltipOptions = {
        disabled: false,
        value: `<div class="flex flex-col gap-2 items-center">
              <div>components.GamePlaygroundFooterMakePlayButton.makePlayAndProceedToNextOne</div>
              <div class="flex gap-2 items-center">
                <img width="90" class="self-center" alt="shared.keyboard.shiftKey" src="/_ipx/_/svg/keyboard/shift-key.svg"/>
                <img width="45" alt="shared.keyboard.enterKey" src="/_ipx/_/svg/keyboard/enter-key.svg"/>
              </div>
            </div>`,
        escape: false,
        fitContent: false,
      };

      expect(tooltip.value).toStrictEqual<TooltipOptions>(expectedTooltipOptions);
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
        const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");
        await makeGamePlayButton.trigger("click");

        expect(gameStore.makeGamePlay).toHaveBeenCalledExactlyOnceWith(makeGamePlayDto);
      });

      it("should reset make game play dto when clicked.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");
        await makeGamePlayButton.trigger("click");

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).toHaveBeenCalledExactlyOnceWith();
      });

      it("should reset make game play dto when shift and enter keys are pressed.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        hoistedMocks.useMagicKeys.enter.value = true;
        hoistedMocks.useMagicKeys.shift.value = true;
        await nextTick();

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).toHaveBeenCalledExactlyOnceWith();
      });

      it("should not reset make game play dto when enter key is not pressed.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        hoistedMocks.useMagicKeys.enter.value = false;
        hoistedMocks.useMagicKeys.shift.value = true;
        await nextTick();

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).not.toHaveBeenCalled();
      });

      it("should not reset make game play dto when shift key is not pressed.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        hoistedMocks.useMagicKeys.enter.value = true;
        hoistedMocks.useMagicKeys.shift.value = false;
        await nextTick();

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).not.toHaveBeenCalled();
      });

      it("should not reset make game play dto when enter key is unpressed.", async() => {
        hoistedMocks.useMagicKeys.enter.value = true;
        hoistedMocks.useMagicKeys.shift.value = true;
        wrapper = await mountGamePlaygroundFooterMakePlayButtonComponent();
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        hoistedMocks.useMagicKeys.enter.value = false;
        hoistedMocks.useMagicKeys.shift.value = true;
        await nextTick();

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).not.toHaveBeenCalled();
      });

      it("should not reset make game play dto when button is loading.", async() => {
        const makeGamePlayDto = createFakeMakeGamePlayDto();
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game = createFakeGame({ currentPlay: createFakeGamePlay({ canBeSkipped: false }) });
        makeGamePlayDtoStore.makeGamePlayDto = makeGamePlayDto;
        hoistedMocks.useMagicKeys.enter.value = true;
        hoistedMocks.useMagicKeys.shift.value = true;
        await nextTick();

        expect(makeGamePlayDtoStore.resetMakeGamePlayDto).not.toHaveBeenCalled();
      });

      it("should be loading when fetch is in progress.", () => {
        const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");
        void makeGamePlayButton.trigger("click");

        expect((wrapper.vm as unknown as { isLoadingMakePlay: Ref<boolean> }).isLoadingMakePlay.value).toBeTrue();
      });

      it("should not be loading when fetch is finished.", async() => {
        const makeGamePlayButton = wrapper.findComponent<typeof Button>("#make-play-button");
        await makeGamePlayButton.trigger("click");

        expect(makeGamePlayButton.attributes("loading")).toBe("false");
      });
    });
  });
});