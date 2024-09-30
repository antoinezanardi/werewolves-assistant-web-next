<template>
  <div id="game-lobby-group-organizer-group-name-input">
    <PrimeVueInplace>
      <template #display>
        <h5
          id="group-name"
          :aria-label="buttonAriaLabel"
        >
          <FontAwesomeIcon
            class="me-2 text-info"
            icon="edit"
          />

          <span>
            {{ trimmedLocalGroupName }}
          </span>
        </h5>
      </template>

      <template #content="{ closeCallback }">
        <PrimeVueInputGroup>
          <PrimeVueInputText
            id="group-name-input"
            v-model="localGroupName"
            :aria-label="$t('components.GameLobbyGroupOrganizerGroupNameInput.groupName')"
            autofocus
            :invalid="isButtonDisabled"
            :maxlength="30"
          />

          <PrimeVueButton
            id="submit-group-name-button"
            :aria-label="$t('components.GameLobbyGroupOrganizerGroupNameInput.submitGroupName')"
            :disabled="isButtonDisabled"
            severity="success"
            @click="setGroupName(closeCallback)"
          >
            <FontAwesomeIcon
              icon="check"
            />
          </PrimeVueButton>
        </PrimeVueInputGroup>
      </template>
    </PrimeVueInplace>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { GameLobbyGroupOrganizerGroupNameInputEmits, GameLobbyGroupOrganizerGroupNameInputProps } from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNameInput/game-lobby-group-organizer-group-name-input.types";

const props = defineProps<GameLobbyGroupOrganizerGroupNameInputProps>();

const emit = defineEmits<GameLobbyGroupOrganizerGroupNameInputEmits>();

const { t } = useI18n();

const { groupName, otherGroupName } = toRefs(props);

const localGroupName = ref<string>(unref(groupName));

const trimmedLocalGroupName = computed<string>(() => localGroupName.value.trim());

const isButtonDisabled = computed<boolean>(() => !trimmedLocalGroupName.value || otherGroupName.value === trimmedLocalGroupName.value);

const buttonAriaLabel = computed<string>(() => t("components.GameLobbyGroupOrganizerGroupNameInput.editGroupName", { name: trimmedLocalGroupName.value }));

function setGroupName(closeCallback: () => void): void {
  localGroupName.value = trimmedLocalGroupName.value;
  emit("updateGroupName", trimmedLocalGroupName.value);
  closeCallback();
}
</script>