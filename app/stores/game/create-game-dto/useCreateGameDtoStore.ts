import { defineStore } from "pinia";
import { ref } from "vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";

import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { useRolesStore } from "~/stores/role/useRolesStore";

const useCreateGameDtoStore = defineStore(StoreIds.CREATE_GAME_DTO, () => {
  const rolesStore = useRolesStore();
  const { getRoleWithNameInRoles } = rolesStore;

  const defaultCreateGameDto = CreateGameDto.create({
    players: [],
    options: DEFAULT_GAME_OPTIONS,
  });

  const createGameDto = ref<CreateGameDto>(CreateGameDto.create(defaultCreateGameDto));

  const doesCreateGameDtoContainPositionDependantRoles = computed<boolean>(() => {
    const positionDependantRoles: RoleName[] = ["rusty-sword-knight", "bear-tamer", "fox"];
    const playersWithPositionDependantRoles = getPlayersWithAnyRoleNameInCreateGameDto(positionDependantRoles);

    return playersWithPositionDependantRoles.length > 0;
  });

  function setCreateGameDto(createGameDtoValue: CreateGameDto): void {
    createGameDto.value = CreateGameDto.create(createGameDtoValue);
  }

  function resetCreateGameDto(): void {
    createGameDto.value = CreateGameDto.create(defaultCreateGameDto);
  }

  function addPlayerToCreateGameDto(player: CreateGamePlayerDto): void {
    createGameDto.value.players.push(CreateGamePlayerDto.create(player));
  }

  function updatePlayerInCreateGameDto(player: CreateGamePlayerDto): void {
    const playerIndex = createGameDto.value.players.findIndex(({ name }) => name === player.name);
    if (playerIndex !== -1) {
      createGameDto.value.players.splice(playerIndex, 1, CreateGamePlayerDto.create(player));
    }
  }

  function setPlayersToCreateGameDto(players: CreateGamePlayerDto[]): void {
    createGameDto.value.players = players.map(player => CreateGamePlayerDto.create(player));
  }

  function removePlayerFromCreateGameDto(playerName: string): void {
    const playerIndex = createGameDto.value.players.findIndex(player => player.name === playerName);
    if (playerIndex !== -1) {
      createGameDto.value.players = createGameDto.value.players.toSpliced(playerIndex, 1);
    }
  }

  function getPlayersWithRoleNameInCreateGameDto(roleName: RoleName): CreateGamePlayerDto[] {
    return createGameDto.value.players.filter(player => player.role.name === roleName);
  }

  function getPlayersWithAnyRoleNameInCreateGameDto(roleNames: RoleName[]): CreateGamePlayerDto[] {
    return createGameDto.value.players.filter(player => player.role.name && roleNames.includes(player.role.name));
  }

  function isRoleMinReachedInCreateGameDto(roleName: RoleName): boolean {
    const playersWithRoleName = getPlayersWithRoleNameInCreateGameDto(roleName);
    const role = getRoleWithNameInRoles(roleName);

    return !!role && (role.minInGame === undefined || playersWithRoleName.length >= role.minInGame);
  }

  function isRoleMaxReachedInCreateGameDto(roleName: RoleName): boolean {
    const playersWithRoleName = getPlayersWithRoleNameInCreateGameDto(roleName);
    const role = getRoleWithNameInRoles(roleName);

    return !!role && playersWithRoleName.length >= role.maxInGame;
  }

  function getRoleLeftCountToReachMinInCreateGameDto(roleName: RoleName): number {
    const playersWithRoleName = getPlayersWithRoleNameInCreateGameDto(roleName);
    const role = getRoleWithNameInRoles(roleName);
    if (role?.minInGame === undefined) {
      return 0;
    }
    const leftCount = role.minInGame - playersWithRoleName.length;

    return leftCount <= -1 ? 0 : leftCount;
  }
  return {
    createGameDto,
    doesCreateGameDtoContainPositionDependantRoles,
    setCreateGameDto,
    resetCreateGameDto,
    addPlayerToCreateGameDto,
    updatePlayerInCreateGameDto,
    setPlayersToCreateGameDto,
    removePlayerFromCreateGameDto,
    getPlayersWithRoleNameInCreateGameDto,
    getPlayersWithAnyRoleNameInCreateGameDto,
    isRoleMinReachedInCreateGameDto,
    isRoleMaxReachedInCreateGameDto,
    getRoleLeftCountToReachMinInCreateGameDto,
  };
});

export { useCreateGameDtoStore };