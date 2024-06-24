import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createFakeUseMagicKeys } from "@tests/unit/utils/factories/composables/vue-use/useMagicKeys.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import { flushPromises } from "@vue/test-utils";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { TooltipOptions } from "primevue/tooltip";
import type { Ref } from "vue";
import type { GameEventPreviousTextButtonProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventPreviousTextButton/game-event-previous-text-button.types";
import GameEventPreviousTextButton from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventPreviousTextButton/GameEventPreviousTextButton.vue";
import { useGameStore } from "~/stores/game/useGameStore";

const { hoistedMocks } = vi.hoisted(() => ({
  hoistedMocks: {
    useMagicKeys: {
      shift: { value: false } as Ref<boolean>,
      arrowright: { value: false } as Ref<boolean>,
      arrowleft: { value: false } as Ref<boolean>,
    } satisfies ReturnType<typeof createFakeUseMagicKeys>,
    useAnimateCss: { animateElementOnce: vi.fn() },
  },
}));

vi.mock("~/composables/animate-css/useAnimateCss", () => ({ useAnimateCss: (): typeof hoistedMocks.useAnimateCss => hoistedMocks.useAnimateCss }));

describe("Game Event Previous Text Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventPreviousTextButton>>;
  const defaultProps: GameEventPreviousTextButtonProps = { currentTextIndex: 0 };

  async function mountGameEventPreviousTextButtonComponent(options: ComponentMountingOptions<typeof GameEventPreviousTextButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventPreviousTextButton>>> {
    return mountSuspendedComponent(GameEventPreviousTextButton, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useMagicKeys = createFakeUseMagicKeys();
    mockNuxtImport("useMagicKeys", () => vi.fn(() => hoistedMocks.useMagicKeys));
    wrapper = await mountGameEventPreviousTextButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Previous Game Event Text button", () => {
    it("should be disabled when cannot go to previous game event.", () => {
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");

      expect(previousGameEventTextButton.attributes("disabled")).toBe("");
    });

    it("should not have tooltip when cannot go to previous game event.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#previous-event-text-button") };
      wrapper = await mountGameEventPreviousTextButtonComponent({ global: { directives } });

      expect(tooltip.value).toStrictEqual<TooltipOptions>({
        disabled: true,
        value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">shared.actions.back</div>
                <img width="35" alt="shared.keyboard.leftArrowKey" src="/_ipx/_/svg/keyboard/left-cursor-key.svg"/>
            </div>`,
        escape: false,
      });
    });

    it("should have gray color when cannot go to previous game event.", () => {
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");

      expect(previousGameEventTextButton.classes()).toContain("text-gray-500");
    });

    it("should be disabled when making game play status is pending.", async() => {
      wrapper = await mountGameEventPreviousTextButtonComponent({ props: { currentTextIndex: 1 } });
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      await nextTick();
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");

      expect(previousGameEventTextButton.attributes("disabled")).toBe("");
    });

    it("should be enabled when can go to previous game event.", async() => {
      wrapper = await mountGameEventPreviousTextButtonComponent({ props: { currentTextIndex: 1 } });
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");

      expect(previousGameEventTextButton.attributes("disabled")).toBeUndefined();
    });

    it("should have tooltip when can go to previous game event.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#previous-event-text-button") };
      wrapper = await mountGameEventPreviousTextButtonComponent({
        props: { currentTextIndex: 1 },
        global: { directives },
      });

      expect(tooltip.value).toStrictEqual<TooltipOptions>({
        disabled: false,
        value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">shared.actions.back</div>
                <img width="35" alt="shared.keyboard.leftArrowKey" src="/_ipx/_/svg/keyboard/left-cursor-key.svg"/>
            </div>`,
        escape: false,
      });
    });

    describe("Emits", () => {
      it("should emit click event when clicked.", async() => {
        wrapper = await mountGameEventPreviousTextButtonComponent({ props: { currentTextIndex: 2 } });
        const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");
        await previousGameEventTextButton.trigger("click");

        expect(wrapper.emitted("click")).toHaveLength(1);
      });
    });

    describe("Keyboard", () => {
      it("should emit click event when 'ArrowLeft' key is pressed.", async() => {
        wrapper = await mountGameEventPreviousTextButtonComponent({ props: { currentTextIndex: 2 } });
        hoistedMocks.useMagicKeys.arrowleft.value = true;
        await nextTick();

        expect(wrapper.emitted("click")).toHaveLength(1);
      });

      it("should not emit click event when 'ArrowLeft' key is unpressed.", async() => {
        hoistedMocks.useMagicKeys.arrowleft.value = true;
        wrapper = await mountGameEventPreviousTextButtonComponent();
        hoistedMocks.useMagicKeys.arrowleft.value = false;

        expect(wrapper.emitted("click")).toBeUndefined();
      });

      it("should animate button when 'ArrowLeft' key is pressed.", async() => {
        hoistedMocks.useMagicKeys.arrowleft.value = true;
        await nextTick();
        await flushPromises();

        expect(hoistedMocks.useAnimateCss.animateElementOnce).toHaveBeenCalledExactlyOnceWith(expect.anything(), "headShake");
      });

      it("should not animate button when 'ArrowLeft' key is unpressed.", async() => {
        hoistedMocks.useMagicKeys.arrowleft.value = true;
        wrapper = await mountGameEventPreviousTextButtonComponent();
        hoistedMocks.useAnimateCss.animateElementOnce.mockClear();
        hoistedMocks.useMagicKeys.arrowleft.value = false;
        await nextTick();
        await flushPromises();

        expect(hoistedMocks.useAnimateCss.animateElementOnce).not.toHaveBeenCalled();
      });
    });
  });
});