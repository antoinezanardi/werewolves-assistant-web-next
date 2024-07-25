<template>
  <GameEventWithTexts
    id="game-villager-villager-introduction-event"
    :texts="gameVillagerVillagerIntroductionEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="villagerVillagerInPlayers"
        id="game-event-flipping-villager-villager-introduction-card"
        :players="[villagerVillagerInPlayers]"
        svg-icon-path="svg/game/player/player-attribute/seen.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const props = defineProps<CurrentGameEventProps>();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const villagerVillagerInPlayers = computed<Player | undefined>(() => props.event.players?.[0]);

const gameVillagerVillagerIntroductionEventTexts = computed<string[]>(() => {
  if (!villagerVillagerInPlayers.value) {
    return [t("components.GameVillagerVillagerIntroductionEvent.cantFindVillagerVillager")];
  }
  return [
    t("components.GameVillagerVillagerIntroductionEvent.villagerVillagerIntroduction", { playerName: villagerVillagerInPlayers.value.name }),
    t("components.GameVillagerVillagerIntroductionEvent.idealPlayerForSheriff"),
  ];
});

playSoundEffect("clearing-throat-and-bell-dings");
</script>