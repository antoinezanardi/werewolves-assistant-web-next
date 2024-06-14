<template>
  <div id="overflow-tag-container">
    <VuePrimeTag
      v-if="areEntitiesTruncated"
      id="overflow-tag"
      class="min-w-12"
      severity="info"
      :value="truncatedEntitiesCountText"
    />
  </div>
</template>

<script setup lang="ts">
import type { OverflowTagProps } from "~/components/shared/misc/OverflowTag/overflow-tag.types";

const props = defineProps<OverflowTagProps>();

const areEntitiesTruncated = computed<boolean>(() => props.entitiesCount > props.maximumEntitiesDisplayed);

const truncatedEntitiesCount = computed<number>(() => props.entitiesCount - props.maximumEntitiesDisplayed);

const truncatedEntitiesCountText = computed<string>(() => `+ ${truncatedEntitiesCount.value}`);
</script>