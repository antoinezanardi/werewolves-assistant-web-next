<template>
  <div
    id="game-team-side-player-role-name"
    class="flex gap-1 items-center justify-center"
  >
    <NuxtImg
      v-if="player.role.isRevealed"
      v-p-tooltip="$t('components.GameTeamSidePlayerRoleName.thisPlayerRoleIsRevealed')"
      :alt="$t('components.GameTeamSidePlayerRoleName.thisPlayerRoleIsRevealed')"
      height="20"
      placeholder="/svg/misc/infinite-spinner.svg"
      src="svg/game/player/player-attribute/seen.svg"
      width="20"
    />

    <small
      id="player-role-name"
      class="flex justify-center"
    >
      {{ $t(`shared.role.name.${player.role.current}`) }}
    </small>
  </div>
</template>

<script setup lang="ts">
import type { GameTeamSidePlayerRoleNameProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerRoleName/game-team-side-player-role-name.types";

defineProps<GameTeamSidePlayerRoleNameProps>();
</script>