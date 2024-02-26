<template>
  <div id="game-team-side-player">
    <div
      id="player-name"
      class="text-center text-truncate"
    >
      {{ player.name }}
    </div>

    <hr class="my-1">

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
</template>

<script lang="ts" setup>
import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleSides } from "~/composables/api/role/enums/role.enums";

const props = defineProps<GameTeamSidePlayerProps>();

const { t } = useI18n();

const roleImageAlt = computed<string>(() => t("components.GameTeamSidePlayer.roleImageAlt", { playerName: props.player.name }));
</script>

<style lang="scss" scoped>
#game-team-side-player {
  border: 1px solid #4d4d4d;
  border-radius: 10px;
  padding: 5px;
  width: 100%;
}
</style>