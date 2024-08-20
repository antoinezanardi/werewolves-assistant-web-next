<template>
  <div
    id="game-playground-footer-make-play-button"
    v-p-tooltip="buttonTooltipOptions"
    class="flex justify-center"
  >
    <PrimeVueButton
      id="make-play-button"
      class="uppercase w-full"
      :disabled="isButtonDisabled"
      :label="$t('components.GamePlaygroundFooterMakePlayButton.makePlay')"
      :loading="isLoadingMakePlay"
      raised
      severity="primary"
      type="button"
      @click.prevent="onClickFromMakePlayButton"
    >
      <template #icon>
        <FontAwesomeIcon
          icon="play"
        />
      </template>
    </PrimeVueButton>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import type { TooltipOptions } from "primevue/tooltip";

import { useMakeGamePlayDtoValidation } from "~/composables/api/game/useMakeGamePlayDtoValidation";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { useKeyboardStore } from "~/stores/keyboard/useKeyboardStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { makeGamePlay } = gameStore;

const img = useImage();

const { resetMakeGamePlayDto } = useMakeGamePlayDtoStore();

const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
const { makeGamePlayDto } = storeToRefs(makeGamePlayDtoStore);

const { canMakeGamePlay } = useMakeGamePlayDtoValidation(makeGamePlayDto, game);

const keyboardStore = useKeyboardStore();
const { keyboard } = storeToRefs(keyboardStore);

const { t } = useI18n();

const isLoadingMakePlay = ref<boolean>(false);

const canClickMakePlayButton = computed<boolean>(() => canMakeGamePlay.value && !isLoadingMakePlay.value);

const isButtonDisabled = computed<boolean>(() => !canMakeGamePlay.value || isLoadingMakePlay.value);

const buttonTooltipOptions = computed<TooltipOptions>(() => {
  const enterImgUrl = img("svg/keyboard/enter-key.svg");
  const shiftImgUrl = img("svg/keyboard/shift-key.svg");

  return {
    disabled: !canClickMakePlayButton.value,
    value: `<div class="flex flex-col gap-2 items-center">
              <div>${t("components.GamePlaygroundFooterMakePlayButton.makePlayAndProceedToNextOne")}</div>
              <div class="flex gap-2 items-center">
                <img width="90" class="self-center" alt="${t("shared.keyboard.shiftKey")}" src="${shiftImgUrl}"/>
                <img width="45" alt="${t("shared.keyboard.enterKey")}" src="${enterImgUrl}"/>
              </div>
            </div>`,
    escape: false,
    fitContent: false,
  };
});

async function onClickFromMakePlayButton(): Promise<void> {
  if (!canClickMakePlayButton.value) {
    return;
  }
  isLoadingMakePlay.value = true;
  await makeGamePlay(makeGamePlayDto.value);
  resetMakeGamePlayDto();
  isLoadingMakePlay.value = false;
}

watch(() => keyboard.value.enter.isPressed, (isKeyPressed: boolean) => {
  if (!isKeyPressed || !keyboard.value.shift.isPressed) {
    return;
  }
  void onClickFromMakePlayButton();
});
</script>