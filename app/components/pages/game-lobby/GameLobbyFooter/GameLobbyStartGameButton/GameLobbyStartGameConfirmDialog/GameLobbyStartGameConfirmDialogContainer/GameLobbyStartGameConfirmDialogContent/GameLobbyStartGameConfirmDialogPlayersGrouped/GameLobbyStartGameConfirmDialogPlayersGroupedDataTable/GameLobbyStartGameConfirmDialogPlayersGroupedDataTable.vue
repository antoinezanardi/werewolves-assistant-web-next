<template>
  <div id="game-lobby-start-game-confirm-dialog-players-grouped-datatable-container">
    <PrimeVueDataTable
      id="game-lobby-start-game-confirm-dialog-players-grouped-datatable"
      :always-show-paginator="false"
      paginator
      :rows="5"
      size="small"
      striped-rows
      :value="dataTableValues"
    >
      <PrimeVueColumn
        field="firstGroup"
        :pt="{ 'root': '!w-1/2' }"
      >
        <template #header>
          <div class="flex gap-2 items-center">
            <NuxtImg
              id="first-group-header-icon"
              :alt="$t(`components.GameLobbyStartGameConfirmDialogPlayersGroupedDataTable.firstGroup`)"
              :height="svgSize"
              placeholder="/svg/misc/ripples.svg"
              :placeholder-class="`w-[${svgSize}] h-[${svgSize}]`"
              src="/svg/game/player/player-group/group-1.svg"
              :width="svgSize"
            />

            <div
              id="first-group-header-name"
              class="font-bold"
            >
              {{ firstGroupName }}
            </div>
          </div>
        </template>

        <template #body="{ data }">
          <div
            v-if="data.firstGroup"
            class="first-group-cell flex gap-2 items-center"
          >
            <RoleImage
              class="first-group-player-role-image"
              :role-name="data.firstGroup.role.name"
              :sizes="roleImageSizes"
            />

            <div class="first-group-player-name">
              {{ data.firstGroup.name }}
            </div>
          </div>
        </template>
      </PrimeVueColumn>

      <PrimeVueColumn
        field="secondGroup"
        :pt="{ 'root': '!w-1/2' }"
      >
        <template #header>
          <div class="flex gap-2 items-center justify-center">
            <NuxtImg
              id="second-group-header-icon"
              :alt="$t(`components.GameLobbyStartGameConfirmDialogPlayersGroupedDataTable.secondGroup`)"
              :height="svgSize"
              placeholder="/svg/misc/ripples.svg"
              :placeholder-class="`w-[${svgSize}] h-[${svgSize}]`"
              src="/svg/game/player/player-group/group-2.svg"
              :width="svgSize"
            />

            <div
              id="second-group-header-name"
              class="font-bold"
            >
              {{ secondGroupName }}
            </div>
          </div>
        </template>

        <template #body="{ data }">
          <div
            v-if="data.secondGroup"
            class="flex gap-2 items-center second-group-cell"
          >
            <RoleImage
              class="second-group-player-role-image"
              :role-name="data.secondGroup.role.name"
              :sizes="roleImageSizes"
            />

            <div class="second-group-player-name">
              {{ data.secondGroup.name }}
            </div>
          </div>
        </template>
      </PrimeVueColumn>
    </PrimeVueDataTable>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import type { PlayerGroupsDataTableValue } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersGrouped/GameLobbyStartGameConfirmDialogPlayersGroupedDataTable/game-lobby-start-game-confirm-dialog-players-grouped-data-table.types";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const svgSize = 30;
const roleImageSizes = "30";

const createGameDtoStore = useCreateGameDtoStore();
const { createGameDto, firstGroupName, secondGroupName } = storeToRefs(createGameDtoStore);

const dataTableValues = computed<PlayerGroupsDataTableValue[]>(() => {
  const values: PlayerGroupsDataTableValue[] = [];
  const playersOnFirstGroup = createGameDto.value.players.filter(({ group }) => group === firstGroupName.value);
  const playersOnSecondGroup = createGameDto.value.players.filter(({ group }) => group === secondGroupName.value);
  const groupMaxLength = Math.max(playersOnFirstGroup.length, playersOnSecondGroup.length);
  for (let i = 0; i < groupMaxLength; i++) {
    const playerOnFirstGroup = playersOnFirstGroup[i];
    const playerOnSecondGroup = playersOnSecondGroup[i];
    values.push({
      firstGroup: playerOnFirstGroup,
      secondGroup: playerOnSecondGroup,
    });
  }
  return values;
});
</script>