import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";

import type { VuePrimeToggleButton } from "@nuxt/components";
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
    it("should translate off button label when rendered.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const toggleButton = wrapper.findComponent<typeof VuePrimeToggleButton>("#does-judge-request-another-vote-button");

      expect(toggleButton.props("offLabel")).toBe("He doesn't request another vote");
    });

    it("should translate on button label when rendered.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const toggleButton = wrapper.findComponent<typeof VuePrimeToggleButton>("#does-judge-request-another-vote-button");

      expect(toggleButton.props("onLabel")).toBe("He requests another vote");
    });

    it("should set the does request another vote value to true in dto when the toggle button emits true change event.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const toggleButtonCheckbox = wrapper.find<HTMLInputElement>("#does-judge-request-another-vote-button > .p-togglebutton-input");
      await toggleButtonCheckbox.setValue(true);

      expect(makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote).toHaveBeenCalledExactlyOnceWith(true);
    });

    it("should set the does request another vote value to false in dto when the toggle button emits first true then false change event.", async() => {
      wrapper = await mountGameRequestAnotherVotePlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const toggleButtonCheckbox = wrapper.find<HTMLInputElement>("#does-judge-request-another-vote-button > .p-togglebutton-input");
      await toggleButtonCheckbox.setValue(true);
      await toggleButtonCheckbox.setValue(false);

      expect(makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote).toHaveBeenNthCalledWith(1, true);
      expect(makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote).toHaveBeenNthCalledWith(2, false);
    });
  });
});