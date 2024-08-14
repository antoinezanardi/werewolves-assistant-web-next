<template>
  <div id="recipient-role-additional-cards-disclaimer">
    <Transition
      mode="out-in"
      name="fade"
    >
      <h4
        :key="recipientRoleAdditionalCardsDisclaimerAndIcon.disclaimer"
        class="mb-8 text-center"
      >
        <FontAwesomeIcon
          id="recipient-role-additional-cards-disclaimer-icon"
          class="me-3"
          :class="recipientRoleAdditionalCardsDisclaimerAndIcon.iconClass"
          :icon="recipientRoleAdditionalCardsDisclaimerAndIcon.icon"
        />

        <span id="recipient-role-additional-cards-disclaimer">
          {{ recipientRoleAdditionalCardsDisclaimerAndIcon.disclaimer }}
        </span>
      </h4>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import type { RecipientRoleAdditionalCardsDisclaimerProps } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsDisclaimer/recipient-role-additional-cards-disclaimer.types";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { useStrings } from "~/composables/misc/useStrings";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import type { IconAndIconClass } from "~/utils/types/icon.types";

const props = defineProps<RecipientRoleAdditionalCardsDisclaimerProps>();

const createGameDtoStore = useCreateGameDtoStore();
const { getAdditionalCardsForRecipientInCreateGameDto } = createGameDtoStore;
const { createGameDto } = storeToRefs(createGameDtoStore);

const { areAdditionalCardsSetForThiefIfPresent, areAdditionalCardsSetForActorIfPresent } = useCreateGameDtoValidation(createGameDto);

const { getDefiniteRoleNameLabel } = useRoleName();

const { lowerCaseFirstLetter } = useStrings();

const { t } = useI18n();

const areAdditionalCardsSetForRecipientRoleName = computed<boolean>(() => {
  if (props.recipientRoleName === "thief") {
    return areAdditionalCardsSetForThiefIfPresent.value;
  }
  return areAdditionalCardsSetForActorIfPresent.value;
});

const recipientRoleAdditionalCardsDisclaimerAndIcon = computed<{ disclaimer: string } & IconAndIconClass>(() => {
  const definiteRecipientRoleName = getDefiniteRoleNameLabel(props.recipientRoleName, 1);
  const lowerCaseRecipientRoleName = lowerCaseFirstLetter(definiteRecipientRoleName);
  const recipientAdditionalCardsCount = getAdditionalCardsForRecipientInCreateGameDto(props.recipientRoleName).length;
  const componentRootTKey = "components.RecipientRoleAdditionalCardsDisclaimer";
  if (areAdditionalCardsSetForRecipientRoleName.value) {
    return {
      disclaimer: t(`${componentRootTKey}.additionalCardsSetDisclaimer`, { definiteRecipientRoleName, count: recipientAdditionalCardsCount }, recipientAdditionalCardsCount),
      icon: "check-circle",
      iconClass: "text-success",
    };
  }
  return {
    disclaimer: t(`${componentRootTKey}.additionalCardsNotSetDisclaimer`, { definiteRecipientRoleName: lowerCaseRecipientRoleName }),
    icon: "exclamation-circle",
    iconClass: "text-error fa-beat",
  };
});
</script>