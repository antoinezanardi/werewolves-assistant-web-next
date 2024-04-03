import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import GameOverHistoryFooter from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryFooter/GameOverHistoryFooter.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryFooter>>;

  async function mountGameOverHistoryFooterComponent(options: ComponentMountingOptions<typeof GameOverHistoryFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryFooter>>> {
    return mountSuspendedComponent(GameOverHistoryFooter, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryFooterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Close Button", () => {
    it("should translate footer close button when closed.", () => {
      const closeButton = wrapper.findComponent<Button>("#game-history-footer-close-button");

      expect(closeButton.attributes("label")).toBe("Close");
    });
  });

  describe("Emits", () => {
    it("should emit close game history when close button is clicked.", async() => {
      const closeButton = wrapper.findComponent<Button>("#game-history-footer-close-button");
      await closeButton.trigger("click");

      expect(wrapper.emitted("closeGameHistory")).toBeTruthy();
    });
  });
});