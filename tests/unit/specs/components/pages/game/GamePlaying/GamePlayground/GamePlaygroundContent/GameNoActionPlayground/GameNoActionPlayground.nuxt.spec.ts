import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameNoActionPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameNoActionPlayground/GameNoActionPlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game No Action Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameNoActionPlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameNoActionPlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameNoActionPlayground>>> {
    return mountSuspendedComponent(GameNoActionPlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameNoActionPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});