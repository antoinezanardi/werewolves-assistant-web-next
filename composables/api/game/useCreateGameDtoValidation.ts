import type { ComputedRef, Ref } from "vue";

import { MIN_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { RoleNames, RoleSides } from "~/composables/api/role/enums/role.enums";

type UseCreateGameDtoValidation = {
  isMinimumPlayersReached: ComputedRef<boolean>;
  areAllRolesSet: ComputedRef<boolean>;
  doesContainOneVillagerSidedRole: ComputedRef<boolean>;
  doesContainOneWerewolfSidedRole: ComputedRef<boolean>;
  areAdditionalCardsSetForThiefIfPresent: ComputedRef<boolean>;
  areAdditionalCardsSetForActorIfPresent: ComputedRef<boolean>;
  arePlayerGroupsSetForPrejudicedManipulatorIfPresent: ComputedRef<boolean>;
  canCreateGame: ComputedRef<boolean>;
  gameCreationValidationErrors: ComputedRef<string[]>;
};

function useCreateGameDtoValidation(createGameDto: Ref<CreateGameDto>): UseCreateGameDtoValidation {
  const { t } = useI18n();

  const isMinimumPlayersReached = computed<boolean>(() => createGameDto.value.players.length >= MIN_PLAYERS_IN_GAME);

  const areAllRolesSet = computed<boolean>(() => createGameDto.value.players.every(player => player.role.name !== undefined));

  const doesContainOneVillagerSidedRole = computed<boolean>(() => createGameDto.value.players.some(player => player.side.current === RoleSides.VILLAGERS));

  const doesContainOneWerewolfSidedRole = computed<boolean>(() => createGameDto.value.players.some(player => player.side.current === RoleSides.WEREWOLVES));

  const areAdditionalCardsSetForThiefIfPresent = computed<boolean>(() => {
    const isThiefPresent = createGameDto.value.players.some(player => player.role.name === RoleNames.THIEF);
    const areAdditionalCardsSetForThief = createGameDto.value.additionalCards?.some(card => card.recipient === RoleNames.THIEF) === true;
    if (isThiefPresent) {
      return areAdditionalCardsSetForThief;
    }
    return true;
  });

  const areAdditionalCardsSetForActorIfPresent = computed<boolean>(() => {
    const isActorPresent = createGameDto.value.players.some(player => player.role.name === RoleNames.ACTOR);
    const areAdditionalCardsSetForActor = createGameDto.value.additionalCards?.some(card => card.recipient === RoleNames.ACTOR) === true;
    if (isActorPresent) {
      return areAdditionalCardsSetForActor;
    }
    return true;
  });

  const arePlayerGroupsSetForPrejudicedManipulatorIfPresent = computed<boolean>(() => {
    const isPrejudicedManipulatorPresent = createGameDto.value.players.some(player => player.role.name === RoleNames.PREJUDICED_MANIPULATOR);
    const arePlayerGroupsSet = createGameDto.value.players.every(player => player.group);
    if (isPrejudicedManipulatorPresent) {
      return arePlayerGroupsSet;
    }
    return true;
  });

  const canCreateGame = computed<boolean>(() => isMinimumPlayersReached.value &&
    areAllRolesSet.value &&
    doesContainOneVillagerSidedRole.value &&
    doesContainOneWerewolfSidedRole.value &&
    areAdditionalCardsSetForThiefIfPresent.value &&
    areAdditionalCardsSetForActorIfPresent.value &&
    arePlayerGroupsSetForPrejudicedManipulatorIfPresent.value);

  const gameCreationValidationErrors = computed<string[]>(() => {
    const errors: Record<string, boolean> = {
      [t("composables.useCreateGameDtoValidation.minimumOfPlayersNotReached")]: !isMinimumPlayersReached.value,
      [t("composables.useCreateGameDtoValidation.notAllRolesAreSet")]: !areAllRolesSet.value,
      [t("composables.useCreateGameDtoValidation.noVillagerSidedRole")]: !doesContainOneVillagerSidedRole.value,
      [t("composables.useCreateGameDtoValidation.noWerewolfSidedRole")]: !doesContainOneWerewolfSidedRole.value,
      [t("composables.useCreateGameDtoValidation.thiefAdditionalCardsNotSet")]: !areAdditionalCardsSetForThiefIfPresent.value,
      [t("composables.useCreateGameDtoValidation.actorAdditionalCardsNotSet")]: !areAdditionalCardsSetForActorIfPresent.value,
      [t("composables.useCreateGameDtoValidation.prejudicedManipulatorGroupsNotSet")]: !arePlayerGroupsSetForPrejudicedManipulatorIfPresent.value,
    };

    return Object.keys(errors).filter((key: keyof typeof errors) => errors[key]);
  });

  return {
    isMinimumPlayersReached,
    areAllRolesSet,
    doesContainOneVillagerSidedRole,
    doesContainOneWerewolfSidedRole,
    areAdditionalCardsSetForThiefIfPresent,
    areAdditionalCardsSetForActorIfPresent,
    arePlayerGroupsSetForPrejudicedManipulatorIfPresent,
    canCreateGame,
    gameCreationValidationErrors,
  };
}

export { useCreateGameDtoValidation };