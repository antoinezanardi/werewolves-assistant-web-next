import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameAdditionalCardDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { RecipientRoleAdditionalCardsDisclaimerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsDisclaimer/recipient-role-additional-cards-disclaimer.types";
import RecipientRoleAdditionalCardsDisclaimer from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsDisclaimer/RecipientRoleAdditionalCardsDisclaimer.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Recipient Role Additional Cards Disclaimer Component", () => {
  const defaultProps: RecipientRoleAdditionalCardsDisclaimerProps = {
    recipientRoleName: "thief",
  };
  const defaultCreateFakeCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({
        role: createFakeCreateGamePlayerRoleDto({
          name: "thief",
        }),
      }),
    ],
    additionalCards: [
      createFakeCreateGameAdditionalCardDto({ recipient: "thief" }),
      createFakeCreateGameAdditionalCardDto({ recipient: "thief" }),
    ],
  });
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: defaultCreateFakeCreateGameDto,
      },
    },
    stubActions: false,
  };
  let wrapper: ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsDisclaimer>>;

  async function mountRecipientRoleAdditionalCardsDisclaimerComponent(options: ComponentMountingOptions<typeof RecipientRoleAdditionalCardsDisclaimer> = {}):
  Promise<ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsDisclaimer>>> {
    return mountSuspendedComponent(RecipientRoleAdditionalCardsDisclaimer, {
      props: defaultProps,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRecipientRoleAdditionalCardsDisclaimerComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateFakeCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Disclaimer icon", () => {
    it("should set success icon when there are additional cards for thief.", () => {
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#recipient-role-additional-cards-disclaimer-icon");

      expect(icon.props("icon")).toBe("check-circle");
    });

    it("should set text success class when there are additional cards for thief.", () => {
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#recipient-role-additional-cards-disclaimer-icon");

      expect(icon.classes()).toContain("text-success");
    });

    it("should set error icon when there are no additional cards for thief.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = [];
      await nextTick();
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#recipient-role-additional-cards-disclaimer-icon");

      expect(icon.props("icon")).toBe("exclamation-circle");
    });

    it("should set text-error and beat classes when there are no additional cards for thief.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = [];
      await nextTick();
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#recipient-role-additional-cards-disclaimer-icon");

      expect(icon.classes()).toContain("text-error");
      expect(icon.classes()).toContain("fa-beat");
    });

    it("should set error icon when there are no additional cards for actor, recipient is actor but there are cards for thief.", async() => {
      wrapper = await mountRecipientRoleAdditionalCardsDisclaimerComponent({
        props: {
          recipientRoleName: "actor",
        },
      });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        defaultCreateFakeCreateGameDto.players[0],
        createFakeCreateGamePlayerDto({
          role: createFakeCreateGamePlayerRoleDto({
            name: "actor",
          }),
        }),
      ];
      await nextTick();
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#recipient-role-additional-cards-disclaimer-icon");

      expect(icon.props("icon")).toBe("exclamation-circle");
    });
  });

  describe("Disclaimer text", () => {
    it("should set success text when there are additional cards for thief.", () => {
      const text = wrapper.find<HTMLSpanElement>("#recipient-role-additional-cards-disclaimer");

      expect(text.text()).toBe(`components.RecipientRoleAdditionalCardsDisclaimer.additionalCardsSetDisclaimer, {"definiteRecipientRoleName":"shared.role.definiteName.thief, 1","count":2}, 2`);
    });

    it("should set error text when there are no additional cards for thief.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = [];
      await nextTick();
      const text = wrapper.find<HTMLSpanElement>("#recipient-role-additional-cards-disclaimer");

      expect(text.text()).toBe(`components.RecipientRoleAdditionalCardsDisclaimer.additionalCardsNotSetDisclaimer, {"definiteRecipientRoleName":"shared.role.definiteName.thief, 1"}`);
    });

    it("should set error text when there are no additional cards for actor, recipient is actor but there are cards for thief.", async() => {
      wrapper = await mountRecipientRoleAdditionalCardsDisclaimerComponent({
        props: {
          recipientRoleName: "actor",
        },
      });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        defaultCreateFakeCreateGameDto.players[0],
        createFakeCreateGamePlayerDto({
          role: createFakeCreateGamePlayerRoleDto({
            name: "actor",
          }),
        }),
      ];
      await nextTick();
      const text = wrapper.find<HTMLSpanElement>("#recipient-role-additional-cards-disclaimer");

      expect(text.text()).toBe(`components.RecipientRoleAdditionalCardsDisclaimer.additionalCardsNotSetDisclaimer, {"definiteRecipientRoleName":"shared.role.definiteName.actor, 1"}`);
    });
  });
});