import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameLobbyStartGameConfirmDialogPlayersGrouped from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersGrouped/GameLobbyStartGameConfirmDialogPlayersGrouped.vue";

describe("Game Lobby Start Game Confirm Dialog Players Grouped Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersGrouped>>;

  async function mountGameLobbyStartGameConfirmDialogPlayersGroupedComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogPlayersGrouped> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersGrouped>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogPlayersGrouped, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersGroupedComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersGroupedComponent({
      shallow: false,
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Step SVG", () => {
    it("should set size to step svg when rendered.", () => {
      const stepSvg = wrapper.findComponent("[alt='Players groups']");

      expect(stepSvg.attributes("width")).toBe("75");
      expect(stepSvg.attributes("height")).toBe("75");
    });

    it("should set src to step svg when rendered.", () => {
      const stepSvg = wrapper.findComponent("[alt='Players groups']");

      expect(stepSvg.attributes("src")).toBe("/svg/role/prejudiced-manipulator.svg");
    });
  });

  describe("Text", () => {
    it("should translate text step when rendered.", () => {
      const stepText = wrapper.find<HTMLHeadingElement>("#game-lobby-start-game-confirm-dialog-players-grouped-text");

      expect(stepText.text()).toBe("The Prejudiced Manipulator is in the game. Are players correctly grouped?");
    });
  });

  describe("Step Actions", () => {
    it("should translate reject step button label when rendered.", () => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");

      expect(rejectStepButton.attributes("label")).toBe("Show me how to group players");
    });

    it("should emit reject event when reject step button is clicked.", async() => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");
      await rejectStepButton.trigger("click");

      expect(wrapper.emitted("rejectPlayersGroupedStep")).toHaveLength(1);
    });

    it("should translate confirm step button label when rendered.", () => {
      const confirmStepButton = wrapper.findComponent<typeof Button>("#confirm-step-button");

      expect(confirmStepButton.attributes("label")).toBe("Yes");
    });

    it("should emit confirm event when confirm step button is clicked.", async() => {
      const confirmStepButton = wrapper.findComponent<typeof Button>("#confirm-step-button");
      await confirmStepButton.trigger("click");

      expect(wrapper.emitted("confirmStep")).toHaveLength(1);
    });
  });
});