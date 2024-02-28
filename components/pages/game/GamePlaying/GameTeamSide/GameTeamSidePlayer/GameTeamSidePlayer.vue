<template>
  <GlowCapture>
    <GlowElement color="red">
      <div
        id="game-team-side-player"
        class="border-2 border-gray-700 p-2 rounded-md w-full"
        :class="teamSidePlayerClasses"
      >
        <div
          id="player-name"
          class="text-center text-truncate"
        >
          {{ player.name }}
        </div>

        <VuePrimeDivider class="!my-1"/>

        <small
          id="player-role-name"
          class="flex justify-center"
        >
          {{ $t(`shared.role.name.${player.role.current}`) }}
        </small>

        <div class="flex mt-1">
          <RoleImage
            v-if="player.side.current === RoleSides.WEREWOLVES"
            id="player-werewolf-role-image"
            :alt="roleImageAlt"
            definition="small"
            height="50"
            :role-name="player.role.current"
            width="50"
          />

          <div
            id="player-attributes"
            class="flex grow"
          />

          <RoleImage
            v-if="player.side.current === RoleSides.VILLAGERS"
            id="player-villager-role-image"
            :alt="roleImageAlt"
            definition="small"
            height="50"
            :role-name="player.role.current"
            width="50"
          />
        </div>
      </div>
    </GlowElement>
  </GlowCapture>
</template>

<script lang="ts" setup>
import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleSides } from "~/composables/api/role/enums/role.enums";

const props = defineProps<GameTeamSidePlayerProps>();

const { t } = useI18n();

const roleImageAlt = computed<string>(() => t("components.GameTeamSidePlayer.roleImageAlt", { playerName: props.player.name }));

const playerSideColor = computed<string>(() => (props.player.side.current === RoleSides.WEREWOLVES ? "red-500" : "green-500"));

const teamSidePlayerClasses = computed<string>(() => `glow:border-${playerSideColor.value}`);
</script>