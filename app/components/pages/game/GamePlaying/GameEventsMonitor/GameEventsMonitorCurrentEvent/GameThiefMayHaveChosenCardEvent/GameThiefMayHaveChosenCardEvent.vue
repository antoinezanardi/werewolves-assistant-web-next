<template>
  <GameEventWithTexts
    id="game-thief-may-have-chosen-card-event"
    :texts="gameThiefMayHaveChosenCardEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayersCard
        id="game-event-flipping-last-play-source-card"
        :players="event.players"
        :svg-icon-path="svgIconPath"
      />
    </div>
  </GameEventWithTexts>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types.js";
import GameEventFlippingPlayersCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayersCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<CurrentGameEventProps>();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { getDefiniteRoleNameLabel } = useRoleName();

const { t } = useI18n();

const audioStore = useAudioStore();
const { playSoundEffect } = audioStore;

const thiefPlayer = computed<Player | undefined>(() => props.event.players?.[0]);

const chosenCard = computed<GameAdditionalCard | undefined>(() => game.value.lastGameHistoryRecord?.play.chosenCard);

const isThiefChosenCardRevealed = computed<boolean>(() => game.value.options.roles.thief.isChosenCardRevealed);

const gameThiefMayHaveChosenCardEventTexts = computed<string[]>(() => {
  if (!thiefPlayer.value) {
    return [t("components.GameThiefMayHaveChosenCardEvent.cantFindThief")];
  }
  if (isThiefChosenCardRevealed.value) {
    return gameThiefRevealedChosenCardTexts.value;
  }
  return [
    t("components.GameThiefMayHaveChosenCardEvent.thiefMayHaveChosenCard"),
    t("components.GameThiefMayHaveChosenCardEvent.gameMasterWillSwitchCardsIfThiefChoseCard"),
  ];
});

const gameThiefRevealedChosenCardTexts = computed<string[]>(() => {
  if (chosenCard.value === undefined) {
    return [
      t("components.GameThiefMayHaveChosenCardEvent.thiefHasNotChosenCard"),
      t("components.GameThiefMayHaveChosenCardEvent.gameMasterCanTakeAwayRemainingCards"),
    ];
  }
  const chosenCardDefiniteRoleName = getDefiniteRoleNameLabel(chosenCard.value.roleName, 1);

  return [
    t("components.GameThiefMayHaveChosenCardEvent.thiefHasChosenCard", { roleName: chosenCardDefiniteRoleName }),
    t("components.GameThiefMayHaveChosenCardEvent.gameMasterCanTakeAwayRemainingCards"),
  ];
});

const svgIconPath = computed<string | undefined>(() => {
  if (chosenCard.value === undefined) {
    return undefined;
  }
  return "/svg/role/thief.svg";
});

playSoundEffect("evil-laugh");
</script>