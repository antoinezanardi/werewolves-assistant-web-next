import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameEventTextsManagerProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/game-event-texts-manager.types";
import GameEventTextsManager from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventTextsManager.vue";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Game Event Texts Manager Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventTextsManager>>;
  const defaultProps: GameEventTextsManagerProps = {
    texts: [
      "Game starts.",
      "Day rises.",
      "Night falls.",
    ],
  };

  async function mountGameEventTextsManagerComponent(options: ComponentMountingOptions<typeof GameEventTextsManager> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventTextsManager>>> {
    return mountSuspendedComponent(GameEventTextsManager, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventTextsManagerComponent();
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
      wrapper = await mountGameEventTextsManagerComponent({ global: { directives } });

      expect(tooltip.value).toBe("");
    });

    it("should have gray color when cannot go to previous game event.", () => {
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");

      expect(previousGameEventTextButton.classes()).toContain("text-gray-500");
    });

    it("should be disabled when making game play status is pending.", async() => {
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
      await nextGameEventTextButton.trigger("click");
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      await nextTick();
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");

      expect(previousGameEventTextButton.attributes("disabled")).toBe("");
    });

    it("should be enabled when can go to previous game event.", async() => {
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
      await nextGameEventTextButton.trigger("click");

      expect(previousGameEventTextButton.attributes("disabled")).toBeUndefined();
    });

    it("should have tooltip when can go to previous game event.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#previous-event-text-button") };
      wrapper = await mountGameEventTextsManagerComponent({ global: { directives } });
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
      await nextGameEventTextButton.trigger("click");

      expect(tooltip.value).toBe("shared.actions.back");
    });

    it("should display previous game event text when clicked.", async() => {
      const previousGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Back to the previous event text']");
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
      await nextGameEventTextButton.trigger("click");
      await nextGameEventTextButton.trigger("click");
      await previousGameEventTextButton.trigger("click");
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Day rises.");
    });
  });

  describe("Current Event Text", () => {
    it("should display first game event text when rendered.", () => {
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Game starts.");
    });
  });

  describe("Next Game Event Text button", () => {
    it("should have tooltip when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "[aria-label='Next event text']") };
      wrapper = await mountGameEventTextsManagerComponent({ global: { directives } });

      expect(tooltip.value).toBe("Next");
    });

    it("should display next game event text when clicked.", async() => {
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
      await nextGameEventTextButton.trigger("click");
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Day rises.");
    });

    it("should be disabled when making game play status is pending.", async() => {
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      await nextTick();
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");

      expect(nextGameEventTextButton.attributes("disabled")).toBe("");
    });

    it("should go to next game event when there is no more text.", async() => {
      const gameEventsStore = useGameEventsStore();
      const nextGameEventTextButton = wrapper.find<HTMLButtonElement>("[aria-label='Next event text']");
      await nextGameEventTextButton.trigger("click");
      await nextGameEventTextButton.trigger("click");
      await nextGameEventTextButton.trigger("click");

      expect(gameEventsStore.goToNextGameEvent).toHaveBeenCalledExactlyOnceWith();
    });
  });
});