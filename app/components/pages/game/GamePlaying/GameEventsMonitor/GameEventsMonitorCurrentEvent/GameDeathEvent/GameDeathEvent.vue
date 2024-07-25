<template>
  <GameEventWithTexts
    id="game-death-event"
    :texts="gamePlayerDiesEventTexts"
    @game-event-text-change="onGameEventTextChangeFromGameEventWithTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-player-card"
        image-classes="grayscale"
        :players="event.players"
        svg-icon-path="/svg/game/player/dead.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const areRolesRevealedOnDeath = computed<boolean>(() => game.value.options.roles.areRevealedOnDeath);

const gamePlayerDiesEventTexts = computed<string[]>(() => {
  if (!props.event.players || props.event.players.length === 0) {
    return [t("components.GameDeathEvent.cantFindDeadPlayer")];
  }
  const roleRevealTKey = areRolesRevealedOnDeath.value ? "components.GameDeathEvent.playerCanRevealRole" : "components.GameDeathEvent.playerDoesntRevealRole";

  return props.event.players.flatMap(deadPlayer => [
    t("components.GameDeathEvent.playerDies", { playerName: deadPlayer.name }),
    t(roleRevealTKey),
  ]);
});

function onGameEventTextChangeFromGameEventWithTexts(newGameEventText: string): void {
  const deathSoundFrequency = 2;
  const gameEventTextIndex = gamePlayerDiesEventTexts.value.indexOf(newGameEventText);
  if (gameEventTextIndex % deathSoundFrequency === 0) {
    playSoundEffect("death");
  }
}

playSoundEffect("death");
</script>