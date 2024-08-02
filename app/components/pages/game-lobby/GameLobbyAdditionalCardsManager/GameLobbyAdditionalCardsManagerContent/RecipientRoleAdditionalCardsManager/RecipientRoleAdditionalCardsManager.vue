<template>
  <PrimeVueFieldset
    :id="`role-additional-cards-manager-${recipientRoleName}`"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend :role-name="recipientRoleName"/>
    </template>

    <Transition
      mode="out-in"
      name="fade"
    >
      <h4
        :key="recipientRoleAdditionalCardsDisclaimerAndIcon.disclaimer"
        class="mb-8 text-center"
      >
        <i
          id="recipient-role-additional-cards-disclaimer-icon"
          class="me-3"
          :class="recipientRoleAdditionalCardsDisclaimerAndIcon.icon"
        />

        <span id="recipient-role-additional-cards-disclaimer">
          {{ recipientRoleAdditionalCardsDisclaimerAndIcon.disclaimer }}
        </span>
      </h4>
    </Transition>

    <div
      id="role-additional-card-manager-inputs"
      class="flex gap-2"
    >
      <div class="w-1/2">
        <PrimeVueMultiSelect
          v-model="selectedAdditionalCards"
          auto-filter-focus
          class="w-full"
          display="chip"
          :empty-filter-message="$t('components.RecipientRoleAdditionalCardsManager.noRoleFound')"
          filter
          :filter-placeholder="$t('components.RecipientRoleAdditionalCardsManager.searchRole')"
          highlight-on-select
          option-label="label"
          :options="availableAdditionalCards"
          :placeholder="$t('components.RecipientRoleAdditionalCardsManager.pickOneToFiveCards')"
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
        </PrimeVueMultiSelect>
      </div>

      <div class="w-1/2">
        CARDS
      </div>
    </div>
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { RoleAdditionalCardsManagerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/recipient-role-additional-cards-manager.types";
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useRolesStore } from "~/stores/role/useRolesStore";

type LabeledCreateGameAdditionalCardDto = CreateGameAdditionalCardDto & { label: string };

const props = defineProps<RoleAdditionalCardsManagerProps>();

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto } = storeToRefs(createGameDtoStore);

const { areAdditionalCardsSetForThiefIfPresent, areAdditionalCardsSetForActorIfPresent } = useCreateGameDtoValidation(createGameDto);

const rolesStore = useRolesStore();
const { getRolesForRecipientRoleName } = rolesStore;
const { getRoleNameLabel, getDefiniteRoleNameLabel } = useRoleName();

const { lowerCaseFirstLetter } = useStrings();

const { t } = useI18n();

const areAdditionalCardsSetForRecipientRoleName = computed<boolean>(() => {
  if (props.recipientRoleName === "thief") {
    return areAdditionalCardsSetForThiefIfPresent.value;
  }
  return areAdditionalCardsSetForActorIfPresent.value;
});

const recipientRoleAdditionalCardsDisclaimerAndIcon = computed<{ disclaimer: string; icon: string }>(() => {
  const definiteRecipientRoleName = getDefiniteRoleNameLabel(props.recipientRoleName, 1);
  const lowerCaseRecipientRoleName = lowerCaseFirstLetter(definiteRecipientRoleName);
  const recipientAdditionalCardsCount = selectedAdditionalCards.value.length;
  const componentRootTKey = "components.RecipientRoleAdditionalCardsManager";
  if (areAdditionalCardsSetForRecipientRoleName.value) {
    return {
      disclaimer: t(`${componentRootTKey}.additionalCardsSetDisclaimer`, { definiteRecipientRoleName, count: recipientAdditionalCardsCount }, recipientAdditionalCardsCount),
      icon: "fa fa-check-circle text-success",
    };
  }
  return {
    disclaimer: t(`${componentRootTKey}.additionalCardsNotSetDisclaimer`, { definiteRecipientRoleName: lowerCaseRecipientRoleName }),
    icon: "fa fa-exclamation-circle text-error fa-beat",
  };
});

const selectedAdditionalCards = computed<CreateGameAdditionalCardDto[]>({
  get: () => createGameDto.value.additionalCards?.filter(additionalCard => additionalCard.recipient === props.recipientRoleName) ?? [],
  set: (value: CreateGameAdditionalCardDto[]) => {
    createGameDtoStore.setAdditionalCardsForRecipientInCreateGameDto(value, props.recipientRoleName);
  },
});

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