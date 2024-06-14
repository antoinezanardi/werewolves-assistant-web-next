import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameTargetPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameTargetPlayground/GameTargetPlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Target Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTargetPlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameTargetPlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameTargetPlayground>>> {
    return mountSuspendedComponent(GameTargetPlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameTargetPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});