<template>
  <GlowElement
    id="game-choose-card-playground-additional-card"
  >
    <button
      id="additional-card-button"
      :aria-label="additionalCardButtonAriaLabel"
      :class="additionalCardButtonClasses"
      type="button"
      @click.prevent="onClickFromAdditionalCardButton"
    >
      <RoleImage
        id="additional-card-image"
        :class="additionalCardsRoleImageClasses"
        definition="normal"
        :role-name="additionalCard.roleName"
        sizes="125"
      />

      <span
        id="additional-card-role-label"
        class="flex flex-col font-semibold grow justify-center"
      >
        {{ additionalCardRoleNameLabel }}
      </span>
    </button>
  </GlowElement>
</template>

<script setup lang="ts">
import type { GameChooseCardPlaygroundAdditionalCardEmits, GameChooseCardPlaygroundAdditionalCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlaygroundAdditionalCard/game-choose-card-playground-additional-card.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useStrings } from "~/composables/misc/useStrings";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useRolesStore } from "~/stores/role/useRolesStore";

const props = defineProps<GameChooseCardPlaygroundAdditionalCardProps>();

const emit = defineEmits<GameChooseCardPlaygroundAdditionalCardEmits>();

const { makeGamePlayDto } = useMakeGamePlayDtoStore();

const rolesStore = useRolesStore();
const { getRoleSideForRoleName } = rolesStore;

const { getRoleNameLabel, getDefiniteRoleNameLabel } = useRoleName();

const { t } = useI18n();

const { lowerCaseFirstLetter } = useStrings();

const additionalCardRoleNameLabel = computed<string>(() => getRoleNameLabel(props.additionalCard.roleName));

const additionalCardButtonAriaLabel = computed<string>(() => {
  const lowerRecipientDefiniteRoleNameLabel = lowerCaseFirstLetter(getDefiniteRoleNameLabel(props.additionalCard.recipient, 1));

  return t("components.GameChooseCardPlaygroundAdditionalCard.chooseCardForRecipient", {
    roleName: additionalCardRoleNameLabel.value,
    recipientDefiniteName: lowerRecipientDefiniteRoleNameLabel,
  });
});

const additionalCardColor = computed<string>(() => {
  const roleSide = getRoleSideForRoleName(props.additionalCard.roleName);

  return roleSide === "villagers" ? "emerald" : "red";
});

const isAdditionalCardChosen = computed<boolean>(() => makeGamePlayDto.chosenCardId === props.additionalCard._id);

const additionalCardButtonClasses = computed<string>(() => {
  const baseClasses = `border-4 border-transparent flex flex-col glow:border-${additionalCardColor.value}-500 h-52 items-center me-2 p-3 rounded-lg`;
  if (isAdditionalCardChosen.value) {
    return `${baseClasses} !border-${additionalCardColor.value}-500`;
  }
  return baseClasses;
});

const additionalCardsRoleImageClasses = computed<string>(() => {
  const baseClasses = `glow:border-${additionalCardColor.value}-500 mb-1`;
  if (isAdditionalCardChosen.value) {
    return `${baseClasses} !border-${additionalCardColor.value}-500`;
  }
  return baseClasses;
});

function onClickFromAdditionalCardButton(): void {
  emit("clickAdditionalCard", props.additionalCard);
}
</script>