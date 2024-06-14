import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GamePlaygroundHeaderPhase from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderPhase/GamePlaygroundHeaderPhase.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePhase } from "@tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Header Phase", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundHeaderPhase>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          phase: createFakeGamePhase({ name: "night" }),
          turn: 3,
        }),
      },
    },
  };

  async function mountGamePlaygroundHeaderPhaseComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundHeaderPhase>>> {
    return mountSuspendedComponent(GamePlaygroundHeaderPhase, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundHeaderPhaseComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Phase text", () => {
    it("should display night phase text with the turn number when the phase is night.", async() => {
      const gameStore = useGameStore();
      gameStore.game.phase.name = "night";
      gameStore.game.turn = 3;
      await nextTick();
      const phaseText = wrapper.find("#game-phase-text");

      expect(phaseText.text()).toBe("shared.game.phase.night 3");
    });

    it("should display day phase text with the turn number when the phase is day.", async() => {
      const gameStore = useGameStore();
      gameStore.game.phase.name = "day";
      gameStore.game.turn = 3;
      await nextTick();
      const phaseText = wrapper.find("#game-phase-text");

      expect(phaseText.text()).toBe("shared.game.phase.day 3");
    });
  });
});