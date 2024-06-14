import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameChooseCardPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Choose Card Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameChooseCardPlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameChooseCardPlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameChooseCardPlayground>>> {
    return mountSuspendedComponent(GameChooseCardPlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameChooseCardPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});