<template>
  <GameEventWithTexts
    id="game-starts-event"
    :texts="gameStartsEventTexts"
  >
    <div class="flex h-full items-center justify-center">
      <GameEventFlippingPlayerCard
        id="game-event-flipping-player-card"
        :players="game.players"
      />
    </div>
  </GameEventWithTexts>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { shuffle, counting } from "radash";
import GameEventFlippingPlayerCard from "~/components/shared/game/game-event/GameEventFlippingPlayersCard/GameEventFlippingPlayerCard/GameEventFlippingPlayerCard.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import { useArrays } from "~/composables/misc/useArrays";
import { useGameStore } from "~/stores/game/useGameStore";

const gameStore = useGameStore();
const { game, gameOptions } = storeToRefs(gameStore);

const { changedGameOptionsTexts } = useGameOptionsTexts(gameOptions);
const { t } = useI18n();
const { insertIf } = useArrays();

const isSheriffElectedOnFirstTick = computed<boolean>(() => {
  const { currentPlay } = game.value;

  return currentPlay?.action === "elect-sheriff";
});

const gameCompositionEventText = computed<string>(() => {
  if (game.value.options.composition.isHidden) {
    return t("components.GameStartsEvent.compositionIsHidden");
  }
  const gameRolesCount = counting(game.value.players, player => player.role.current);
  const shuffledPlayersRolesText = shuffle(Object.entries(gameRolesCount)).reduce((acc, [role, count], currentIndex) => {
    const roleText = t(`shared.role.name.${role}`, count);
    const roleCountText = `${count.toString()} ${roleText}`;

    if (currentIndex === 0) {
      return roleCountText;
    }
    if (currentIndex === Object.values(gameRolesCount).length - 1) {
      return `${acc} ${t("shared.and")} ${roleCountText}.`;
    }
    return `${acc}, ${roleCountText}`;
  }, "");

  return t("components.GameStartsEvent.gameCompositionEvent", { composition: shuffledPlayersRolesText });
});

const gameChangedGameOptionsTexts = computed<string[]>(() => {
  const changedGameOptionsCount = changedGameOptionsTexts.value.length;
  if (changedGameOptionsCount === 0) {
    return [];
  }
  const prefixedChangedGameOptionsTexts = changedGameOptionsTexts.value.map((rule, index) => t("components.GameStartsEvent.specialRule", {
    rule,
    number: index + 1,
  }));

  return [
    t("components.GameStartsEvent.specialGameWithChangedOptions", { count: changedGameOptionsCount }, changedGameOptionsCount),
    ...prefixedChangedGameOptionsTexts,
  ];
});

const gameStartsEventTexts = computed<string[]>(() => [
  t("components.GameStartsEvent.welcomeToTheVillage"),
  gameCompositionEventText.value,
  ...gameChangedGameOptionsTexts.value,
  t("components.GameStartsEvent.looksLifeSomeWerewolvesSneakedIntoTheVillage"),
  t("components.GameStartsEvent.villagersMurderWerewolves"),
  ...insertIf(isSheriffElectedOnFirstTick.value, t("components.GameStartsEvent.letsElectSheriffBefore")),
]);
</script>