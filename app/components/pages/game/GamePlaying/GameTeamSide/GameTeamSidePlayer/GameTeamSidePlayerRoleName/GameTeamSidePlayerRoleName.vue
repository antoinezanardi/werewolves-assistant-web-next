<template>
  <div
    id="game-team-side-player-role-name"
    class="flex flex-col items-center justify-center"
  >
    <div
      id="player-role-icons"
      class="flex gap-2"
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

      <NuxtImg
        v-if="isPlayerOriginalRoleThiefButNotCurrently"
        v-p-tooltip="$t('components.GameTeamSidePlayerRoleName.thisPlayerWasThief')"
        :alt="$t('components.GameTeamSidePlayerRoleName.thisPlayerWasThief')"
        height="20"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="svg/role/thief.svg"
        width="20"
      />

      <NuxtImg
        v-if="isPlayerOriginalRoleActorButNotCurrently"
        v-p-tooltip="$t('components.GameTeamSidePlayerRoleName.thisPlayerWasActor')"
        :alt="$t('components.GameTeamSidePlayerRoleName.thisPlayerWasActor')"
        height="20"
        placeholder="/svg/misc/infinite-spinner.svg"
        src="svg/role/actor.svg"
        width="20"
      />
    </div>

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

const props = defineProps<GameTeamSidePlayerRoleNameProps>();

const isPlayerOriginalRoleThiefButNotCurrently = computed<boolean>(() => props.player.role.original === "thief" && props.player.role.current !== "thief");

const isPlayerOriginalRoleActorButNotCurrently = computed<boolean>(() => props.player.role.original === "actor" && props.player.role.current !== "actor");
</script>