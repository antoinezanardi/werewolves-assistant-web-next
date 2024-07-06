import type { NuxtImg } from "#components";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";

describe("Game Lobby Start Game Confirm Dialog Players Positioned Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersPositioned>>;

  async function mountGameLobbyStartGameConfirmDialogPlayersPositionedComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogPlayersPositioned> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersPositioned>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogPlayersPositioned, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersPositionedComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Step Svg", () => {
    it("should set size to step svg when rendered.", () => {
      const stepSvg = wrapper.findComponent<typeof NuxtImg>("[alt='Players position']");

      expect(stepSvg.attributes("width")).toBe("75");
      expect(stepSvg.attributes("height")).toBe("75");
    });

    it("should set src to step svg when rendered.", () => {
      const stepSvg = wrapper.findComponent<typeof NuxtImg>("[alt='Players position']");

      expect(stepSvg.attributes("src")).toBe("/svg/misc/pie-chart-clock-wise.svg");
    });
  });

  describe("Text", () => {
    it("should translate step text when rendered.", () => {
      const stepText = wrapper.find<HTMLHeadingElement>("#game-lobby-start-game-confirm-dialog-players-positioned-text");

      expect(stepText.text()).toBe("Some roles rely on players position. Are players placed correctly in the game lobby?");
    });
  });

  describe("Step Actions", () => {
    it("should translate reject step button label when rendered.", () => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");

      expect(rejectStepButton.attributes("label")).toBe("Show me how to position players");
    });

    it("should emit reject step event when reject step button clicked.", async() => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");
      await rejectStepButton.trigger("click");

      expect(wrapper.emitted("rejectPlayersPositionStep")).toHaveLength(1);
    });

    it("should translate confirm step button label when rendered.", () => {
      const confirmStepButton = wrapper.findComponent<typeof Button>("#confirm-step-button");

      expect(confirmStepButton.attributes("label")).toBe("Yes");
    });

    it("should emit confirm step event when confirm step button clicked.", async() => {
      const confirmStepButton = wrapper.findComponent<typeof Button>("#confirm-step-button");
      await confirmStepButton.trigger("click");

      expect(wrapper.emitted("confirmStep")).toHaveLength(1);
    });
  });
});