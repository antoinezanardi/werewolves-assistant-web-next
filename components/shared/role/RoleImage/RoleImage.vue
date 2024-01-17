<template>
  <NuxtImg
    :sizes="sizes"
    :src="roleImageSrc"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";

const props = withDefaults(defineProps<RoleImageProps>(), {
  sizes: "50",
  definition: "normal",
});
const runtimeConfig = useRuntimeConfig();

const roleImageSrc = computed<string>(() => {
  const apiBaseUrl = runtimeConfig.public.werewolvesAssistantApi.baseUrl;
  const imageSuffix = props.definition === "normal" ? "" : `-${props.definition}`;
  return `${apiBaseUrl}/public/assets/images/roles/${props.roleName}/${props.roleName}${imageSuffix}.jpeg`;
});
</script>