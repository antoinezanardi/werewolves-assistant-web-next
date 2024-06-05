<template>
  <GameEventWithTexts
    id="game-sheriff-has-been-elected-event"
    :texts="gameSheriffHasBeenElectedEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="electedSheriffPlayer"
        id="game-event-flipping-last-play-targets-card"
        :players="[electedSheriffPlayer]"
        svg-icon-path="svg/game/player/player-attribute/sheriff.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import type { GameSheriffHasBeenElectedEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffHasBeenElectedEvent/game-sheriff-has-been-elected-event.types";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

const props = defineProps<GameSheriffHasBeenElectedEventProps>();

const electedSheriffPlayer = computed<Player | undefined>(() => props.event.players?.[0]);

const { t } = useI18n();

const gameSheriffHasBeenElectedEventTexts = computed<string[]>(() => {
  if (!electedSheriffPlayer.value) {
    return [t("components.GameSheriffHasBeenElectedEvent.cantFindElectedSheriff")];
  }
  return [
    t("components.GameSheriffHasBeenElectedEvent.sheriffHasBeenElected", { playerName: electedSheriffPlayer.value.name }),
    t("components.GameSheriffHasBeenElectedEvent.sheriffCanMakeSpeech"),
  ];
});
</script>