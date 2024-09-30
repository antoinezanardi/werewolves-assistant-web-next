<template>
  <div id="game-lobby-group-organizer-disclaimer">
    <Transition
      mode="out-in"
      name="fade"
    >
      <h4
        :key="groupsDisclaimerText"
        class="text-center"
      >
        <FontAwesomeIcon
          id="groups-disclaimer-icon"
          class="me-3"
          :class="groupsDisclaimerIconAndIconClasses.iconClass"
          :icon="groupsDisclaimerIconAndIconClasses.icon"
        />

        <span id="groups-disclaimer">
          {{ groupsDisclaimerText }}
        </span>
      </h4>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { storeToRefs } from "pinia";
import { MIN_PLAYERS_IN_GROUP } from "~/composables/api/game/constants/game.constants";
import type { CreateGamePlayerWithGroupDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import type { IconAndIconClass } from "~/utils/types/icon.types";

const createGameDtoStore = useCreateGameDtoStore();
const { firstGroupName, secondGroupName, createGameDto } = storeToRefs(createGameDtoStore);
const { getPlayersInGroupInCreateGameDto } = createGameDtoStore;

const { isMinimumPlayersReached, arePlayerGroupsSetForPrejudicedManipulatorIfPresent } = useCreateGameDtoValidation(createGameDto);

const { t } = useI18n();

const playersInFirstGroup = computed<CreateGamePlayerWithGroupDto[]>(() => getPlayersInGroupInCreateGameDto(firstGroupName.value));
const playersInSecondGroup = computed<CreateGamePlayerWithGroupDto[]>(() => getPlayersInGroupInCreateGameDto(secondGroupName.value));

const doesFirstGroupHaveEnoughPlayers = computed<boolean>(() => playersInFirstGroup.value.length >= MIN_PLAYERS_IN_GROUP);
const doesSecondGroupHaveEnoughPlayers = computed<boolean>(() => playersInSecondGroup.value.length >= MIN_PLAYERS_IN_GROUP);

const leftToFillFirstGroup = computed<number>(() => MIN_PLAYERS_IN_GROUP - playersInFirstGroup.value.length);
const leftToFillSecondGroup = computed<number>(() => MIN_PLAYERS_IN_GROUP - playersInSecondGroup.value.length);

const groupsDisclaimerText = computed<string>(() => {
  if (!isMinimumPlayersReached.value) {
    return t("components.GameLobbyGroupOrganizerDisclaimer.notEnoughPlayers");
  }
  if (!doesFirstGroupHaveEnoughPlayers.value) {
    return t("components.GameLobbyGroupOrganizerDisclaimer.fillFirstGroup", { count: leftToFillFirstGroup.value });
  }
  if (!doesSecondGroupHaveEnoughPlayers.value) {
    return t("components.GameLobbyGroupOrganizerDisclaimer.fillSecondGroup", { count: leftToFillSecondGroup.value });
  }
  return t("components.GameLobbyGroupOrganizerDisclaimer.allGroupsFilled");
});

const groupsDisclaimerIconAndIconClasses = computed<IconAndIconClass>(() => {
  if (arePlayerGroupsSetForPrejudicedManipulatorIfPresent.value) {
    return {
      icon: "check-circle",
      iconClass: "text-success",
    };
  }
  return {
    icon: "exclamation-circle",
    iconClass: "text-error fa-beat",
  };
});
</script>