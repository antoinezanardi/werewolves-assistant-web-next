import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createFakeUseMagicKeys } from "@tests/unit/utils/factories/composables/vue-use/useMagicKeys.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { TooltipOptions } from "primevue/tooltip";
import type { Ref } from "vue";
import GameEventNextTextButton from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventNextTextButton/GameEventNextTextButton.vue";
import { useGameStore } from "~/stores/game/useGameStore";

const { hoistedMocks } = vi.hoisted(() => ({
  hoistedMocks: {
    useMagicKeys: {
      shift: { value: false } as Ref<boolean>,
      arrowright: { value: false } as Ref<boolean>,
      arrowleft: { value: false } as Ref<boolean>,
    } satisfies ReturnType<typeof createFakeUseMagicKeys>,
  },
}));

describe("Game Event Next Text Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventNextTextButton>>;

  async function mountGameEventNextTextButtonComponent(options: ComponentMountingOptions<typeof GameEventNextTextButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventNextTextButton>>> {
    return mountSuspendedComponent(GameEventNextTextButton, { ...options });
  }

  beforeEach(async() => {
    hoistedMocks.useMagicKeys = createFakeUseMagicKeys();
    mockNuxtImport("useMagicKeys", () => vi.fn(() => hoistedMocks.useMagicKeys));
    wrapper = await mountGameEventNextTextButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Next Game Event Text button", () => {
    it("should have tooltip when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "[aria-label='Next event text']") };
      wrapper = await mountGameEventNextTextButtonComponent({ global: { directives } });

      expect(tooltip.value).toStrictEqual<TooltipOptions>({
        value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">shared.actions.next</div>
                <img width="35" alt="shared.keyboard.rightArrowKey" src="/_ipx/_/svg/keyboard/right-cursor-key.svg"/>
            </div>`,
        escape: false,
      });
    });

    it("should be disabled when making game play status is pending.", async() => {
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      await nextTick();
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");

      expect(nextGameEventTextButton.attributes("disabled")).toBe("");
    });

    describe("Emits", () => {
      it("should emits click event when clicked.", async() => {
        const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
        await nextGameEventTextButton.trigger("click");

        expect(wrapper.emitted("click")).toBeTruthy();
      });
    });

    describe("Keyboard", () => {
      it("should emits click event when right arrow key is pressed.", async() => {
        hoistedMocks.useMagicKeys.arrowright.value = true;
        await nextTick();

        expect(wrapper.emitted("click")).toBeTruthy();
      });

      it("should animate button when right arrow key is pressed.", async() => {
        const button = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
        hoistedMocks.useMagicKeys.arrowright.value = true;
        await nextTick();

        expect(button.classes()).toContain("animate__headShake");
      });

      it("should not emits click event when can't go to next game event.", async() => {
        const gameStore = useGameStore();
        gameStore.makingGamePlayStatus = "pending";
        hoistedMocks.useMagicKeys.arrowright.value = true;
        await nextTick();

        expect(wrapper.emitted("click")).toBeFalsy();
      });

      it("should not emits click event when right arrow key is unpressed.", async() => {
        hoistedMocks.useMagicKeys.arrowright.value = true;
        wrapper = await mountGameEventNextTextButtonComponent();
        hoistedMocks.useMagicKeys.arrowright.value = false;
        await nextTick();

        expect(wrapper.emitted("click")).toBeFalsy();
      });
    });
  });
});