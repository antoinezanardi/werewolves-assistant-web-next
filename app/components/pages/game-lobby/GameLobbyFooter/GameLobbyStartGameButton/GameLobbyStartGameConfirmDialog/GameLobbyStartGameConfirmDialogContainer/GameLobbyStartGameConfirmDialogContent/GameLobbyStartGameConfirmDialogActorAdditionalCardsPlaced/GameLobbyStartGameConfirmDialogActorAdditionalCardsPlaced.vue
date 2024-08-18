<template>
  <div
    id="game-lobby-start-game-confirm-dialog-actor-additional-cards-placed"
    class="flex flex-col gap-6 items-center justify-center"
  >
    <div class="flex flex-col gap-2 items-center justify-center">
      <NuxtImg
        :alt="$t(`components.GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.actorIcon`)"
        :height="svgSize"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="/svg/role/actor.svg"
        :width="svgSize"
      />

      <div
        id="actor-additional-cards"
        class="flex gap-2"
      >
        <RoleImage
          v-for="(additionalCard, index) in actorAdditionalCards"
          :key="index"
          class="actor-additional-card"
          :role-name="additionalCard.roleName"
          size="30px"
        />
      </div>
    </div>

    <h4
      id="game-lobby-start-game-confirm-dialog-actor-additional-cards-placed-text"
      class="text-center"
    >
      {{ additionalCardsPlacedText }}
    </h4>

    <div
      id="game-lobby-start-game-confirm-dialog-actor-additional-cards-placed-actions"
      class="flex gap-2 items-center justify-evenly w-full"
    >
      <PrimeVueButton
        id="reject-step-button"
        :label="$t(`components.GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.changeActorAdditionalCards`)"
        severity="info"
        @click.prevent="onRejectActorAdditionalCardsPlacedStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="clover"/>
        </template>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-step-button"
        :label="$t(`shared.yes`)"
        severity="success"
        @click.prevent="onConfirmActorAdditionalCardsPlacedStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="check"/>
        </template>
      </PrimeVueButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameLobbyStartGameConfirmDialogActorAdditionalCardsPlacedEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced/game-lobby-start-game-confirm-dialog-actor-additional-cards-placed.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyStartGameConfirmDialogActorAdditionalCardsPlacedEmits>();

const svgSize = 75;

const createGameDtoStore = useCreateGameDtoStore();
const { getAdditionalCardsForRecipientInCreateGameDto } = createGameDtoStore;

const { t } = useI18n();

const actorAdditionalCards = computed<CreateGameAdditionalCardDto[]>(() => getAdditionalCardsForRecipientInCreateGameDto("actor"));

const additionalCardsPlacedText = computed<string>(() => {
  const tKey = "components.GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.actorAdditionalCardsMustBePlacedUp";

  return t(tKey, actorAdditionalCards.value.length);
});

function onConfirmActorAdditionalCardsPlacedStep(): void {
  emit("confirmStep");
}

function onRejectActorAdditionalCardsPlacedStep(): void {
  emit("rejectActorAdditionalCardsPlacedStep");
}
</script>