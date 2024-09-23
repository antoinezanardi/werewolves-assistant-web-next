<template>
  <div id="game-lobby-group-organizer-pick-list">
    <PrimeVuePickList
      breakpoint="1400px"
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
        <div class="flex gap-3 items-center">
          <RoleImage
            :role-name="option.role.name"
            :sizes="roleImageSizes"
          />

          <span>
            {{ option.name }}
          </span>
        </div>
      </template>
    </PrimeVuePickList>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { PickListMoveToTargetEvent } from "primevue/picklist";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

const breakpoints = useBreakpoints(breakpointsTailwind);
const isSmallerThanMd = breakpoints.smaller(BreakpointTypes.MD);

const createGameDtoStore = useCreateGameDtoStore();
const { firstGroupName, secondGroupName, createGameDto } = storeToRefs(createGameDtoStore);
const { updatePlayerInCreateGameDto } = createGameDtoStore;

const roleImageSizes = computed<string>(() => (isSmallerThanMd.value ? "25px" : "35px"));

const playersInPickList = computed<CreateGamePlayerDto[][]>(() => {
  const playersOnFirstGroup = createGameDto.value.players.filter(({ group }) => group === firstGroupName.value);
  const playersOnSecondGroup = createGameDto.value.players.filter(({ group }) => group === secondGroupName.value);

  return [playersOnFirstGroup, playersOnSecondGroup];
});

function onMoveToTargetFromPickList({ items }: PickListMoveToTargetEvent): void {
  const players = items as CreateGamePlayerDto[];
  for (const player of players) {
    const playerWithNewGroup = CreateGamePlayerDto.create({ ...player, group: secondGroupName.value });
    updatePlayerInCreateGameDto(playerWithNewGroup);
  }
}

function onMoveToSourceFromPickList({ items }: PickListMoveToTargetEvent): void {
  const players = items as CreateGamePlayerDto[];
  for (const player of players) {
    const playerWithNewGroup = CreateGamePlayerDto.create({ ...player, group: firstGroupName.value });
    updatePlayerInCreateGameDto(playerWithNewGroup);
  }
}
</script>