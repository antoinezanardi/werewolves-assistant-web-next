import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GameRequestAnotherVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameRequestAnotherVotePlayground/GameRequestAnotherVotePlayground.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Request Another Vote Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameRequestAnotherVotePlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameRequestAnotherVotePlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameRequestAnotherVotePlayground>>> {
    return mountSuspendedComponent(GameRequestAnotherVotePlayground, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGameRequestAnotherVotePlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});