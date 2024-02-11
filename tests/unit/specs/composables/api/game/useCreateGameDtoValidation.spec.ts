import type { Ref } from "vue";

import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import { RoleNames, RoleSides } from "~/composables/api/role/enums/role.enums";
import { createFakeCreateGameAdditionalCardDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

describe("Use Create Game Dto Validation Composable", () => {
  const validCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({
        name: "Player 1",
        role: { name: RoleNames.WEREWOLF },
        side: { current: RoleSides.WEREWOLVES },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 2",
        role: { name: RoleNames.WEREWOLF },
        side: { current: RoleSides.WEREWOLVES },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 3",
        role: { name: RoleNames.WEREWOLF },
        side: { current: RoleSides.WEREWOLVES },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 4",
        role: { name: RoleNames.VILLAGER },
        side: { current: RoleSides.VILLAGERS },
      }),
    ],
  });

  describe("isMinimumPlayersReached", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return false when the number of players is less than the minimum number of players in a game.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto(),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expected: false,
      },
      {
        test: "should return true when the number of players is greater than or equal to the minimum number of players in a game.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto(),
            createFakeCreateGamePlayerDto(),
            createFakeCreateGamePlayerDto(),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expected: true,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { isMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

      expect(isMinimumPlayersReached.value).toBe(expected);
    });
  });

  describe("areAllRolesSet", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when not all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { areAllRolesSet } = useCreateGameDtoValidation(createGameDto);

      expect(areAllRolesSet.value).toBe(expected);
    });
  });

  describe("doesContainOneVillagerSidedRole", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when at least one player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when no player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { doesContainOneVillagerSidedRole } = useCreateGameDtoValidation(createGameDto);

      expect(doesContainOneVillagerSidedRole.value).toBe(expected);
    });
  });

  describe("doesContainOneWerewolfSidedRole", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when at least one player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when no player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { doesContainOneWerewolfSidedRole } = useCreateGameDtoValidation(createGameDto);

      expect(doesContainOneWerewolfSidedRole.value).toBe(expected);
    });
  });

  describe("areAdditionalCardsSetForThiefIfPresent", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when the thief is not present.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return true when the thief is present and additional cards are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.THIEF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.THIEF }),
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.ACTOR }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the thief is present and additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.THIEF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the thief is present but additional cards are for the actor.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.THIEF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.ACTOR }),
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.ACTOR }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { areAdditionalCardsSetForThiefIfPresent } = useCreateGameDtoValidation(createGameDto);

      expect(areAdditionalCardsSetForThiefIfPresent.value).toBe(expected);
    });
  });

  describe("areAdditionalCardsSetForActorIfPresent", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when the actor is not present.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return true when the actor is present and additional cards are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.ACTOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.THIEF }),
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.ACTOR }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the actor is present and additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.ACTOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the actor is present but additional cards are for the thief.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.ACTOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.THIEF }),
            createFakeCreateGameAdditionalCardDto({ recipient: RoleNames.THIEF }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { areAdditionalCardsSetForActorIfPresent } = useCreateGameDtoValidation(createGameDto);

      expect(areAdditionalCardsSetForActorIfPresent.value).toBe(expected);
    });
  });

  describe("arePlayerGroupsSetForPrejudicedManipulatorIfPresent", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when the prejudiced manipulator is not present.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              group: "group 1",
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.WEREWOLF },
              group: "group 2",
            }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return true when the prejudiced manipulator is present and player groups are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.PREJUDICED_MANIPULATOR },
              group: "group 1",
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.WEREWOLF },
              group: "group 2",
            }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the prejudiced manipulator is present and player groups are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.PREJUDICED_MANIPULATOR } }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.WEREWOLF },
              group: "group 2",
            }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { arePlayerGroupsSetForPrejudicedManipulatorIfPresent } = useCreateGameDtoValidation(createGameDto);

      expect(arePlayerGroupsSetForPrejudicedManipulatorIfPresent.value).toBe(expected);
    });
  });

  describe("canCreateGame", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return false when the minimum of players are not set in game.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when not all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when no player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when no player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the thief is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.THIEF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the actor is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.ACTOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the prejudiced manipulator is present and player groups are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.PREJUDICED_MANIPULATOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return true when game can be created.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto(validCreateGameDto)),
        expected: true,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { canCreateGame } = useCreateGameDtoValidation(createGameDto);

      expect(canCreateGame.value).toBe(expected);
    });
  });

  describe("gameCreationValidationErrors", () => {
    it.each<{
      test: string;
      createGameDto: Ref<CreateGameDto>;
      expectedItem: string;
    }>([
      {
        test: "should contain specific error message when the minimum of players are not set in game.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.VILLAGER }, side: { current: RoleSides.VILLAGERS } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.minimumOfPlayersNotReached",
      },
      {
        test: "should contain specific error message when not all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.notAllRolesAreSet",
      },
      {
        test: "should contain specific error message when no player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF }, side: { current: RoleSides.WEREWOLVES } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.noVillagerSidedRole",
      },
      {
        test: "should contain specific error message when no player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: RoleNames.VILLAGER },
              side: { current: RoleSides.VILLAGERS },
            }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.noWerewolfSidedRole",
      },
      {
        test: "should contain specific error message when the thief is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.THIEF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.thiefAdditionalCardsNotSet",
      },
      {
        test: "should contain specific error message when the actor is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.ACTOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.actorAdditionalCardsNotSet",
      },
      {
        test: "should contain specific error message when the prejudiced manipulator is present and player groups are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.PREJUDICED_MANIPULATOR } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
            createFakeCreateGamePlayerDto({ role: { name: RoleNames.WEREWOLF } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.prejudicedManipulatorGroupsNotSet",
      },
    ])("$test", ({ createGameDto, expectedItem }) => {
      const { gameCreationValidationErrors } = useCreateGameDtoValidation(createGameDto);

      expect(gameCreationValidationErrors.value).toContain(expectedItem);
    });

    it("should return empty array when game can be created.", () => {
      const createGameDto = ref<CreateGameDto>(createFakeCreateGameDto(validCreateGameDto));
      const { gameCreationValidationErrors } = useCreateGameDtoValidation(createGameDto);

      expect(gameCreationValidationErrors.value).toStrictEqual([]);
    });
  });
});