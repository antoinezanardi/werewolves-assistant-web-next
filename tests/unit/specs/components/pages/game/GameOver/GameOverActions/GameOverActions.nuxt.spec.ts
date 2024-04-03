import type { mount } from "@vue/test-utils";
import type Button from "primevue/button";

import GameOverActions from "~/components/pages/game/GameOver/GameOverActions/GameOverActions.vue";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Over Actions Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverActions>>;

  async function mountGameOverActionsComponent(): Promise<ReturnType<typeof mount<typeof GameOverActions>>> {
    return mountSuspendedComponent(GameOverActions, { shallow: false });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverActionsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Create another game button", () => {
    it("should translate create another game button text when rendered.", () => {
      const createAnotherGameButton = wrapper.findComponent<typeof GameOverActions>("#new-game-button");

      expect(createAnotherGameButton.text()).toBe("Create another game");
    });
  });

  describe("Show Game History Button", () => {
    it("should be in loading state when the game history is empty.", () => {
      const showGameHistoryButton = wrapper.findComponent<typeof Button>("#show-game-history-button");

      expect(showGameHistoryButton.props("loading")).toBeTruthy();
    });

    it("should translate loading show game history button text when the game history is empty.", () => {
      const showGameHistoryButton = wrapper.findComponent<Button>("#show-game-history-button");

      expect(showGameHistoryButton.text()).toBe("components.GameOverActions.loadingGameHistory");
    });

    it("should translate show game history button text when the game history records have been fetched.", async() => {
      const gameHistoryRecordsStore = useGameHistoryRecordsStore();
      gameHistoryRecordsStore.gameHistoryRecords = [createFakeGameHistoryRecord()];
      await nextTick();
      const showGameHistoryButton = wrapper.findComponent<Button>("#show-game-history-button");

      expect(showGameHistoryButton.text()).toBe("components.GameOverActions.showGameHistory");
    });
  });

  describe("Emits", () => {
    it("should emit show game history event when the show game history button is clicked.", () => {
      const showGameHistoryButton = wrapper.findComponent<Button>("#show-game-history-button");
      (showGameHistoryButton.vm as VueVm).$emit("click");

      expect(wrapper.emitted("showGameHistory")).toBeTruthy();
    });
  });
});