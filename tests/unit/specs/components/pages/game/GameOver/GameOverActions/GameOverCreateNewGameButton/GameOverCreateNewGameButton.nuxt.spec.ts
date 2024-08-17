import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createTestingPinia } from "@pinia/testing";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { ButtonProps } from "primevue/button";
import type Button from "primevue/button";
import type { ConfirmationOptions } from "primevue/confirmationoptions";
import type UseConfirm from "primevue/useconfirm";
import { type Mock, vi } from "vitest";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameOverCreateNewGameButton from "~/components/pages/game/GameOver/GameOverActions/GameOverCreateNewGameButton/GameOverCreateNewGameButton.vue";
import { StoreIds } from "~/stores/enums/store.enum";

const hoistedMocks = vi.hoisted(() => ({
  useConfirm: { require: vi.fn() },
  navigateTo: vi.fn(),
}));

vi.mock("primevue/useconfirm", async importOriginal => ({
  ...await importOriginal<typeof UseConfirm>(),
  useConfirm: (): { require: Mock } => ({ require: hoistedMocks.useConfirm.require }),
}));

mockNuxtImport<typeof navigateTo>("navigateTo", () => hoistedMocks.navigateTo);

describe("Game Over Create New Game Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverCreateNewGameButton>>;
  const defaultPlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Benoit" }),
    createFakeSeerAlivePlayer({ name: "Corentin" }),
  ];
  const defaultGame = createFakeGame({ players: defaultPlayers });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameOverCreateNewGameButtonComponent(options: ComponentMountingOptions<typeof GameOverCreateNewGameButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverCreateNewGameButton>>> {
    return mountSuspendedComponent(GameOverCreateNewGameButton, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverCreateNewGameButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Create New Game Button", () => {
    it("should translate button label when rendered.", async() => {
      wrapper = await mountGameOverCreateNewGameButtonComponent({
        shallow: false,
      });
      const buttonText = wrapper.findComponent<typeof Button>("#create-new-game-button");
      const buttonProps = buttonText.props() as ButtonProps;

      expect(buttonProps.label).toBe("Create another game");
    });

    describe("Click on Button", () => {
      beforeEach(async() => {
        wrapper = await mountGameOverCreateNewGameButtonComponent({
          shallow: true,
          global: {
            stubs: {
              FontAwesomeIcon: true,
            },
            plugins: [createTestingPinia(testingPinia)],
          },
        });
        const button = wrapper.findComponent<typeof Button>("#create-new-game-button");
        (button.vm as VueVm).$emit("click");
      });

      it("should confirm action when button is clicked.", () => {
        const expectedConfirmOptions: ConfirmationOptions = {
          target: expect.anything() as HTMLElement,
          acceptLabel: "shared.yes",
          rejectLabel: "shared.no",
          rejectClass: "p-button-secondary",
          defaultFocus: "accept",
          message: "components.GameOverCreateNewGameButton.createNewGameWithSamePlayers",
          accept: expect.any(Function) as () => void,
          reject: expect.any(Function) as () => void,
        };

        expect(hoistedMocks.useConfirm.require).toHaveBeenCalledExactlyOnceWith(expectedConfirmOptions);
      });

      it("should navigate to create game page with existing players when confirmed.", () => {
        const acceptCallback = (hoistedMocks.useConfirm.require.mock.calls[0] as ConfirmationOptions[])[0].accept as () => void;
        acceptCallback();

        expect(hoistedMocks.navigateTo).toHaveBeenCalledExactlyOnceWith("/game-lobby?playerNames=Antoine&playerNames=Benoit&playerNames=Corentin");
      });

      it("should navigate to create page with new players when rejected.", () => {
        const rejectCallback = (hoistedMocks.useConfirm.require.mock.calls[0] as ConfirmationOptions[])[0].reject as () => void;
        rejectCallback();

        expect(hoistedMocks.navigateTo).toHaveBeenCalledExactlyOnceWith("/game-lobby");
      });
    });
  });
});