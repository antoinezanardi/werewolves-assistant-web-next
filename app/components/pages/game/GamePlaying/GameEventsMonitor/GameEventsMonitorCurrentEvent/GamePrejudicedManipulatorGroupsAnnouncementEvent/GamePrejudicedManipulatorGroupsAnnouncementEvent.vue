<template>
  <GameEventWithTexts
    id="game-prejudiced-manipulator-groups-announcement-event"
    :texts="gamePrejudicedManipulatorGroupsAnnouncementEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        v-if="prejudicedManipulatorInPlayers"
        id="game-event-flipping-prejudiced-manipulator-groups-announcement-card"
        :players="[prejudicedManipulatorInPlayers]"
        svg-icon-path="svg/role/prejudiced-manipulator.svg"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { group } from "radash";

import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { usePlayers } from "~/composables/api/game/player/usePlayers";
import type { Player, PlayerWithGroup } from "~/composables/api/game/types/players/player.class";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const { getPlayersNamesText } = usePlayers();

const { t } = useI18n();

const prejudicedManipulatorInPlayers = computed<Player | undefined>(() => props.event.players?.[0]);

const groupedPlayers = computed<Partial<Record<string, Player[]>>>(() => group<PlayerWithGroup, string>(game.value.players as PlayerWithGroup[], player => player.group));

const gamePrejudicedManipulatorGroupsAnnouncementEventTexts = computed<string[]>(() => {
  const groupTexts = Object.entries(groupedPlayers.value).map(([playerGroup, players]) => {
    const playersText = getPlayersNamesText(players as PlayerWithGroup[]);

    return t("components.GamePrejudicedManipulatorGroupsAnnouncementEvent.groupWithPlayers", { playerGroup, playersText });
  });

  return [
    t("components.GamePrejudicedManipulatorGroupsAnnouncementEvent.prejudicedManipulatorIsInTheGame"),
    ...groupTexts,
    t("components.GamePrejudicedManipulatorGroupsAnnouncementEvent.ifPrejudicedGroupIsAliveHeWins"),
  ];
});

playSoundEffect("evil-laugh-2");
</script>