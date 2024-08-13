<template>
  <PrimeVueFieldset
    :id="`role-additional-cards-manager-${recipientRoleName}`"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend :role-name="recipientRoleName"/>
    </template>

    <RecipientRoleAdditionalCardsDisclaimer
      id="recipient-role-additional-cards-disclaimer"
      :recipient-role-name="recipientRoleName"
    />

    <RecipientRoleAdditionalCardsMultiSelect
      id="recipient-role-additional-cards-multi-select"
      :recipient-role-name="recipientRoleName"
    />

    <div
      id="recipient-role-additional-cards-placement"
      class="flex font-semibold h-6 items-center justify-center mt-3"
    >
      <span v-if="additionalCardsPlacementText">
        <FontAwesomeIcon
          class="me-2 text-info"
          icon="info-circle"
        />

        <span>
          {{ additionalCardsPlacementText }}
        </span>
      </span>
    </div>
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { RecipientRoleAdditionalCardsManagerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/recipient-role-additional-cards-manager.types";
import RecipientRoleAdditionalCardsDisclaimer from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsDisclaimer/RecipientRoleAdditionalCardsDisclaimer.vue";
import RecipientRoleAdditionalCardsMultiSelect from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsMultiSelect/RecipientRoleAdditionalCardsMultiSelect.vue";
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const props = defineProps<RecipientRoleAdditionalCardsManagerProps>();

const createGameDtoStore = useCreateGameDtoStore();
const { getAdditionalCardsForRecipientInCreateGameDto } = createGameDtoStore;

const { t } = useI18n();

const additionalCardsPlacementText = computed<string>(() => {
  const additionalCards = getAdditionalCardsForRecipientInCreateGameDto(props.recipientRoleName);
  const additionalCardsCount = additionalCards.length;
  if (additionalCardsCount === 0) {
    return "";
  }
  if (props.recipientRoleName === "thief") {
    return t("components.RecipientRoleAdditionalCardsManager.cardsPlacedFaceDown", additionalCardsCount);
  }
  return t("components.RecipientRoleAdditionalCardsManager.cardsPlacedFaceUp", additionalCardsCount);
});
</script>