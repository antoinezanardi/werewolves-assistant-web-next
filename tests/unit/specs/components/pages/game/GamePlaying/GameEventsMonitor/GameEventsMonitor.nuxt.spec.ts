import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameEventsMonitor from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitor.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Events Monitor Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventsMonitor>>;

  async function mountGameEventsMonitorComponent(options: ComponentMountingOptions<typeof GameEventsMonitor> = {}): Promise<ReturnType<typeof mount<typeof GameEventsMonitor>>> {
    return mountSuspendedComponent(GameEventsMonitor, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventsMonitorComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});