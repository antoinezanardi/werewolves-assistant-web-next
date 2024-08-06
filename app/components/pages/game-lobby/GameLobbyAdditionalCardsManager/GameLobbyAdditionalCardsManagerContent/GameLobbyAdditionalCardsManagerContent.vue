<template>
  <div
    id="game-lobby-additional-cards-manager-content"
    class="flex flex-col gap-4"
  >
    <RecipientRoleAdditionalCardsManager
      v-for="roleName in additionalCardsDependantRolesInCreateGameDto"
      :key="roleName"
      class="recipient-role-additional-cards-manager"
      :recipient-role-name="roleName"
    />
  </div>
</template>

<script setup lang="ts">
import RecipientRoleAdditionalCardsManager from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsManager.vue";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";
import { ADDITIONAL_CARDS_DEPENDANT_ROLES } from "~/composables/api/role/constants/role.constants";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { isRoleInCreateGameDto } = createGameDtoStore;

const additionalCardsDependantRolesInCreateGameDto = computed<GameAdditionalCardRecipientRoleName[]>(() => ADDITIONAL_CARDS_DEPENDANT_ROLES.filter(isRoleInCreateGameDto));
</script>