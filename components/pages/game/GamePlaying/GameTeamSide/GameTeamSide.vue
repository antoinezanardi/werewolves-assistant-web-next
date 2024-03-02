<template>
  <div
    id="game-playground-team-side"
    class="flex flex-col h-full"
  >
    <div class="flex items-center justify-evenly">
      <NuxtImg
        :alt="$t(`components.GameTeamSide.sideAltText.${props.side}`)"
        height="50"
        :src="sideSvgIconPath"
        width="50"
      />

      <div>
        <h2
          id="side-title"
          class="my-1 text-center"
        >
          {{ $t(`shared.role.side.${side}`) }}
        </h2>

        <h4
          id="alive-team-players"
          class="my-1 text-center"
        >
          {{ alivePlayersText }}
        </h4>
      </div>

      <div/>
    </div>

    <VuePrimeDivider/>

    <div
      id="team-players"
      class="flex flex-col grow overflow-y-auto"
    >
      <GameTeamSidePlayer
        v-for="player in aliveFirstTeamPlayers"
        :key="player._id"
        class="my-1"
        :player="player"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import type { GameTeamSideProps } from "~/components/pages/game/GamePlaying/GameTeamSide/game-team-side.types";
import GameTeamSidePlayer from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayer.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { RoleSides } from "~/composables/api/role/enums/role.enums";
import { useGameStore } from "~/stores/game/useGameStore";

const props = defineProps<GameTeamSideProps>();

const { t } = useI18n();

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);

const teamPlayers = computed<Player[]>(() => game.value.players.filter(player => player.side.current === props.side));

const aliveFirstTeamPlayers = computed<Player[]>(() => teamPlayers.value.toSorted((playerA, playerB) => {
  if (playerA.isAlive && !playerB.isAlive) {
    return -1;
  }
  return 1;
}));

const alivePlayersText = computed<string>(() => {
  const alivePlayers = teamPlayers.value.filter(player => player.isAlive);

  return t(`components.GameTeamSide.aliveTeamPlayers`, {
    alivePlayers: alivePlayers.length,
    totalPlayers: teamPlayers.value.length,
  });
});

const sideSvgIconPath = computed<string>(() => {
  if (props.side === RoleSides.VILLAGERS) {
    return "/svg/role/villager.svg";
  }
  return "/svg/role/werewolf.svg";
});
</script>