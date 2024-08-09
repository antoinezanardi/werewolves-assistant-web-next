import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { RecipientRoleAdditionalCardsManagerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/recipient-role-additional-cards-manager.types";
import RecipientRoleAdditionalCardsManager from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsManager.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Recipient Role Additional Cards Manager Component", () => {
  const defaultProps: RecipientRoleAdditionalCardsManagerProps = {
    recipientRoleName: "thief",
  };
  const defaultCreateGameDto = createFakeCreateGameDto({
    additionalCards: [
      createFakeGameAdditionalCard({
        roleName: "seer",
        recipient: "thief",
      }),
      createFakeGameAdditionalCard({
        roleName: "seer",
        recipient: "actor",
      }),
      createFakeGameAdditionalCard({
        roleName: "seer",
        recipient: "thief",
      }),
    ],
  });
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: defaultCreateGameDto,
      },
    },
    stubActions: false,
  };
  let wrapper: ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsManager>>;

  async function mountRecipientRoleAdditionalCardsManagerComponent(options: ComponentMountingOptions<typeof RecipientRoleAdditionalCardsManager> = {}):
  Promise<ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsManager>>> {
    return mountSuspendedComponent(RecipientRoleAdditionalCardsManager, {
      props: defaultProps,
      global: {
        stubs: {
          Fieldset: false,
        },
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRecipientRoleAdditionalCardsManagerComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow.", async() => {
    wrapper = await mountRecipientRoleAdditionalCardsManagerComponent({
      shallow: false,
      global: {
        stubs: {
          RecipientRoleAdditionalCardsDisclaimer: true,
          RecipientRoleAdditionalCardsMultiSelect: true,
        },
        plugins: [createTestingPinia(testingPinia)],
      },
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Recipient Additional Cards Placement Text", () => {
    it("should translate recipient additional cards faced down placement text when there are 2 additional cards for thief.", () => {
      const recipientAdditionalCardsPlacementTextContainer = wrapper.find<HTMLDivElement>("#recipient-role-additional-cards-placement");

      expect(recipientAdditionalCardsPlacementTextContainer.text()).toBe("components.RecipientRoleAdditionalCardsManager.cardsPlacedFaceDown, 2");
    });

    it("should translate recipient additional cards faced up placement text when there is 1 additional card for actor.", async() => {
      wrapper = await mountRecipientRoleAdditionalCardsManagerComponent({
        props: {
          recipientRoleName: "actor",
        },
      });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        additionalCards: [
          createFakeGameAdditionalCard({
            roleName: "seer",
            recipient: "actor",
          }),
        ],
      });
      await nextTick();
      const recipientAdditionalCardsPlacementTextContainer = wrapper.find<HTMLDivElement>("#recipient-role-additional-cards-placement");

      expect(recipientAdditionalCardsPlacementTextContainer.text()).toBe("components.RecipientRoleAdditionalCardsManager.cardsPlacedFaceUp, 1");
    });

    it("should not render recipient additional cards placement text when there are no additional cards for thief.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto();
      await nextTick();
      const recipientAdditionalCardsPlacementTextContainer = wrapper.find<HTMLDivElement>("#recipient-role-additional-cards-placement");

      expect(recipientAdditionalCardsPlacementTextContainer.text()).toBe("");
    });
  });
});