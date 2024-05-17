<template>
  <VuePrimeFieldset
    id="game-lobby-options-hub-roles-tab-bear-tamer"
    :pt="{ 'legend': 'ml-4 !p-3 !px-6' }"
  >
    <template #legend>
      <GameOptionRoleLegend role-name="bear-tamer"/>
    </template>
  </VuePrimeFieldset>
</template>

<script setup lang="ts">
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";
</script>