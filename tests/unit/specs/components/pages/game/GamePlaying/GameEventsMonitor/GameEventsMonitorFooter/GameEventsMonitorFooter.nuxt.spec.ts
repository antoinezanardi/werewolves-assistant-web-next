import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeUseMagicKeys } from "@tests/unit/utils/factories/composables/vue-use/useMagicKeys.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import type { TooltipOptions } from "primevue/tooltip";
import GameEventsMonitorFooter from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorFooter/GameEventsMonitorFooter.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import { useGameStore } from "~/stores/game/useGameStore";

const hoistedMocks = vi.hoisted(() => ({
  useMagicKeys: {} as unknown as ReturnType<typeof createFakeUseMagicKeys>,
}));
mockNuxtImport("useMagicKeys", () => vi.fn(() => hoistedMocks.useMagicKeys));

describe("Game Events Monitor Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventsMonitorFooter>>;
  const defaultGame = createFakeGame();

  async function mountGameEventsMonitorFooterComponent(options: ComponentMountingOptions<typeof GameEventsMonitorFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventsMonitorFooter>>> {
    return mountSuspendedComponent(GameEventsMonitorFooter, {
      global: {
        stubs: {
          Button: false,
          FontAwesomeIcon: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useMagicKeys = createFakeUseMagicKeys();
    wrapper = await mountGameEventsMonitorFooterComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Previous Event button", () => {
    it("should translate label when rendered.", () => {
      const buttonText = wrapper.find<HTMLSpanElement>("#previous-event-button-text");

      expect(buttonText.text()).toBe("Previous");
    });

    it("should be disabled when there are no previous events.", () => {
      const button = wrapper.findComponent<typeof Button>("#previous-event-button");

      expect(button.attributes("disabled")).toBe("");
    });

    it("should be enabled when there are previous events.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      await nextTick();
      const button = wrapper.findComponent<typeof Button>("#previous-event-button");

      expect(button.attributes("disabled")).toBeUndefined();
    });

    it("should not render tooltip when button is disabled.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#previous-event-button") };
      wrapper = await mountGameEventsMonitorFooterComponent({ directives });

      expect(tooltip.value).toBeUndefined();
    });

    it("should render tooltip when button is enabled.", async() => {
      const testingPinia = {
        initialState: {
          [StoreIds.GAME_EVENTS]: {
            gameEvents: [
              createFakeGameEvent(),
              createFakeGameEvent(),
              createFakeGameEvent(),
            ],
            currentGameEventIndex: 1,
          },
        },
      };
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#previous-event-button") };
      wrapper = await mountGameEventsMonitorFooterComponent({
        global: {
          directives,
          plugins: [createTestingPinia(testingPinia)],
        },
      });

      expect(tooltip.value).toStrictEqual<TooltipOptions>({
        value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">components.GameEventsMonitorFooter.goBackToPreviousGameEvent</div>
                <div class="flex gap-2 items-center">
                  <img height="40" alt="shared.keyboard.shiftKey" src="/_ipx/_/svg/keyboard/shift-key.svg"/>
                  <img height="40" alt="shared.keyboard.leftArrowKey" src="/_ipx/_/svg/keyboard/left-cursor-key.svg"/>
                </div>
            </div>`,
        escape: false,
        fitContent: false,
      });
    });

    it("should go to previous game event when clicked.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      await nextTick();
      const button = wrapper.findComponent<typeof Button>("#previous-event-button");
      await button.trigger("click");

      expect(gameEventsStore.goToPreviousGameEvent).toHaveBeenCalledExactlyOnceWith();
    });

    it("should go to previous game event when shift and left arrow keys are pressed.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      hoistedMocks.useMagicKeys.arrowleft.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      await nextTick();

      expect(gameEventsStore.goToPreviousGameEvent).toHaveBeenCalledExactlyOnceWith();
    });

    it("should animate icon when shift and left arrow keys are pressed.", async() => {
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#previous-event-button-icon");
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      hoistedMocks.useMagicKeys.arrowleft.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      await nextTick();

      expect(icon.classes()).toContain("animate__headShake");
    });

    it("should not go to previous game event when shift key is not pressed.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      hoistedMocks.useMagicKeys.arrowleft.value = true;
      hoistedMocks.useMagicKeys.shift.value = false;
      await nextTick();

      expect(gameEventsStore.goToPreviousGameEvent).not.toHaveBeenCalled();
    });

    it("should not go to previous game event when left arrow key is unpressed.", async() => {
      hoistedMocks.useMagicKeys.arrowleft.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      wrapper = await mountGameEventsMonitorFooterComponent();
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      hoistedMocks.useMagicKeys.arrowleft.value = false;
      await nextTick();

      expect(gameEventsStore.goToPreviousGameEvent).not.toHaveBeenCalled();
    });

    it("should not go to previous game event when can't go to previous game event.", async() => {
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      hoistedMocks.useMagicKeys.arrowleft.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      await nextTick();

      expect(gameEventsStore.goToPreviousGameEvent).not.toHaveBeenCalled();
    });
  });

  describe("Skip Current Event button", () => {
    it("should translate label when rendered.", () => {
      const buttonText = wrapper.find<HTMLSpanElement>("#skip-current-event-button-text");

      expect(buttonText.text()).toBe("Skip");
    });

    it("should render tooltip when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#skip-current-event-button") };
      wrapper = await mountGameEventsMonitorFooterComponent({ global: { directives } });

      expect(tooltip.value).toStrictEqual<TooltipOptions>({
        value: `<div class="flex flex-col gap-2 items-center">
                <div class="text-center">components.GameEventsMonitorFooter.skipCurrentGameEvent</div>
                <div class="flex gap-2 items-center">
                  <img height="40" alt="shared.keyboard.shiftKey" src="/_ipx/_/svg/keyboard/shift-key.svg"/>
                  <img height="40" alt="shared.keyboard.rightArrowKey" src="/_ipx/_/svg/keyboard/right-cursor-key.svg"/>
                </div>
            </div>`,
        escape: false,
        fitContent: false,
      });
    });

    it("should skip current game event when clicked.", async() => {
      const gameEventsStore = useGameEventsStore();
      await nextTick();
      const button = wrapper.findComponent<typeof Button>("#skip-current-event-button");
      await button.trigger("click");

      expect(gameEventsStore.goToNextGameEvent).toHaveBeenCalledExactlyOnceWith();
    });

    it("should skip current game event when shift and right arrow keys are pressed.", async() => {
      const gameEventsStore = useGameEventsStore();
      hoistedMocks.useMagicKeys.arrowright.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      await nextTick();

      expect(gameEventsStore.goToNextGameEvent).toHaveBeenCalledExactlyOnceWith();
    });

    it("should animate icon when shift and right arrow keys are pressed.", async() => {
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#skip-current-event-button-icon");
      hoistedMocks.useMagicKeys.arrowright.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      await nextTick();

      expect(icon.classes()).toContain("animate__headShake");
    });

    it("should not skip current game event when shift key is not pressed.", async() => {
      const gameEventsStore = useGameEventsStore();
      hoistedMocks.useMagicKeys.arrowright.value = true;
      hoistedMocks.useMagicKeys.shift.value = false;
      await nextTick();

      expect(gameEventsStore.goToNextGameEvent).not.toHaveBeenCalled();
    });

    it("should not skip current game event when right arrow key is unpressed.", async() => {
      hoistedMocks.useMagicKeys.arrowright.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      wrapper = await mountGameEventsMonitorFooterComponent();
      const gameEventsStore = useGameEventsStore();
      hoistedMocks.useMagicKeys.arrowright.value = false;
      await nextTick();

      expect(gameEventsStore.goToNextGameEvent).not.toHaveBeenCalled();
    });

    it("should not skip current game event when can't go to next game event.", async() => {
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      hoistedMocks.useMagicKeys.arrowright.value = true;
      hoistedMocks.useMagicKeys.shift.value = true;
      await nextTick();

      expect(gameEventsStore.goToNextGameEvent).not.toHaveBeenCalled();
    });
  });
});