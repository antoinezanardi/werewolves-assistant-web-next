<template>
  <VueFlip
    id="role-flipping-image"
    class="flex-none"
    :height="sizes"
    :model-value="isFlipped"
    :width="sizes"
  >
    <template #front>
      <RoleImage
        id="front-role-image"
        :alt="alt"
        :class="imageClasses"
        :definition="definition"
        :role-name="frontRoleName"
        :sizes="sizes"
      />

      <RoleFlippingImageSvgIcon
        v-if="svgIconPath"
        id="front-role-image-svg-icon"
        :svg-icon-path="svgIconPath"
      />
    </template>

    <template #back>
      <RoleImage
        id="back-role-image"
        :alt="alt"
        :class="imageClasses"
        :definition="definition"
        :role-name="backRoleName"
        :sizes="sizes"
      />

      <RoleFlippingImageSvgIcon
        v-if="svgIconPath"
        id="back-role-image-svg-icon"
        :svg-icon-path="svgIconPath"
      />
    </template>
  </VueFlip>
</template>

<script setup lang="ts">
import type { RoleFlippingImageProps } from "~/components/shared/role/RoleImage/RoleFlippingImage/role-flipping-image.types";
import RoleFlippingImageSvgIcon from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImageSvgIcon/RoleFlippingImageSvgIcon.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { RoleName } from "~/composables/api/role/types/role.types";

const props = withDefaults(defineProps<RoleFlippingImageProps>(), {
  sizes: "50px",
  definition: "normal",
});

const isFlipped = ref<boolean>(false);
const frontRoleName = ref<RoleName | undefined>();
const backRoleName = ref<RoleName | undefined>();

onMounted(() => {
  frontRoleName.value = props.roleName;
});

watch(() => props.roleName, roleName => {
  if (isFlipped.value) {
    frontRoleName.value = roleName;
    isFlipped.value = false;

    return;
  }
  backRoleName.value = roleName;
  isFlipped.value = true;
});
</script>