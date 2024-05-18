<template>
  <div
    id="game-option-role-legend"
    class="flex gap-4 items-center"
  >
    <RoleImage
      id="game-option-role-legend-image"
      class="!border-0"
      :role-name="roleName"
    />

    <h2 id="game-option-role-legend-title">
      {{ title }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import type { GameOptionRoleLegendProps } from "~/components/shared/game/game-options/GameOptionRoleLegend/game-option-role-legend.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const props = defineProps<GameOptionRoleLegendProps>();

const { t } = useI18n();

const title = computed<string>(() => t(`shared.role.name.${props.roleName}`));
</script>