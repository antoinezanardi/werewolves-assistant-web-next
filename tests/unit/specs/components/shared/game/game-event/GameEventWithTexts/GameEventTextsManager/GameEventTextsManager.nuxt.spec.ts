import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameEventTextsManagerProps } from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/game-event-texts-manager.types";
import type GameEventNextTextButton from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventNextTextButton/GameEventNextTextButton.vue";
import type GameEventPreviousTextButton from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventPreviousTextButton/GameEventPreviousTextButton.vue";
import GameEventTextsManager from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventTextsManager.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useGameStore } from "~/stores/game/useGameStore";

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

  describe("Game Event Previous Text Button", () => {
    it("should decrement current text index when clicked.", async() => {
      const nextGameEventTextButton = wrapper.findComponent<typeof GameEventNextTextButton>("#game-event-next-text-button");
      const previousGameEventTextButton = wrapper.findComponent<typeof GameEventPreviousTextButton>("#game-event-previous-text-button");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      (previousGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Day rises.");
    });

    it("should not decrement current text index when clicked and current text index is 0.", async() => {
      const previousGameEventTextButton = wrapper.findComponent<typeof GameEventPreviousTextButton>("#game-event-previous-text-button");
      (previousGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Game starts.");
    });
  });

  describe("Current Event Text", () => {
    it("should display first game event text when rendered.", () => {
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Game starts.");
    });
  });

  describe("Game Event Next Text Button", () => {
    it("should increment current text index when clicked.", async() => {
      const nextGameEventTextButton = wrapper.findComponent<typeof GameEventNextTextButton>("#game-event-next-text-button");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Day rises.");
    });

    it("should not increment current text index when can't go to next game text.", async() => {
      const gameStore = useGameStore();
      gameStore.makingGamePlayStatus = "pending";
      const nextGameEventTextButton = wrapper.findComponent<typeof GameEventNextTextButton>("#game-event-next-text-button");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Game starts.");
    });

    it("should go to next game text when it was the last game text.", async() => {
      wrapper = await mountGameEventTextsManagerComponent({ props: { texts: ["Game starts."] } });
      const nextGameEventTextButton = wrapper.findComponent<typeof GameEventNextTextButton>("#game-event-next-text-button");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();
      const gameEventsStore = useGameEventsStore();

      expect(gameEventsStore.goToNextGameEvent).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not increment current text index when clicked and current text index is the last text index.", async() => {
      wrapper = await mountGameEventTextsManagerComponent({ props: { texts: ["Game starts."] } });
      const nextGameEventTextButton = wrapper.findComponent<typeof GameEventNextTextButton>("#game-event-next-text-button");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();
      const currentGameEventText = wrapper.find<HTMLParagraphElement>("#current-event-text");

      expect(currentGameEventText.text()).toBe("Game starts.");
    });

    it("should emit game event text change event when clicked.", async() => {
      const nextGameEventTextButton = wrapper.findComponent<typeof GameEventNextTextButton>("#game-event-next-text-button");
      (nextGameEventTextButton.vm as VueVm).$emit("click");
      await nextTick();

      expect(wrapper.emitted("gameEventTextChange")).toHaveLength(1);
    });
  });
});