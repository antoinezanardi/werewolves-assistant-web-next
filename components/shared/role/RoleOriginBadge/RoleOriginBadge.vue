<template>
  <VuePrimeBadge
    v-p-tooltip="$t('components.RoleOriginBadge.roleOrigin')"
    :aria-label="$t('components.RoleOriginBadge.roleOrigin')"
    class="role-origin-badge"
    :value="$t(`components.RoleOriginBadge.${roleOrigin}`)"
  />
</template>

<script setup lang="ts">
import type { RoleOriginBadgeProps } from "~/components/shared/role/RoleOriginBadge/role-origin-badge.types";

defineProps<RoleOriginBadgeProps>();
</script>

<style lang="scss" scoped>
  .role-origin-badge {
    cursor: help;
  }
</style>