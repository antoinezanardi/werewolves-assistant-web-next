<template>
  <div class="d-flex">
    <div
      id="role-left-description"
      class="align-items-center d-flex flex-column justify-content-center"
    >
      <RoleImage
        :role-name="role.name"
        sizes="150px"
      />

      <div class="mt-3">
        {{ getRoleNameLabel(role.name) }}
      </div>

      <RoleTypeBadge
        class="mt-3"
        :role-type="role.type"
      />

      <RoleOriginBadge
        class="mt-3"
        :role-origin="role.origin"
      />
    </div>

    <div
      id="role-right-description"
      class="d-flex flex-column justify-content-center"
    >
      <p
        v-for="line in roleDescriptionLines"
        :key="line"
      >
        {{ line }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AboutAvailableRoleDescriptionProps } from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/about-available-role-description.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import RoleOriginBadge from "~/components/shared/role/RoleOriginBadge/RoleOriginBadge.vue";
import RoleTypeBadge from "~/components/shared/role/RoleTypeBadge/RoleTypeBadge.vue";
import type { RoleNames } from "~/composables/api/role/enums/role.enums";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = defineProps<AboutAvailableRoleDescriptionProps>();

const { t, messages, locale } = useI18n();

const roleDescriptionLines = computed<string[]>(() => {
  type ComponentsMessages = Record<"AboutAvailableRoleDescription", Record<"descriptions", Record<RoleNames, Record<string, string>>>>;

  const componentsMessages = messages.value[locale.value].components as ComponentsMessages;
  const roleDescriptionMessages = componentsMessages.AboutAvailableRoleDescription.descriptions[props.role.name] as Record<string, string> | undefined;
  if (!roleDescriptionMessages) {
    return [];
  }
  return Object.keys(roleDescriptionMessages).map(key => t(`components.AboutAvailableRoleDescription.descriptions.${props.role.name}.${key}`));
});

const { getRoleNameLabel } = useRoleName();
</script>

<style lang="scss">
#role-left-description {
  min-width: 200px;
}
</style>