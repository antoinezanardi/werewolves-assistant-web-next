<template>
  <GameEventWithTexts
    id="game-seer-has-seen-event"
    :texts="gameSeerHasSeenEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-last-play-targets-card"
        :players="event.players"
        svg-icon-path="/svg/game/player/player-attribute/seen.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useArrays } from "~/composables/misc/useArrays";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { t } = useI18n();

const { insertIf } = useArrays();

const isSeerTalkative = computed<boolean>(() => game.value.options.roles.seer.isTalkative);

const canSeerSeeRole = computed<boolean>(() => game.value.options.roles.seer.canSeeRoles);

const seenPlayer = computed<Player | undefined>(() => props.event.players?.[0]);

const gameSeerHasSeenEventTexts = computed<string[]>(() => {
  if (!seenPlayer.value) {
    return [t("components.GameSeerHasSeenEvent.cantFindTargetedPlayer")];
  }
  if (!canSeerSeeRole.value) {
    const targetedPlayerSideText = t(`shared.role.side.${seenPlayer.value.side.current}`);

    return [
      ...insertIf(!isSeerTalkative.value, t("components.GameSeerHasSeenEvent.gameMasterWillMimeSide")),
      t("components.GameSeerHasSeenEvent.seerHasSeenSide", { side: targetedPlayerSideText }),
    ];
  }
  const targetedPlayerRoleText = t(`shared.role.indefiniteName.${seenPlayer.value.role.current}`);

  return [
    ...insertIf(!isSeerTalkative.value, t("components.GameSeerHasSeenEvent.gameMasterWillMimeRole")),
    t("components.GameSeerHasSeenEvent.seerHasSeenRole", { role: targetedPlayerRoleText }),
  ];
});

playSoundEffect("magic-wand");
</script>