<template>
  <NuxtImg
    :alt="alt"
    class="role-image"
    :class="imageClasses"
    :height="sizes"
    placeholder="/svg/misc/infinite-spinner.svg"
    :src="roleImageSrc"
    :width="sizes"
  />
</template>

<script setup lang="ts">
import type { RoleImageProps } from "~/components/shared/role/RoleImage/role-image.types";
import { removeTrailingSlashes } from "~/utils/url.utils";

const props = withDefaults(defineProps<RoleImageProps>(), {
  sizes: "50",
  definition: "normal",
});

const runtimeConfig = useRuntimeConfig();

const backImageSrc = "/img/role/back.jpeg";

const roleImageSrc = computed<string>(() => {
  if (props.roleName === undefined) {
    return backImageSrc;
  }

  const apiBaseUrl = removeTrailingSlashes(runtimeConfig.public.werewolvesAssistantApi.baseUrl);
  const imageSuffix = props.definition === "normal" ? "" : `-${props.definition}`;

  return `${apiBaseUrl}/public/assets/images/roles/${props.roleName}/${props.roleName}${imageSuffix}.jpeg`;
});

const imageClasses = computed<string>(() => `h-[${props.sizes}px] w-[${props.sizes}px]`);
</script>

<style lang="scss" scoped>
.role-image {
  border-radius: 10%;
  border: 3px solid #1c1c1c;
}
</style>