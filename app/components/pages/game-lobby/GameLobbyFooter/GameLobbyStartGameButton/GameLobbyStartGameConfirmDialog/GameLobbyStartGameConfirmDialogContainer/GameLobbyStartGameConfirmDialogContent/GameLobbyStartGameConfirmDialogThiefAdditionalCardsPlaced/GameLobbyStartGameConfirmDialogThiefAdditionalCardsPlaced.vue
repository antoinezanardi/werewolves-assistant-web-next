<template>
  <div
    id="game-lobby-start-game-confirm-dialog-thief-additional-cards-placed"
    class="flex flex-col gap-6 items-center justify-center"
  >
    <div class="flex flex-col items-center justify-center">
      <NuxtImg
        :alt="$t(`components.GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.thiefIcon`)"
        class="-mt-4"
        :height="svgSize"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="/svg/role/thief.svg"
        :width="svgSize"
      />

      <div
        id="thief-additional-cards"
        class="flex gap-2"
      >
        <RoleImage
          v-for="(additionalCard, index) in thiefAdditionalCards"
          :key="index"
          class="thief-additional-card"
          :role-name="additionalCard.roleName"
          size="30px"
        />
      </div>
    </div>

    <h4
      id="game-lobby-start-game-confirm-dialog-thief-additional-cards-placed-text"
      class="text-center"
    >
      {{ additionalCardsPlacedText }}
    </h4>

    <div
      id="game-lobby-start-game-confirm-dialog-thief-additional-cards-placed-actions"
      class="flex gap-2 items-center justify-evenly w-full"
    >
      <PrimeVueButton
        id="reject-step-button"
        :label="$t(`components.GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.changeThiefAdditionalCards`)"
        severity="info"
        @click.prevent="onRejectThiefAdditionalCardsPlacedStep"
      >
        <template #icon>
          <FontAwesomeIcon icon="clover"/>
        </template>
      </PrimeVueButton>

      <PrimeVueButton
        id="confirm-step-button"
        :label="$t(`shared.yes`)"
        severity="success"
        @click.prevent="onConfirmThiefAdditionalCardsPlacedStep"
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
import type { GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlacedEmits } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced/game-lobby-start-game-confirm-dialog-thief-additional-cards-placed.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlacedEmits>();

const svgSize = 75;

const createGameDtoStore = useCreateGameDtoStore();
const { getAdditionalCardsForRecipientInCreateGameDto } = createGameDtoStore;

const { t } = useI18n();

const thiefAdditionalCards = computed<CreateGameAdditionalCardDto[]>(() => getAdditionalCardsForRecipientInCreateGameDto("thief"));

const additionalCardsPlacedText = computed<string>(() => {
  const tKey = "components.GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.thiefAdditionalCardsMustBePlacedDown";

  return t(tKey, thiefAdditionalCards.value.length);
});

function onConfirmThiefAdditionalCardsPlacedStep(): void {
  emit("confirmStep");
}

function onRejectThiefAdditionalCardsPlacedStep(): void {
  emit("rejectThiefAdditionalCardsPlacedStep");
}
</script>