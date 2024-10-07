import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { ToggleButtonProps } from "primevue/togglebutton";
import type ToggleButton from "primevue/togglebutton";
import { beforeEach, expect } from "vitest";

import GameRequestAnotherVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameRequestAnotherVotePlayground/GameRequestAnotherVotePlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Request Another Vote Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameRequestAnotherVotePlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameRequestAnotherVotePlaygroundComponent(options: ComponentMountingOptions<typeof GameRequestAnotherVotePlayground> = {}):
  Promise<ReturnType<typeof mount<typeof GameRequestAnotherVotePlayground>>> {
    return mountSuspendedComponent(GameRequestAnotherVotePlayground, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameRequestAnotherVotePlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Toggle Button", () => {
    describe("Icon", () => {
      it("should set thumbs-up icon to the toggle button when judge requests another vote.", async() => {
        wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
        const toggleButtonCheckbox = wrapper.find<HTMLInputElement>("#does-judge-request-another-vote-button.p-togglebutton");
        await toggleButtonCheckbox.trigger("click");
        const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#does-judge-request-another-vote-button-icon");

        expect(icon.props("icon")).toBe("thumbs-up");
      });

      it("should set thumbs-down icon to the toggle button when judge doesn't request another vote.", async() => {
        wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
        const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#does-judge-request-another-vote-button-icon");

        expect(icon.props("icon")).toBe("thumbs-down");
      });
    });

    it("should translate off button label when rendered.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#does-judge-request-another-vote-button");
      const props = toggleButton.props() as ToggleButtonProps;

      expect(props.offLabel).toBe("He doesn't request another vote");
    });

    it("should translate on button label when rendered.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#does-judge-request-another-vote-button");
      const props = toggleButton.props() as ToggleButtonProps;

      expect(props.onLabel).toBe("He requests another vote");
    });

    it("should set the does request another vote value to true in dto when the toggle button emits true change event.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const toggleButtonCheckbox = wrapper.find<HTMLInputElement>("#does-judge-request-another-vote-button.p-togglebutton");
      await toggleButtonCheckbox.trigger("click");

      expect(makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote).toHaveBeenCalledExactlyOnceWith(true);
    });

    it("should set the does request another vote value to false in dto when the toggle button emits first true then false change event.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const toggleButtonCheckbox = wrapper.find<HTMLInputElement>("#does-judge-request-another-vote-button.p-togglebutton");
      await toggleButtonCheckbox.trigger("click");
      await toggleButtonCheckbox.trigger("click");

      expect(makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote).toHaveBeenNthCalledWith(1, true);
      expect(makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote).toHaveBeenNthCalledWith(2, false);
    });
  });
});