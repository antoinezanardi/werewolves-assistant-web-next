<template>
  <NuxtImg
    :aria-label="getRoleNameLabel(roleName)"
    :height="sizes"
    :src="roleImageSrc"
    :width="sizes"
  />
</template>

<script setup lang="ts">
import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";
import { useRoleName } from "~/composables/api/role/useRoleName";

const props = withDefaults(defineProps<RoleImageProps>(), {
  sizes: "500",
  definition: "normal",
});

const { getRoleNameLabel } = useRoleName();

const runtimeConfig = useRuntimeConfig();

const roleImageSrc = computed<string>(() => {
  const apiBaseUrl = runtimeConfig.public.werewolvesAssistantApi.baseUrl;
  const imageSuffix = props.definition === "normal" ? "" : `-${props.definition}`;
  return `${apiBaseUrl}/public/assets/images/roles/${props.roleName}/${props.roleName}${imageSuffix}.jpeg`;
});
</script>