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
  </PrimeVueFieldset>
</template>

<script setup lang="ts">
import type { RecipientRoleAdditionalCardsManagerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/recipient-role-additional-cards-manager.types";
import RecipientRoleAdditionalCardsDisclaimer from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsDisclaimer/RecipientRoleAdditionalCardsDisclaimer.vue";
import RecipientRoleAdditionalCardsMultiSelect from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsMultiSelect/RecipientRoleAdditionalCardsMultiSelect.vue";
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";

defineProps<RecipientRoleAdditionalCardsManagerProps>();
</script>