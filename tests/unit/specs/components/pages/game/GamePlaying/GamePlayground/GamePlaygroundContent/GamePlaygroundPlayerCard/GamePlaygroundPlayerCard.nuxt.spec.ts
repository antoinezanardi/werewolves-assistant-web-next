import type { mount } from "@vue/test-utils";

import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Player Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>;

  async function mountGamePlaygroundPlayerCardComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>> {
    return mountSuspendedComponent(GamePlaygroundPlayerCard);
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundPlayerCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});