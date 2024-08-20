import type { NuxtImg } from "#components";
import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameAdditionalCardDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Start Game Confirm Dialog Thief Additional Cards Placed Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    additionalCards: [
      createFakeCreateGameAdditionalCardDto({
        recipient: "thief",
        roleName: "seer",
      }),
      createFakeCreateGameAdditionalCardDto({
        recipient: "thief",
        roleName: "werewolf",
      }),
      createFakeCreateGameAdditionalCardDto({
        recipient: "actor",
        roleName: "prejudiced-manipulator",
      }),
      createFakeCreateGameAdditionalCardDto({
        recipient: "thief",
        roleName: "hunter",
      }),
    ],
  });
  const testingPinia = {
    initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } },
    stubActions: false,
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced>>;

  async function mountGameLobbyStartGameConfirmDialogThiefAdditionalCardsPlacedComponent(options:
  ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced> = {}):
    Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogThiefAdditionalCardsPlacedComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogThiefAdditionalCardsPlacedComponent({
      shallow: false,
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Thief Icon", () => {
    it("should set size to thief icon when rendered.", () => {
      const thiefIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Thief icon']");

      expect(thiefIcon.attributes("width")).toBe("75");
      expect(thiefIcon.attributes("height")).toBe("75");
    });

    it("should set src to thief icon when rendered.", () => {
      const thiefIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Thief icon']");

      expect(thiefIcon.attributes("src")).toBe("/svg/role/thief.svg");
    });
  });

  describe("Thief Additional Cards", () => {
    it("should render thief additional cards when rendered.", () => {
      const thiefAdditionalCards = wrapper.findAllComponents<typeof RoleImage>(".thief-additional-card");

      expect(thiefAdditionalCards).toHaveLength(3);
      expect(thiefAdditionalCards[0].props("roleName")).toBe("seer");
      expect(thiefAdditionalCards[1].props("roleName")).toBe("werewolf");
      expect(thiefAdditionalCards[2].props("roleName")).toBe("hunter");
    });
  });

  describe("Confirm Dialog Text", () => {
    it("should translate confirm dialog text when rendered.", () => {
      const confirmDialogText = wrapper.find<HTMLHeadingElement>("#game-lobby-start-game-confirm-dialog-thief-additional-cards-placed-text");

      expect(confirmDialogText.text()).toBe("components.GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.thiefAdditionalCardsMustBePlacedDown, 3");
    });
  });

  describe("Step Actions", () => {
    it("should translate reject step button label when rendered.", () => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");

      expect(rejectStepButton.attributes("label")).toBe("Change the additional cards for the Thief");
    });

    it("should emit reject step event when reject step button clicked.", async() => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");
      await rejectStepButton.trigger("click");

      expect(wrapper.emitted("rejectThiefAdditionalCardsPlacedStep")).toHaveLength(1);
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