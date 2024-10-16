<template>
  <div id="game-lobby-group-organizer-pick-list-container">
    <PrimeVuePickList
      id="game-lobby-group-organizer-pick-list"
      breakpoint="300px"
      class="h-full"
      data-key="name"
      :model-value="playersInPickList"
      :move-all-to-source-props="{ 'class': '!hidden' }"
      :move-all-to-target-props="{ 'class': '!hidden' }"
      :pt="{
        'sourceControls': '!hidden',
        'targetControls': '!hidden'
      }"
      scroll-height="100%"
      striped
      @move-to-source="onMoveToSourceFromPickList"
      @move-to-target="onMoveToTargetFromPickList"
    >
      <template #option="{ option }">
        <div
          :aria-label="getAriaLabelForPickListOption(option.name)"
          class="flex gap-3 items-center"
        >
          <RoleImage
            class="option-role-image"
            :role-name="option.role.name"
            :sizes="roleImageSizes"
          />

          <span class="option-name">
            {{ option.name }}
          </span>
        </div>
      </template>
    </PrimeVuePickList>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { PickListMoveToTargetEvent } from "primevue/picklist";

import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const { isSmallerThanMdBreakpoint } = useAppBreakpoints();

const { t } = useI18n();

const createGameDtoStore = useCreateGameDtoStore();
const { firstGroupName, secondGroupName, createGameDto } = storeToRefs(createGameDtoStore);
const { updatePlayerInCreateGameDto } = createGameDtoStore;

const roleImageSizes = computed<string>(() => (isSmallerThanMdBreakpoint.value ? "25px" : "35px"));

const playersInPickList = computed<CreateGamePlayerDto[][]>(() => {
  const playersOnFirstGroup = createGameDto.value.players.filter(({ group }) => group === firstGroupName.value);
  const playersOnSecondGroup = createGameDto.value.players.filter(({ group }) => group === secondGroupName.value);

  return [playersOnFirstGroup, playersOnSecondGroup];
});

function movePlayersToOtherGroup(players: CreateGamePlayerDto[], otherGroup: string): void {
  for (const player of players) {
    const playerWithNewGroup = CreateGamePlayerDto.create({ ...player, group: otherGroup });
    updatePlayerInCreateGameDto(playerWithNewGroup);
  }
}

function onMoveToTargetFromPickList({ items }: PickListMoveToTargetEvent): void {
  movePlayersToOtherGroup(items as CreateGamePlayerDto[], secondGroupName.value);
}

function onMoveToSourceFromPickList({ items }: PickListMoveToTargetEvent): void {
  movePlayersToOtherGroup(items as CreateGamePlayerDto[], firstGroupName.value);
}

function getAriaLabelForPickListOption(name: string): string {
  return t("components.GameLobbyGroupOrganizerPickList.pickPlayer", { name });
}
</script>