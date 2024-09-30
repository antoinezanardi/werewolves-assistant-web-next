import { storeToRefs } from "pinia";
import { group as groupByField } from "radash";
import type { ComputedRef, Ref } from "vue";

import { MIN_PLAYERS_IN_GAME, MIN_PLAYERS_IN_GROUP } from "~/composables/api/game/constants/game.constants";
import type { CreateGamePlayerWithGroupDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import type { Role } from "~/composables/api/role/types/role.class";
import { useRolesStore } from "~/stores/role/useRolesStore";

type RoleWithMinInGame = Role & { minInGame: number };

type UseCreateGameDtoValidation = {
  isMinimumPlayersReached: ComputedRef<boolean>;
  areAllRolesSet: ComputedRef<boolean>;
  doesContainOneVillagerSidedRole: ComputedRef<boolean>;
  doesContainOneWerewolfSidedRole: ComputedRef<boolean>;
  areRolesMinimumPlayersReached: ComputedRef<boolean>;
  isTwoSistersRolePresentAndMinimumPlayersReached: ComputedRef<boolean>;
  isThreeBrothersRolePresentAndMinimumPlayersReached: ComputedRef<boolean>;
  areAdditionalCardsSetForThiefIfPresent: ComputedRef<boolean>;
  areAdditionalCardsSetForActorIfPresent: ComputedRef<boolean>;
  areAdditionalCardsSetForAdditionalCardsDependantRoles: ComputedRef<boolean>;
  arePlayerGroupsSetForPrejudicedManipulatorIfPresent: ComputedRef<boolean>;
  canCreateGame: ComputedRef<boolean>;
  gameCreationValidationErrors: ComputedRef<string[]>;
  isRolePresentAndMinimumPlayersReached: (role: RoleWithMinInGame) => boolean;
};

function useCreateGameDtoValidation(createGameDto: Ref<CreateGameDto>): UseCreateGameDtoValidation {
  const rolesStore = useRolesStore();
  const { roles } = storeToRefs(rolesStore);

  const { t } = useI18n();

  const isMinimumPlayersReached = computed<boolean>(() => createGameDto.value.players.length >= MIN_PLAYERS_IN_GAME);

  const areAllRolesSet = computed<boolean>(() => createGameDto.value.players.every(player => player.role.name !== undefined));

  const doesContainOneVillagerSidedRole = computed<boolean>(() => createGameDto.value.players.some(player => player.side.current === "villagers"));

  const doesContainOneWerewolfSidedRole = computed<boolean>(() => createGameDto.value.players.some(player => player.side.current === "werewolves"));

  const areRolesMinimumPlayersReached = computed<boolean>(() => {
    if (!roles.value) {
      return false;
    }
    const rolesWithMinimumPlayers = roles.value.filter((role): role is RoleWithMinInGame => role.minInGame !== undefined);

    return rolesWithMinimumPlayers.every(role => isRolePresentAndMinimumPlayersReached(role));
  });

  const isTwoSistersRolePresentAndMinimumPlayersReached = computed<boolean>(() => {
    if (!roles.value) {
      return false;
    }
    const role = roles.value.find(({ name }) => name === "two-sisters") as RoleWithMinInGame;

    return isRolePresentAndMinimumPlayersReached(role);
  });

  const isThreeBrothersRolePresentAndMinimumPlayersReached = computed<boolean>(() => {
    if (!roles.value) {
      return false;
    }
    const role = roles.value.find(({ name }) => name === "three-brothers") as RoleWithMinInGame;

    return isRolePresentAndMinimumPlayersReached(role);
  });

  const areAdditionalCardsSetForThiefIfPresent = computed<boolean>(() => {
    const isThiefPresent = createGameDto.value.players.some(player => player.role.name === "thief");
    if (!isThiefPresent) {
      return true;
    }
    return createGameDto.value.additionalCards?.some(card => card.recipient === "thief") === true;
  });

  const areAdditionalCardsSetForActorIfPresent = computed<boolean>(() => {
    const isActorPresent = createGameDto.value.players.some(player => player.role.name === "actor");
    if (!isActorPresent) {
      return true;
    }
    return createGameDto.value.additionalCards?.some(card => card.recipient === "actor") === true;
  });

  const areAdditionalCardsSetForAdditionalCardsDependantRoles = computed<boolean>(() => areAdditionalCardsSetForActorIfPresent.value &&
    areAdditionalCardsSetForThiefIfPresent.value);

  const arePlayerGroupsSetForPrejudicedManipulatorIfPresent = computed<boolean>(() => {
    const isPrejudicedManipulatorPresent = createGameDto.value.players.some(player => player.role.name === "prejudiced-manipulator");
    if (!isPrejudicedManipulatorPresent) {
      return true;
    }
    const minimumGroups = 2;
    const playersWithGroup = createGameDto.value.players.filter(player => player.group !== undefined) as CreateGamePlayerWithGroupDto[];
    const groups = groupByField(playersWithGroup, player => player.group) as Record<string, CreateGamePlayerWithGroupDto[]>;
    const areAllGroupsMinimumPlayersReached = Object.values(groups).every(group => group.length >= MIN_PLAYERS_IN_GROUP);

    return Object.keys(groups).length >= minimumGroups && areAllGroupsMinimumPlayersReached;
  });

  const canCreateGame = computed<boolean>(() => isMinimumPlayersReached.value &&
    areAllRolesSet.value &&
    doesContainOneVillagerSidedRole.value &&
    doesContainOneWerewolfSidedRole.value &&
    areRolesMinimumPlayersReached.value &&
    areAdditionalCardsSetForThiefIfPresent.value &&
    areAdditionalCardsSetForActorIfPresent.value &&
    arePlayerGroupsSetForPrejudicedManipulatorIfPresent.value);

  const gameCreationValidationErrors = computed<string[]>(() => {
    const errors: Record<string, boolean> = {
      [t("composables.useCreateGameDtoValidation.minimumOfPlayersNotReached")]: !isMinimumPlayersReached.value,
      [t("composables.useCreateGameDtoValidation.notAllRolesAreSet")]: !areAllRolesSet.value,
      [t("composables.useCreateGameDtoValidation.noVillagerSidedRole")]: !doesContainOneVillagerSidedRole.value,
      [t("composables.useCreateGameDtoValidation.noWerewolfSidedRole")]: !doesContainOneWerewolfSidedRole.value,
      [t("composables.useCreateGameDtoValidation.twoSistersMinimumPlayersNotReached")]: !isTwoSistersRolePresentAndMinimumPlayersReached.value,
      [t("composables.useCreateGameDtoValidation.threeBrothersMinimumPlayersNotReached")]: !isThreeBrothersRolePresentAndMinimumPlayersReached.value,
      [t("composables.useCreateGameDtoValidation.thiefAdditionalCardsNotSet")]: !areAdditionalCardsSetForThiefIfPresent.value,
      [t("composables.useCreateGameDtoValidation.actorAdditionalCardsNotSet")]: !areAdditionalCardsSetForActorIfPresent.value,
      [t("composables.useCreateGameDtoValidation.prejudicedManipulatorGroupsNotSet")]: !arePlayerGroupsSetForPrejudicedManipulatorIfPresent.value,
    };

    return Object.keys(errors).filter((key: keyof typeof errors) => errors[key]);
  });

  function isRolePresentAndMinimumPlayersReached(role: RoleWithMinInGame): boolean {
    const playersWithRole = createGameDto.value.players.filter(player => player.role.name === role.name);
    const playersWithRoleCount = playersWithRole.length;

    return playersWithRoleCount === 0 || playersWithRoleCount >= role.minInGame;
  }
  return {
    isMinimumPlayersReached,
    areAllRolesSet,
    doesContainOneVillagerSidedRole,
    doesContainOneWerewolfSidedRole,
    areRolesMinimumPlayersReached,
    isTwoSistersRolePresentAndMinimumPlayersReached,
    isThreeBrothersRolePresentAndMinimumPlayersReached,
    areAdditionalCardsSetForThiefIfPresent,
    areAdditionalCardsSetForActorIfPresent,
    areAdditionalCardsSetForAdditionalCardsDependantRoles,
    arePlayerGroupsSetForPrejudicedManipulatorIfPresent,
    canCreateGame,
    gameCreationValidationErrors,
    isRolePresentAndMinimumPlayersReached,
  };
}

export { useCreateGameDtoValidation };