import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameChooseSidePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseSidePlayground/GameChooseSidePlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Choose Side Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameChooseSidePlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameChooseSidePlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameChooseSidePlayground>>> {
    return mountSuspendedComponent(GameChooseSidePlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameChooseSidePlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});