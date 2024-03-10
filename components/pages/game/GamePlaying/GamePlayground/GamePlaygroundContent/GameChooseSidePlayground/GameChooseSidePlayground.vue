<template>
  <div
    id="game-choose-side-playground"
    class="flex flex-col items-center justify-center"
  >
    <div>
      <GlowCapture class="flex">
        <GlowElement>
          <button
            class="me-12"
            type="button"
          >
            <RoleImage
              class="glow:border-green-400"
              definition="normal"
              :role-name="RoleNames.VILLAGER"
              sizes="200"
            />

            <span class="font-semibold">
              {{ $t("components.GameChooseSidePlayground.villagersSide") }}
            </span>
          </button>
        </GlowElement>

        <GlowElement>
          <button
            type="button"
          >
            <RoleImage
              class="glow:border-red-400"
              definition="normal"
              :role-name="RoleNames.WEREWOLF"
              sizes="200"
            />

            <span class="font-semibold">
              {{ $t("components.GameChooseSidePlayground.werewolvesSide") }}
            </span>
          </button>
        </GlowElement>
      </glowcapture>
    </div>
  </div>
</template>

<script setup lang="ts">
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
</script>