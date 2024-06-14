import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import GameOverHistoryHeader from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryHeader/GameOverHistoryHeader.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryHeader>>;

  async function mountGameOverHistoryHeaderComponent(options: ComponentMountingOptions<typeof GameOverHistoryHeader> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryHeader>>> {
    return mountSuspendedComponent(GameOverHistoryHeader, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryHeaderComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Header", () => {
    it("should translate header when rendered.", () => {
      const header = wrapper.find<HTMLHeadingElement>("#game-history-header-title");

      expect(header.text()).toBe("Game history");
    });
  });
});