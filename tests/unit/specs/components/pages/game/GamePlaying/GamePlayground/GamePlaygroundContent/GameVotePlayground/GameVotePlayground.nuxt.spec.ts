import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameVotePlayground/GameVotePlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Vote Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameVotePlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameVotePlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameVotePlayground>>> {
    return mountSuspendedComponent(GameVotePlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameVotePlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});