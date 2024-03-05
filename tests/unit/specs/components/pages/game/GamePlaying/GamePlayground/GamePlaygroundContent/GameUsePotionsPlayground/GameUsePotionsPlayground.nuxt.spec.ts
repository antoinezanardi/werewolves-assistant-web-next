import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameUsePotionsPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/GameUsePotionsPlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Use Potions Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameUsePotionsPlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameUsePotionsPlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameUsePotionsPlayground>>> {
    return mountSuspendedComponent(GameUsePotionsPlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameUsePotionsPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});