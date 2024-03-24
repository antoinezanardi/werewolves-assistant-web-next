<template>
  <VueFlip
    v-model="isFlipped"
    class="flex-none"
    :height="sizes"
    :width="sizes"
  >
    <template #front>
      <RoleImage
        :alt="alt"
        :class="imageClasses"
        :definition="definition"
        :role-name="frontRoleName"
        :sizes="sizes"
      />
    </template>

    <template #back>
      <RoleImage
        :alt="alt"
        :class="imageClasses"
        :definition="definition"
        :role-name="backRoleName"
        :sizes="sizes"
      />
    </template>
  </VueFlip>
</template>

<script setup lang="ts">
import type { RoleFlippingImageProps } from "~/components/shared/role/RoleImage/RoleFlippingImage/role-flipping-image.types";
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