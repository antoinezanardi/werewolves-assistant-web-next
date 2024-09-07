import { defineStore } from "pinia";
import { ref } from "vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";

import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";
import { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import { ADDITIONAL_CARDS_DEPENDANT_ROLES } from "~/composables/api/role/constants/role.constants";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { useLocalStorage } from "@vueuse/core";
import { LocalStorageKeys } from "~/utils/enums/local-storage.enums";

const useCreateGameDtoStore = defineStore(StoreIds.CREATE_GAME_DTO, () => {
  const rolesStore = useRolesStore();
  const { getRoleWithNameInRoles } = rolesStore;

  const createGameOptionsDtoFromLocalStorage = useLocalStorage(LocalStorageKeys.GAME_OPTIONS, DEFAULT_GAME_OPTIONS, { mergeDefaults: true });

  const defaultCreateGameDto = CreateGameDto.create({
    players: [],
    options: DEFAULT_GAME_OPTIONS,
  });

  const createGameDto = ref<CreateGameDto>(CreateGameDto.create({
    ...defaultCreateGameDto,
    options: createGameOptionsDtoFromLocalStorage.value,
  }));

  const createGameOptionsDto = computed<GameOptions>(() => createGameDto.value.options);

  const doesCreateGameDtoContainPositionDependantRoles = computed<boolean>(() => {
    const positionDependantRoles: RoleName[] = ["rusty-sword-knight", "bear-tamer", "fox"];
    const playersWithPositionDependantRoles = getPlayersWithAnyRoleNameInCreateGameDto(positionDependantRoles);

    return playersWithPositionDependantRoles.length > 0;
  });

  const doesCreateGameDtoContainAdditionalCardsDependantRoles = computed<boolean>(() => {
    const playersWithAdditionalCardsDependantRoles = getPlayersWithAnyRoleNameInCreateGameDto([...ADDITIONAL_CARDS_DEPENDANT_ROLES]);

    return playersWithAdditionalCardsDependantRoles.length > 0;
  });

  function setCreateGameDto(createGameDtoValue: CreateGameDto): void {
    createGameDto.value = CreateGameDto.create(createGameDtoValue);
    saveCreateGameOptionsDtoToLocalStorage();
  }

  function resetCreateGameDto(doesRetrieveLocalStorageValues = true): void {
    if (!doesRetrieveLocalStorageValues) {
      createGameDto.value = CreateGameDto.create(defaultCreateGameDto);
      saveCreateGameOptionsDtoToLocalStorage();

      return;
    }
    createGameDto.value = CreateGameDto.create({
      ...defaultCreateGameDto,
      options: createGameOptionsDtoFromLocalStorage.value,
    });
  }

  function resetCreateGameOptionsDto(): void {
    createGameDto.value.options = GameOptions.create(DEFAULT_GAME_OPTIONS);
    saveCreateGameOptionsDtoToLocalStorage();
  }

  function saveCreateGameOptionsDtoToLocalStorage(): void {
    createGameOptionsDtoFromLocalStorage.value = createGameDto.value.options;
  }

  function removeObsoleteAdditionalCardsFromCreateGameDto(): void {
    if (!createGameDto.value.additionalCards) {
      return;
    }
    const rolesInGame = new Set(createGameDto.value.players.map(player => player.role.name));
    createGameDto.value.additionalCards = createGameDto.value.additionalCards.filter(({ recipient }) => rolesInGame.has(recipient));
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

  function isRoleInCreateGameDto(roleName: RoleName): boolean {
    return createGameDto.value.players.some(player => player.role.name === roleName);
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

  function setAdditionalCardsForRecipientInCreateGameDto(additionalCards: CreateGameAdditionalCardDto[], recipient: GameAdditionalCardRecipientRoleName): void {
    if (!createGameDto.value.additionalCards) {
      createGameDto.value.additionalCards = additionalCards;
    }

    createGameDto.value.additionalCards = createGameDto.value.additionalCards.filter(card => card.recipient !== recipient);
    createGameDto.value.additionalCards.push(...additionalCards);
  }

  function getAdditionalCardsForRecipientInCreateGameDto(recipient: GameAdditionalCardRecipientRoleName): CreateGameAdditionalCardDto[] {
    return createGameDto.value.additionalCards?.filter(card => card.recipient === recipient) ?? [];
  }

  function getAdditionalCardsWithRoleNameInCreateGameDto(roleName: RoleName): CreateGameAdditionalCardDto[] {
    return createGameDto.value.additionalCards?.filter(card => card.roleName === roleName) ?? [];
  }
  return {
    createGameOptionsDtoFromLocalStorage,
    createGameDto,
    createGameOptionsDto,
    doesCreateGameDtoContainPositionDependantRoles,
    doesCreateGameDtoContainAdditionalCardsDependantRoles,
    setCreateGameDto,
    resetCreateGameDto,
    resetCreateGameOptionsDto,
    saveCreateGameOptionsDtoToLocalStorage,
    removeObsoleteAdditionalCardsFromCreateGameDto,
    addPlayerToCreateGameDto,
    updatePlayerInCreateGameDto,
    setPlayersToCreateGameDto,
    removePlayerFromCreateGameDto,
    isRoleInCreateGameDto,
    getPlayersWithRoleNameInCreateGameDto,
    getPlayersWithAnyRoleNameInCreateGameDto,
    isRoleMinReachedInCreateGameDto,
    isRoleMaxReachedInCreateGameDto,
    getRoleLeftCountToReachMinInCreateGameDto,
    setAdditionalCardsForRecipientInCreateGameDto,
    getAdditionalCardsForRecipientInCreateGameDto,
    getAdditionalCardsWithRoleNameInCreateGameDto,
  };
});

export { useCreateGameDtoStore };