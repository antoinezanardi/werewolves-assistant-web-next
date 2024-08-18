import type { NuxtImg } from "#components";
import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameAdditionalCardDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Start Game Confirm Dialog Actor Additional Cards Placed Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    additionalCards: [
      createFakeCreateGameAdditionalCardDto({
        recipient: "actor",
        roleName: "seer",
      }),
      createFakeCreateGameAdditionalCardDto({
        recipient: "actor",
        roleName: "werewolf",
      }),
      createFakeCreateGameAdditionalCardDto({
        recipient: "thief",
        roleName: "prejudiced-manipulator",
      }),
      createFakeCreateGameAdditionalCardDto({
        recipient: "actor",
        roleName: "hunter",
      }),
    ],
  });
  const testingPinia = {
    initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } },
    stubActions: false,
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced>>;

  async function mountGameLobbyStartGameConfirmDialogActorAdditionalCardsPlacedComponent(options:
  ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced> = {}):
    Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogActorAdditionalCardsPlacedComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogActorAdditionalCardsPlacedComponent({
      shallow: false,
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Actor Icon", () => {
    it("should set size to actor icon when rendered.", () => {
      const actorIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Actor icon']");

      expect(actorIcon.attributes("width")).toBe("75");
      expect(actorIcon.attributes("height")).toBe("75");
    });

    it("should set src to actor icon when rendered.", () => {
      const actorIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Actor icon']");

      expect(actorIcon.attributes("src")).toBe("/svg/role/actor.svg");
    });
  });

  describe("Actor Additional Cards", () => {
    it("should render actor additional cards when rendered.", () => {
      const actorAdditionalCards = wrapper.findAllComponents<typeof RoleImage>(".actor-additional-card");

      expect(actorAdditionalCards).toHaveLength(3);
      expect(actorAdditionalCards[0].props("roleName")).toBe("seer");
      expect(actorAdditionalCards[1].props("roleName")).toBe("werewolf");
      expect(actorAdditionalCards[2].props("roleName")).toBe("hunter");
    });
  });

  describe("Confirm Dialog Text", () => {
    it("should translate confirm dialog text when rendered.", () => {
      const confirmDialogText = wrapper.find<HTMLHeadingElement>("#game-lobby-start-game-confirm-dialog-actor-additional-cards-placed-text");

      expect(confirmDialogText.text()).toBe("components.GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.actorAdditionalCardsMustBePlacedUp, 3");
    });
  });

  describe("Step Actions", () => {
    it("should translate reject step button label when rendered.", () => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");

      expect(rejectStepButton.attributes("label")).toBe("Change the additional cards for the Actor");
    });

    it("should emit reject step event when reject step button clicked.", async() => {
      const rejectStepButton = wrapper.findComponent<typeof Button>("#reject-step-button");
      await rejectStepButton.trigger("click");

      expect(wrapper.emitted("rejectActorAdditionalCardsPlacedStep")).toHaveLength(1);
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