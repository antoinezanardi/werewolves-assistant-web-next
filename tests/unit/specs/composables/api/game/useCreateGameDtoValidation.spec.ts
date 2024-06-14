import { createPinia, setActivePinia } from "pinia";
import type { Ref } from "vue";

import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { useCreateGameDtoValidation } from "~/composables/api/game/useCreateGameDtoValidation";
import type { Role } from "~/composables/api/role/types/role.class";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { createFakeCreateGameAdditionalCardDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";

describe("Use Create Game Dto Validation Composable", () => {
  const defaultRoles = [
    createFakeRole({ name: "werewolf" }),
    createFakeRole({ name: "two-sisters", minInGame: 2 }),
    createFakeRole({ name: "three-brothers", minInGame: 3 }),
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
    const rolesStore = useRolesStore();
    rolesStore.roles = defaultRoles;
  });

  const validCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({
        name: "Player 1",
        role: { name: "werewolf" },
        side: { current: "werewolves" },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 2",
        role: { name: "werewolf" },
        side: { current: "werewolves" },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 3",
        role: { name: "werewolf" },
        side: { current: "werewolves" },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 4",
        role: { name: "villager" },
        side: { current: "villagers" },
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
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when not all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
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
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when no player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
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
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when no player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, expected }) => {
      const { doesContainOneWerewolfSidedRole } = useCreateGameDtoValidation(createGameDto);

      expect(doesContainOneWerewolfSidedRole.value).toBe(expected);
    });
  });

  describe("areRolesMinimumPlayersReached", () => {
    it.each<{
      test: string;
      roles: Role[] | null;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return false when roles are set to null.",
        roles: null,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return true when all roles with minimum players are present and the minimum number of players is reached.",
        roles: defaultRoles,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the minimum number of players is not reached.",
        roles: defaultRoles,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, roles, expected }) => {
      const rolesStore = useRolesStore();
      rolesStore.roles = roles;
      const { areRolesMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

      expect(areRolesMinimumPlayersReached.value).toBe(expected);
    });
  });

  describe("isTwoSistersRolePresentAndMinimumPlayersReached", () => {
    it.each<{
      test: string;
      roles: Role[] | null;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return false when roles are set to null.",
        roles: null,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return true when the two-sisters role is present and the minimum number of players is reached.",
        roles: defaultRoles,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the two-sisters role is present but the minimum number of players is not reached.",
        roles: defaultRoles,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({ players: [createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } })] })),
        expected: false,
      },
    ])("$test", ({ createGameDto, roles, expected }) => {
      const rolesStore = useRolesStore();
      rolesStore.roles = roles;
      const { isTwoSistersRolePresentAndMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

      expect(isTwoSistersRolePresentAndMinimumPlayersReached.value).toBe(expected);
    });
  });

  describe("isThreeBrothersRolePresentAndMinimumPlayersReached", () => {
    it.each<{
      test: string;
      roles: Role[] | null;
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return false when roles are set to null.",
        roles: null,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return true when the three-brothers role is present and the minimum number of players is reached.",
        roles: defaultRoles,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the three-brothers role is present but the minimum number of players is not reached.",
        roles: defaultRoles,
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
          ],
        })),
        expected: false,
      },
    ])("$test", ({ createGameDto, roles, expected }) => {
      const rolesStore = useRolesStore();
      rolesStore.roles = roles;
      const { isThreeBrothersRolePresentAndMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

      expect(isThreeBrothersRolePresentAndMinimumPlayersReached.value).toBe(expected);
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
            createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return true when the thief is present and additional cards are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "thief" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: "thief" }),
            createFakeCreateGameAdditionalCardDto({ recipient: "actor" }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the thief is present and additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "thief" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the thief is present but additional cards are for the actor.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "thief" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: "actor" }),
            createFakeCreateGameAdditionalCardDto({ recipient: "actor" }),
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
            createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return true when the actor is present and additional cards are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "actor" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: "thief" }),
            createFakeCreateGameAdditionalCardDto({ recipient: "actor" }),
          ],
        })),
        expected: true,
      },
      {
        test: "should return false when the actor is present and additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "actor" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the actor is present but additional cards are for the thief.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "actor" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
          additionalCards: [
            createFakeCreateGameAdditionalCardDto({ recipient: "thief" }),
            createFakeCreateGameAdditionalCardDto({ recipient: "thief" }),
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
              role: { name: "villager" },
              group: "group 1",
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "werewolf" },
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
              role: { name: "prejudiced-manipulator" },
              group: "group 1",
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "werewolf" },
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
            createFakeCreateGamePlayerDto({ role: { name: "prejudiced-manipulator" } }),
            createFakeCreateGamePlayerDto({
              role: { name: "werewolf" },
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
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when not all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when no player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when no player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when there are not enough players for the two-sisters role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the thief is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "thief" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the actor is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "actor" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expected: false,
      },
      {
        test: "should return false when the prejudiced manipulator is present and player groups are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "prejudiced-manipulator" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
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
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "villager" }, side: { current: "villagers" } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.minimumOfPlayersNotReached",
      },
      {
        test: "should contain specific error message when not all roles among players are set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto(),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.notAllRolesAreSet",
      },
      {
        test: "should contain specific error message when no player has a villager sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" }, side: { current: "werewolves" } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.noVillagerSidedRole",
      },
      {
        test: "should contain specific error message when no player has a werewolf sided role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
            createFakeCreateGamePlayerDto({
              role: { name: "villager" },
              side: { current: "villagers" },
            }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.noWerewolfSidedRole",
      },
      {
        test: "should contain specific error message when there are not enough players for the two-sisters role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "two-sisters" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.twoSistersMinimumPlayersNotReached",
      },
      {
        test: "should contain specific error message when there are not enough players for the three-brothers role.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "three-brothers" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.threeBrothersMinimumPlayersNotReached",
      },
      {
        test: "should contain specific error message when the thief is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "thief" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.thiefAdditionalCardsNotSet",
      },
      {
        test: "should contain specific error message when the actor is present but additional cards are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "actor" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
          ],
        })),
        expectedItem: "composables.useCreateGameDtoValidation.actorAdditionalCardsNotSet",
      },
      {
        test: "should contain specific error message when the prejudiced manipulator is present and player groups are not set.",
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ role: { name: "prejudiced-manipulator" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
            createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
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

  describe("isRolePresentAndMinimumPlayersReached", () => {
    it.each<{
      test: string;
      role: Role & { minInGame: number };
      createGameDto: Ref<CreateGameDto>;
      expected: boolean;
    }>([
      {
        test: "should return true when the role is present and the minimum number of players is reached.",
        role: createFakeRole({ name: "werewolf", minInGame: 1 }) as Role & { minInGame: number },
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({ players: [createFakeCreateGamePlayerDto({ role: { name: "werewolf" } })] })),
        expected: true,
      },
      {
        test: "should return false when the role is present but the minimum number of players is not reached.",
        role: createFakeRole({ name: "werewolf", minInGame: 2 }) as Role & { minInGame: number },
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({ players: [createFakeCreateGamePlayerDto({ role: { name: "werewolf" } })] })),
        expected: false,
      },
      {
        test: "should return true when the role is not present.",
        role: createFakeRole({ name: "werewolf", minInGame: 1 }) as Role & { minInGame: number },
        createGameDto: ref<CreateGameDto>(createFakeCreateGameDto({ players: [createFakeCreateGamePlayerDto({ role: { name: "villager" } })] })),
        expected: true,
      },
    ])("$test", ({ role, createGameDto, expected }) => {
      const { isRolePresentAndMinimumPlayersReached } = useCreateGameDtoValidation(createGameDto);

      expect(isRolePresentAndMinimumPlayersReached(role)).toBe(expected);
    });
  });
});