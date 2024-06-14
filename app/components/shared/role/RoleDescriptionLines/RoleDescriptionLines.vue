<template>
  <div
    id="role-description-lines"
    class="container-fluid flex flex-col justify-center md:p-4 p-2"
  >
    <p
      v-for="line in roleDescriptionLines"
      :key="line"
      class="role-description-line"
    >
      {{ line }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { RoleDescriptionLinesProps } from "~/components/shared/role/RoleDescriptionLines/role-description-lines.types";
import type { RoleName } from "~/composables/api/role/types/role.types";

const props = defineProps<RoleDescriptionLinesProps>();

const { t, messages, locale } = useI18n();

const roleDescriptionLines = computed<string[]>(() => {
  type SharedMessages = Record<"role", Record<"descriptions", Record<RoleName, Record<string, string>>>>;

  const sharedMessages = messages.value[locale.value].shared as SharedMessages;
  const roleDescriptionMessages = sharedMessages.role.descriptions[props.role.name] as Record<string, string> | undefined;
  if (!roleDescriptionMessages) {
    return [];
  }
  return Object.keys(roleDescriptionMessages).map(key => t(`shared.role.descriptions.${props.role.name}.${key}`));
});
</script>