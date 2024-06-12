<template>
  <GameEventWithTexts
    id="game-player-dies-event"
    :texts="gamePlayerDiesEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="deadPlayer"
        id="game-event-flipping-player-card"
        image-classes="grayscale"
        :players="[deadPlayer]"
        svg-icon-path="/svg/game/player/dead.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { GamePlayerDiesEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/game-player-dies-event.types";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GamePlayerDiesEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const areRolesRevealedOnDeath = computed<boolean>(() => game.value.options.roles.areRevealedOnDeath);

const deadPlayer = computed<Player | undefined>(() => props.event.players?.[0]);

const gamePlayerDiesEventTexts = computed<string[]>(() => {
  if (!deadPlayer.value) {
    return [t("components.GamePlayerDiesEvent.cantFindDeadPlayer")];
  }
  const roleRevealTKey = areRolesRevealedOnDeath.value ? "components.GamePlayerDiesEvent.playerCanRevealRole" : "components.GamePlayerDiesEvent.playerDoesntRevealRole";

  return [
    t("components.GamePlayerDiesEvent.playerDies", { playerName: deadPlayer.value.name }),
    t(roleRevealTKey),
  ];
});

playSoundEffect("death");
</script>