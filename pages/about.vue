<template>
  <div>
    <RoleImage
      definition="small"
      :role-name="RoleNames.WEREWOLF"
      sizes="50"
    />
  </div>
</template>

<script setup lang="ts">
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
</script>