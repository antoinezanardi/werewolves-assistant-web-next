<template>
  <div
    id="close-button-only-dialog-footer"
    class="w-full"
  >
    <PrimeVueDivider class="!my-2"/>

    <div class="flex gap-1 justify-between w-full">
      <Transition
        mode="out-in"
        name="fade"
      >
        <PrimeVueButton
          v-if="isResetOptionsButtonDisplayed"
          id="reset-options-button"
          v-p-tooltip.top="$t('components.GameLobbyOptionsHubFooter.youHaveChangedOptions', { 'count': changedGameOptionsTexts.length })"
          :label="$t('components.GameLobbyOptionsHubFooter.resetOptions')"
          severity="primary"
          @click.prevent="resetGameOptions"
        >
          <template #icon>
            <FontAwesomeIcon
              id="icon"
              icon="rotate"
            />
          </template>
        </PrimeVueButton>

        <div v-else/>
      </Transition>

      <PrimeVueButton
        id="close-button"
        :label="$t('shared.actions.close')"
        severity="secondary"
        @click.prevent="close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { GameLobbyOptionsHubFooterEmits } from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubFooter/game-lobby-options-hub-footer.types";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const emit = defineEmits<GameLobbyOptionsHubFooterEmits>();

const createGameDtoStore = useCreateGameDtoStore();
const { resetCreateGameOptionsDto } = createGameDtoStore;
const { createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { changedGameOptionsTexts } = useGameOptionsTexts(createGameOptionsDto);

const isResetOptionsButtonDisplayed = computed<boolean>(() => changedGameOptionsTexts.value.length > 0);

function resetGameOptions(): void {
  resetCreateGameOptionsDto();
}

function close(): void {
  emit("closeDialog");
}
</script>