<template>
  <GameEventWithTexts
    id="game-wolf-hound-has-chosen-side-event"
    :texts="gameWolfHoundHasChosenSideEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="wolfHoundInPlayers"
        id="game-event-flipping-sheriff-card"
        :players="[wolfHoundInPlayers]"
        :svg-icon-path="wolfHoundChosenSideSvgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGamePlayers } from "~/composables/api/game/useGamePlayers";
import type { RoleSide } from "~/composables/api/role/types/role.types";
import type { SoundEffectName } from "~/stores/audio/types/audio.types";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getPlayersWithCurrentRole } = useGamePlayers(game);

const wolfHoundInPlayers = computed<Player | undefined>(() => getPlayersWithCurrentRole("wolf-hound")[0]);

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const chosenSide = computed<RoleSide | undefined>(() => wolfHoundInPlayers.value?.side.current);

const isWolfHoundSideRandomlyChosen = computed<boolean>(() => game.value.options.roles.wolfHound.isSideRandomlyChosen);

const isWolfHoundChosenSideRevealed = computed<boolean>(() => game.value.options.roles.wolfHound.isChosenSideRevealed);

const gameWolfHoundHasChosenSideEventTexts = computed<string[]>(() => {
  if (!wolfHoundInPlayers.value) {
    return [t("components.GameWolfHoundHasChosenSideEvent.cantFindWolfHoundOrChosenSide")];
  }
  const chosenSideLabel = t(`shared.role.side.${chosenSide.value}`);
  if (isWolfHoundChosenSideRevealed.value) {
    if (isWolfHoundSideRandomlyChosen.value) {
      return [t("components.GameWolfHoundHasChosenSideEvent.assistantChoseSideForWolfHoundRevelation", { side: chosenSideLabel })];
    }
    return [t("components.GameWolfHoundHasChosenSideEvent.wolfHoundChoseSideRevelation", { side: chosenSideLabel })];
  }
  if (isWolfHoundSideRandomlyChosen.value) {
    return [t("components.GameWolfHoundHasChosenSideEvent.assistantChoseSideForWolfHoundMime", { side: chosenSideLabel })];
  }
  return [t("components.GameWolfHoundHasChosenSideEvent.wolfHoundChoseSideQuietly")];
});

const wolfHoundChosenSideSvgIconPath = computed<string | undefined>(() => {
  if (!chosenSide.value) {
    return undefined;
  }
  const svgRole = chosenSide.value === "villagers" ? "villager" : "werewolf";

  return `svg/role/${svgRole}.svg`;
});

function playWolfHoundSoundEffect(): void {
  if (!chosenSide.value) {
    return;
  }
  if (isWolfHoundChosenSideRevealed.value) {
    const soundEffect: SoundEffectName = chosenSide.value === "villagers" ? "dog-barking" : "werewolf-howling";
    playSoundEffect(soundEffect);

    return;
  }
  playSoundEffect("distant-dog-howling");
}

playWolfHoundSoundEffect();
</script>