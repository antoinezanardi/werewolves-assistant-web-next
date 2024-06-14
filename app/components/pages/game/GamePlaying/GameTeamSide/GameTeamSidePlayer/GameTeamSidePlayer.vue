<template>
  <GlowCapture>
    <GlowElement>
      <div
        id="game-team-side-player"
        class="border-2 border-gray-700 p-2 rounded-md w-full"
        :class="playerSideGlowClass"
        :data-testid="`game-team-side-player-${player.name}`"
      >
        <div class="flex justify-center">
          <NuxtImg
            v-if="!player.isAlive"
            v-p-tooltip="$t('components.GameTeamSidePlayer.thisPlayerIsDead')"
            :alt="$t('components.GameTeamSidePlayer.thisPlayerIsDead')"
            class="me-2"
            height="20"
            src="/svg/game/player/dead.svg"
            width="20"
          />

          <div
            id="player-name"
            class="text-center truncate"
            :class="{ 'line-through decoration-1': !player.isAlive }"
          >
            {{ player.name }}
          </div>
        </div>

        <VuePrimeDivider class="!my-1"/>

        <small
          id="player-role-name"
          class="flex justify-center"
        >
          {{ $t(`shared.role.name.${player.role.current}`) }}
        </small>

        <div class="flex items-center mt-2">
          <RoleImage
            v-if="player.side.current === 'werewolves'"
            id="player-werewolf-role-image"
            :alt="roleImageAlt"
            class="!border-2"
            :class="roleImageClasses"
            definition="small"
            :role-name="player.role.current"
            sizes="50"
          />

          <div
            id="player-attributes"
            class="grid grid-cols-3 grow mx-2"
          >
            <GameTeamSidePlayerAttribute
              v-for="attribute in player.attributes"
              :key="attribute.name"
              :attribute="attribute"
              class="p-1"
              :player="player"
            />
          </div>

          <RoleImage
            v-if="player.side.current === 'villagers'"
            id="player-villager-role-image"
            :alt="roleImageAlt"
            class="!border-2"
            :class="roleImageClasses"
            definition="small"
            :role-name="player.role.current"
          />
        </div>
      </div>
    </GlowElement>
  </GlowCapture>
</template>

<script lang="ts" setup>
import type { GameTeamSidePlayerProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/game-team-side-player.types";
import GameTeamSidePlayerAttribute from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/GameTeamSidePlayerAttribute.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = defineProps<GameTeamSidePlayerProps>();

const { t } = useI18n();

const roleImageAlt = computed<string>(() => t("components.GameTeamSidePlayer.roleImageAlt", { playerName: props.player.name }));

const playerSideGlowClass = computed<string>(() => {
  const { player } = props;
  if (!player.isAlive) {
    return "";
  }
  return player.side.current === "werewolves" ? "glow:border-red-500" : "glow:border-green-500";
});

const roleImageClasses = computed<string>(() => {
  const { player } = props;
  let classes = playerSideGlowClass.value;
  if (!player.isAlive) {
    classes += " grayscale";
  }
  return classes;
});
</script>