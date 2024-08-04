<template>
  <div id="recipient-role-additional-cards-multi-select-container">
    <PrimeVueMultiSelect
      id="recipient-role-additional-cards-multi-select"
      v-model="selectedAdditionalCards"
      auto-filter-focus
      class="w-full"
      display="chip"
      :empty-filter-message="$t('components.RecipientRoleAdditionalCardsMultiSelect.noRoleFound')"
      filter
      :filter-placeholder="$t('components.RecipientRoleAdditionalCardsMultiSelect.searchRole')"
      highlight-on-select
      :invalid="!isAtLeastOneAdditionalCardSelected"
      option-label="label"
      :options="availableAdditionalCards"
      :placeholder="$t('components.RecipientRoleAdditionalCardsMultiSelect.pickOneToFiveCards')"
      :pt="{ 'labelContainer': 'flex justify-center items-center h-20' }"
      reset-filter-on-hide
      :selection-limit="5"
      :show-toggle-all="false"
    >
      <template #option="{ option }">
        <div class="align-options-center flex">
          <RoleImage
            class="me-2"
            :role-name="option.roleName"
            size="small"
            sizes="30"
          />

          <div>{{ option.label }}</div>
        </div>
      </template>

      <template #chip="{ value }">
        <RoleImage
          class="me-2"
          :role-name="value.roleName"
          size="small"
        />

        <span>{{ value.label }}</span>
      </template>
    </PrimeVueMultiSelect>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { LabeledCreateGameAdditionalCardDto, RecipientRoleAdditionalCardsMultiSelectProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsMultiSelect/recipient-role-additional-cards-multi-select.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useRolesStore } from "~/stores/role/useRolesStore";

const props = defineProps<RecipientRoleAdditionalCardsMultiSelectProps>();

const createGameDtoStore = useCreateGameDtoStore();
const { getAdditionalCardsForRecipientInCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const rolesStore = useRolesStore();
const { getRolesForRecipientRoleName } = rolesStore;
const { getRoleNameLabel } = useRoleName();

const selectedAdditionalCards = computed<CreateGameAdditionalCardDto[]>({
  get: () => getAdditionalCardsForRecipientInCreateGameDto(props.recipientRoleName),
  set: (value: CreateGameAdditionalCardDto[]) => {
    createGameDtoStore.setAdditionalCardsForRecipientInCreateGameDto(value, props.recipientRoleName);
  },
});

const isAtLeastOneAdditionalCardSelected = computed<boolean>(() => selectedAdditionalCards.value.length > 0);

const availableAdditionalCards = computed<LabeledCreateGameAdditionalCardDto[]>(() => {
  const roles = getRolesForRecipientRoleName(props.recipientRoleName);
  const availableRoles = roles.filter(({ name }) => isRoleAvailableInCreateGameDto(name));

  const availableCards = availableRoles.map(({ name }) => ({
    ...CreateGameAdditionalCardDto.create({
      recipient: props.recipientRoleName,
      roleName: name,
    }),
    label: getRoleNameLabel(name),
  }));

  return availableCards.toSorted((cardA, cardB) => cardA.label.localeCompare(cardB.label));
});

function isRoleAvailableInCreateGameDto(roleName: RoleName): boolean {
  const isRoleTakenAmongPlayers = createGameDto.value.players.some(player => player.role.name === roleName);
  const isRoleTakenAmongAdditionalCards = createGameDto.value.additionalCards?.some(additionalCard => additionalCard.roleName === roleName &&
    additionalCard.recipient !== props.recipientRoleName) === true;

  return !isRoleTakenAmongPlayers && !isRoleTakenAmongAdditionalCards;
}
</script>