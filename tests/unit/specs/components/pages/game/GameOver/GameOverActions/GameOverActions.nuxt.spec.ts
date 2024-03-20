import type { mount } from "@vue/test-utils";

import GameOverActions from "~/components/pages/game/GameOver/GameOverActions/GameOverActions.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

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
});