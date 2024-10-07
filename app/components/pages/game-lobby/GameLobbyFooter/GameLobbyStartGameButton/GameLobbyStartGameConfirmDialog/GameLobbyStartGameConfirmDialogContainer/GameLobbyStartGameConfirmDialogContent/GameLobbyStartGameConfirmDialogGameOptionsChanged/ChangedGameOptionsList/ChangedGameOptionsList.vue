<template>
  <div id="changed-game-options-list">
    <ul class="max-h-40 md:max-h-64 overflow-y-scroll px-1">
      <li
        v-for="gameOptionText in changedGameOptionsTexts"
        :key="gameOptionText"
        class="!bg-sky-950 border-2 border-gray-600 changed-game-options-list-item flex gap-4 items-center px-2 py-1 rounded-md shadow-black shadow-md"
      >
        <PrimeVueButton
          v-p-tooltip.top="$t('components.ChangedGameOptionsList.resetToOfficialRule')"
          :aria-label="$t('components.ChangedGameOptionsList.resetOptionAlt', { 'option': gameOptionText })"
          class="!w-2 h-4 reset-changed-game-option-button text-xs"
          raised
          severity="danger"
          size="small"
          @click.prevent="onClickFromResetChangedGameOptionButton(gameOptionText)"
        >
          <template #icon>
            <FontAwesomeIcon
              icon="minus"
            />
          </template>
        </PrimeVueButton>

        <p class="!leading-relaxed !mb-0">
          {{ gameOptionText }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";

import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const createGameDtoStore = useCreateGameDtoStore();
const { resetCreateGameOptionDto } = createGameDtoStore;
const { createGameOptionsDto } = storeToRefs(createGameDtoStore);

const { changedGameOptionsTexts, getGameOptionKeyFromText } = useGameOptionsTexts(createGameOptionsDto);

function onClickFromResetChangedGameOptionButton(gameOptionText: string): void {
  const key = getGameOptionKeyFromText(gameOptionText);
  if (key === undefined) {
    return;
  }
  resetCreateGameOptionDto(key);
  if (key === "roles.sheriff.electedAt.turn") {
    resetCreateGameOptionDto("roles.sheriff.electedAt.phaseName");
  }
}
</script>