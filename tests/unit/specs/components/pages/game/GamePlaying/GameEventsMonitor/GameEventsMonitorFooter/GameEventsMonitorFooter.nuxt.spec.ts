import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import type { TooltipOptions } from "primevue/tooltip";
import GameEventsMonitorFooter from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorFooter/GameEventsMonitorFooter.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGameEvent } from "@tests/unit/utils/factories/stores/game/game-event/game-event.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Game Events Monitor Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventsMonitorFooter>>;

  async function mountGameEventsMonitorFooterComponent(options: ComponentMountingOptions<typeof GameEventsMonitorFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventsMonitorFooter>>> {
    return mountSuspendedComponent(GameEventsMonitorFooter, {
      global: { stubs: { Button: false } },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventsMonitorFooterComponent();
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
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
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
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.currentGameEventIndex = 1;
      await nextTick();
      const button = wrapper.findComponent<typeof Button>("#previous-event-button");
      await button.trigger("click");

      expect(gameEventsStore.goToPreviousGameEvent).toHaveBeenCalledExactlyOnceWith();
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
      gameEventsStore.gameEvents = [createFakeGameEvent()];
      await nextTick();
      const button = wrapper.findComponent<typeof Button>("#skip-current-event-button");
      await button.trigger("click");

      expect(gameEventsStore.goToNextGameEvent).toHaveBeenCalledExactlyOnceWith();
    });
  });
});