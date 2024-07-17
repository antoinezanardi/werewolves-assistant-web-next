<template>
  <div
    id="game-playground-footer-countdown"
    class="flex flex-col h-full items-center justify-center"
  >
    <Transition
      mode="out-in"
      name="fade"
    >
      <div
        v-if="isCountdownOver"
        id="countdown-over"
        class="animate__animated animate__infinite animate__slow animate__tada flex gap-2 items-center justify-center"
      >
        <i class="fa fa-clock"/>

        <span id="countdown-over-text">
          {{ currentGamePlayCountdownIsOverText }}
        </span>
      </div>

      <div
        v-else
        id="countdown-running"
        class="flex flex-col items-center justify-center"
      >
        <div
          id="countdown-remaining-time-title"
          class="text-center"
        >
          {{ currentGamePlayCountdownTitle }}
        </div>

        <VueCountdown
          id="game-playground-footer-countdown-component"
          v-slot="{ minutes, seconds }"
          class="text-center w-full"
          :time="currentGamePlayCountdownTime"
          @end="onCountdownEnd"
        >
          <GamePlaygroundFooterCountdownRemainingTime
            id="game-playground-footer-countdown-remaining-time"
            :minutes="minutes"
            :seconds="seconds"
          />
        </VueCountdown>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TimedGamePlayAction } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/game-playground-footer-countdown.types";
import GamePlaygroundFooterCountdownRemainingTime from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownRemainingTime/GamePlaygroundFooterCountdownRemainingTime.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();
const { playSoundEffect } = useAudioStore();

const isCountdownOver = ref<boolean>(false);

const currentGamePlayCountdownTime = computed<number>(() => {
  const millisecondsInSecond = 1000;
  const meetEachOtherCountdownTimeInSeconds = 20;
  const voteCountdownTimeInSeconds = game.value.options.votes.duration;
  const currentGamePlayAction = game.value.currentPlay?.action;
  if (currentGamePlayAction === "meet-each-other") {
    return meetEachOtherCountdownTimeInSeconds * millisecondsInSecond;
  }
  if (currentGamePlayAction === "vote" || currentGamePlayAction === "elect-sheriff") {
    return voteCountdownTimeInSeconds * millisecondsInSecond;
  }
  return 0;
});

const currentGamePlayCountdownTitle = computed<string>(() => {
  const actionTitles: Record<TimedGamePlayAction, string> = {
    "meet-each-other": t("components.GamePlaygroundFooterCountdown.remainingTimeToMeetEachOther"),
    "vote": t("components.GamePlaygroundFooterCountdown.remainingTimeToVote"),
    "elect-sheriff": t("components.GamePlaygroundFooterCountdown.remainingTimeToElectSheriff"),
  };
  const actionTitle = actionTitles[game.value.currentPlay?.action as TimedGamePlayAction];

  return actionTitle ? actionTitle : "";
});

const currentGamePlayCountdownIsOverText = computed<string>(() => {
  const actionOverTitles: Record<TimedGamePlayAction, string> = {
    "meet-each-other": t("components.GamePlaygroundFooterCountdown.meetEachOtherTimeIsOver"),
    "vote": t("components.GamePlaygroundFooterCountdown.voteTimeIsOver"),
    "elect-sheriff": t("components.GamePlaygroundFooterCountdown.electSheriffTimeIsOver"),
  };
  const actionOverTitle = actionOverTitles[game.value.currentPlay?.action as TimedGamePlayAction];

  return actionOverTitle ? actionOverTitle : "";
});

function onCountdownEnd(): void {
  isCountdownOver.value = true;
  playSoundEffect("time-is-up");
}
</script>