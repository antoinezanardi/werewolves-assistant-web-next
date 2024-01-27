<template>
  <div class="d-flex">
    <div
      id="role-left-description"
      class="align-items-center d-flex flex-column justify-content-center"
    >
      <RoleImage
        class="available-role-description-role-image"
        :role-name="role.name"
        sizes="150px"
      />

      <h2 class="available-role-description-role-name mt-3">
        {{ getRoleNameLabel(role.name) }}
      </h2>

      <RoleTypeBadge
        class="available-role-description-role-type-badge  mt-3"
        :role-type="role.type"
      />

      <RoleOriginBadge
        class="available-role-description-role-origin-badge mt-3"
        :role-origin="role.origin"
      />
    </div>

    <div
      id="role-right-description"
      class="container-fluid d-flex flex-column justify-content-center"
    >
      <p
        v-for="line in roleDescriptionLines"
        :key="line"
        class="available-role-description-role-description-line"
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