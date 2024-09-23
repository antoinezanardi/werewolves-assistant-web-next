<template>
  <div id="game-lobby-group-organizer-group-name-input">
    <PrimeVueInplace>
      <template #display>
        <h5 id="group-name">
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
            v-model="localGroupName"
            autofocus
            :invalid="isButtonDisabled"
            :maxlength="30"
          />

          <PrimeVueButton
            id="submit-group-name-button"
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

const { groupName, otherGroupName } = toRefs(props);

const localGroupName = ref<string>(groupName);

const trimmedLocalGroupName = computed<string>(() => localGroupName.value.trim());

const isButtonDisabled = computed<boolean>(() => !localGroupName.value || otherGroupName.value === trimmedLocalGroupName.value);

function setGroupName(closeCallback: () => void): void {
  localGroupName.value = trimmedLocalGroupName.value;
  emit("updateGroupName", trimmedLocalGroupName.value);
  closeCallback();
}
</script>