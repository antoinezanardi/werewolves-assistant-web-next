import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameAdditionalCardDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type MultiSelect from "primevue/multiselect";
import type { LabeledCreateGameAdditionalCardDto, RecipientRoleAdditionalCardsMultiSelectProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsMultiSelect/recipient-role-additional-cards-multi-select.types";
import RecipientRoleAdditionalCardsMultiSelect from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsMultiSelect/RecipientRoleAdditionalCardsMultiSelect.vue";
import type { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useRolesStore } from "~/stores/role/useRolesStore";

describe("Recipient Role Additional Cards Multi Select Component", () => {
  const defaultRoles = [
    createFakeRole({
      name: "seer",
      additionalCardsEligibleRecipients: ["thief"],
    }),
    createFakeRole({
      name: "hunter",
      additionalCardsEligibleRecipients: ["actor"],
    }),
    createFakeRole({
      name: "defender",
      additionalCardsEligibleRecipients: ["thief", "actor"],
    }),
    createFakeRole({
      name: "witch",
    }),
    createFakeRole({
      name: "idiot",
      additionalCardsEligibleRecipients: ["thief"],
    }),
    createFakeRole({
      name: "pied-piper",
      additionalCardsEligibleRecipients: ["thief"],
    }),
    createFakeRole({
      name: "accursed-wolf-father",
      additionalCardsEligibleRecipients: ["thief"],
    }),
  ];
  const defaultCreateFakeCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "idiot" }) }),
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "villager" }) }),
    ],
    additionalCards: [
      createFakeCreateGameAdditionalCardDto({
        roleName: "defender",
        recipient: "actor",
      }),
      createFakeCreateGameAdditionalCardDto({
        roleName: "pied-piper",
        recipient: "thief",
      }),
    ],
  });
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: defaultCreateFakeCreateGameDto,
      },
      [StoreIds.ROLES]: {
        roles: defaultRoles,
      },
    },
    stubActions: false,
  };
  const defaultProps: RecipientRoleAdditionalCardsMultiSelectProps = {
    recipientRoleName: "thief",
  };
  let wrapper: ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsMultiSelect>>;

  async function mountRecipientRoleAdditionalCardsMultiSelectComponent(options: ComponentMountingOptions<typeof RecipientRoleAdditionalCardsMultiSelect> = {}):
  Promise<ReturnType<typeof mount<typeof RecipientRoleAdditionalCardsMultiSelect>>> {
    return mountSuspendedComponent(RecipientRoleAdditionalCardsMultiSelect, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          MultiSelect: false,
        },
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRecipientRoleAdditionalCardsMultiSelectComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateFakeCreateGameDto);
    const rolesStore = useRolesStore();
    rolesStore.roles = defaultRoles;
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Multi Select", () => {
    it("should pass recipient available additional cards to multi select when role is not taken by players nor by existing additional cards recipients.", () => {
      const expectedRecipientAdditionalCards: LabeledCreateGameAdditionalCardDto[] = [
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "accursed-wolf-father",
            recipient: "thief",
          }),
          label: "shared.role.name.accursed-wolf-father",
        },
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "pied-piper",
            recipient: "thief",
          }),
          label: "shared.role.name.pied-piper",
        },
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "seer",
            recipient: "thief",
          }),
          label: "shared.role.name.seer",
        },
      ];
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("options")).toStrictEqual<LabeledCreateGameAdditionalCardDto[]>(expectedRecipientAdditionalCards);
    });

    it("should pass more recipient available additional cards to multi select when there are no additional cards.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = undefined;
      await nextTick();
      const expectedRecipientAdditionalCards: LabeledCreateGameAdditionalCardDto[] = [
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "accursed-wolf-father",
            recipient: "thief",
          }),
          label: "shared.role.name.accursed-wolf-father",
        },
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "defender",
            recipient: "thief",
          }),
          label: "shared.role.name.defender",
        },
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "pied-piper",
            recipient: "thief",
          }),
          label: "shared.role.name.pied-piper",
        },
        {
          ...createFakeCreateGameAdditionalCardDto({
            roleName: "seer",
            recipient: "thief",
          }),
          label: "shared.role.name.seer",
        },
      ];
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("options")).toStrictEqual<LabeledCreateGameAdditionalCardDto[]>(expectedRecipientAdditionalCards);
    });

    it("should translate empty filter message when rendered.", () => {
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("emptyFilterMessage")).toBe("No role found");
    });

    it("should translate filter placeholder when rendered.", () => {
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("filterPlaceholder")).toBe("Search for a role");
    });

    it("should pass selected recipient additional cards to multi select when recipient has selected cards already.", () => {
      const expectedRecipientAdditionalCards = [
        createFakeCreateGameAdditionalCardDto({
          roleName: "pied-piper",
          recipient: "thief",
        }),
      ];
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("modelValue")).toStrictEqual<CreateGameAdditionalCardDto[]>(expectedRecipientAdditionalCards);
    });

    it("should update create game dto additional cards when multi select emit update model value event.", async() => {
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");
      const expectedRecipientAdditionalCards = [
        createFakeCreateGameAdditionalCardDto({
          roleName: "seer",
          recipient: "thief",
        }),
      ];
      const createGameDtoStore = useCreateGameDtoStore();
      multiSelect.vm.$emit("update:modelValue", expectedRecipientAdditionalCards);
      await nextTick();

      expect(createGameDtoStore.setAdditionalCardsForRecipientInCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedRecipientAdditionalCards, "thief");
    });

    it("should set invalid when there are no additional cards for recipient role.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = [];
      await nextTick();
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("invalid")).toBeTruthy();
    });

    it("should not set invalid when there are additional cards for recipient role.", () => {
      const multiSelect = wrapper.findComponent<typeof MultiSelect>("#recipient-role-additional-cards-multi-select");

      expect(multiSelect.props("invalid")).toBeFalsy();
    });
  });
});