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
        class="animate__animated animate__heartBeat animate__infinite animate__slower flex gap-2 items-center justify-center"
      >
        <FontAwesomeIcon
          class="me-2"
          icon="clock"
        />

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
          class="font-medium text-center text-sm"
        >
          {{ currentGamePlayCountdownTitle }}
        </div>

        <VueCountdown
          id="game-playground-footer-countdown-component"
          v-slot="{ minutes, seconds, totalSeconds }"
          class="flex gap-1 items-center justify-center relative text-center w-full"
          :time="currentGamePlayCountdownTimeInMilliseconds"
          @end="onCountdownEnd"
        >
          <GamePlaygroundFooterCountdownEllipseProgress
            id="game-playground-footer-countdown-ellipse-progress"
            class="flex items-center justify-center"
            :remaining-seconds="totalSeconds"
            :total-seconds="currentGamePlayCountdownTimeInSeconds"
          />

          <GamePlaygroundFooterCountdownRemainingTime
            id="game-playground-footer-countdown-remaining-time"
            class="text-center w-1/4"
            :minutes="minutes"
            :seconds="seconds"
          />

          <div class="w-5"/>
        </VueCountdown>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import type { TimedGamePlayAction } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/game-playground-footer-countdown.types";
import GamePlaygroundFooterCountdownEllipseProgress from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownEllipseProgress/GamePlaygroundFooterCountdownEllipseProgress.vue";
import GamePlaygroundFooterCountdownRemainingTime from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundFooter/GamePlaygroundFooterCountdown/GamePlaygroundFooterCountdownRemainingTime/GamePlaygroundFooterCountdownRemainingTime.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const { t } = useI18n();
const { playSoundEffect } = useAudioStore();

const isCountdownOver = ref<boolean>(false);

const currentGamePlayCountdownTimeInSeconds = computed<number>(() => {
  const meetEachOtherCountdownTimeInSeconds = 20;
  const voteCountdownTimeInSeconds = game.value.options.votes.duration;
  const currentGamePlayAction = game.value.currentPlay?.action;
  if (currentGamePlayAction === "meet-each-other") {
    return meetEachOtherCountdownTimeInSeconds;
  }
  if (currentGamePlayAction === "vote" || currentGamePlayAction === "elect-sheriff") {
    return voteCountdownTimeInSeconds;
  }
  return 0;
});

const currentGamePlayCountdownTimeInMilliseconds = computed<number>(() => {
  const millisecondsInSecond = 1000;

  return currentGamePlayCountdownTimeInSeconds.value * millisecondsInSecond;
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