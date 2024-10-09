import type * as VueUse from "@vueuse/core";
import { createPinia, setActivePinia } from "pinia";
import { vi } from "vitest";

import { createFakeCreateGameAdditionalCardDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto.factory";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import type { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useRolesStore } from "~/stores/role/useRolesStore";

const hoistedMocks = vi.hoisted(() => ({ useLocalStorage: vi.fn(() => ({ value: DEFAULT_GAME_OPTIONS })) }));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUse>(),
  useLocalStorage: hoistedMocks.useLocalStorage,
}));

describe("Create Game Dto Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    hoistedMocks.useLocalStorage.mockReturnValue({ value: DEFAULT_GAME_OPTIONS });
  });

  it("should retrieve game options from local storage when created.", () => {
    useCreateGameDtoStore();

    expect(hoistedMocks.useLocalStorage).toHaveBeenCalledExactlyOnceWith("gameOptions", DEFAULT_GAME_OPTIONS, { mergeDefaults: true });
  });

  it("should have initial state with game options from local storage when created.", () => {
    hoistedMocks.useLocalStorage.mockReturnValue({ value: DEFAULT_GAME_OPTIONS });
    const createGameDtoStore = useCreateGameDtoStore();
    const expectedCreateGameDto = createFakeCreateGameDto({ options: DEFAULT_GAME_OPTIONS });

    expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
  });

  it("should have initial state for first group name when created.", () => {
    const createGameDtoStore = useCreateGameDtoStore();

    expect(createGameDtoStore.firstGroupName).toBe("stores.useCreateGameDtoStore.firstDefaultGroupName");
  });

  it("should have initial state for second group name when created.", () => {
    const createGameDtoStore = useCreateGameDtoStore();

    expect(createGameDtoStore.secondGroupName).toBe("stores.useCreateGameDtoStore.secondDefaultGroupName");
  });

  describe("doesCreateGameDtoContainPositionDependantRoles", () => {
    it("should return true when createGameDto contains position dependant roles.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ role: { name: "rusty-sword-knight" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];

      expect(createGameDtoStore.doesCreateGameDtoContainPositionDependantRoles).toBeTruthy();
    });

    it("should return false when createGameDto does not contain position dependant roles.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];

      expect(createGameDtoStore.doesCreateGameDtoContainPositionDependantRoles).toBeFalsy();
    });
  });

  describe("doesCreateGameDtoContainAdditionalCardsDependantRoles", () => {
    it("should return true when createGameDto contains additional cards dependant roles.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ role: { name: "thief" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];

      expect(createGameDtoStore.doesCreateGameDtoContainAdditionalCardsDependantRoles).toBeTruthy();
    });

    it("should return false when createGameDto does not contain additional cards dependant roles.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];

      expect(createGameDtoStore.doesCreateGameDtoContainAdditionalCardsDependantRoles).toBeFalsy();
    });
  });

  describe("setCreateGameDto", () => {
    it("should set createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
        ],
        options: createFakeGameOptions(),
      });
      createGameDtoStore.setCreateGameDto(expectedCreateGameDto);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });

    it("should save create game options dto to local storage when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
        ],
        options: createFakeGameOptions(),
      });
      createGameDtoStore.setCreateGameDto(expectedCreateGameDto);

      expect(createGameDtoStore.createGameOptionsDtoFromLocalStorage).toStrictEqual<{ value: GameOptions }>({ value: expectedCreateGameDto.options });
    });
  });

  describe("changePlayersOldGroupNameToNew", () => {
    it("should change players old group name to new when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ group: "old" }),
        createFakeCreateGamePlayerDto({ group: "old" }),
        createFakeCreateGamePlayerDto({ group: "other-one" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      const expectedPlayers = [
        createFakeCreateGamePlayerDto({
          ...players[0],
          group: "new",
        }),
        createFakeCreateGamePlayerDto({
          ...players[1],
          group: "new",
        }),
        createFakeCreateGamePlayerDto({
          ...players[2],
          group: "other-one",
        }),
      ];

      createGameDtoStore.changePlayersOldGroupNameToNew("old", "new");

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("setFirstDefaultGroupName", () => {
    it("should set first default group name and update players group name when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.firstGroupName = "old";
      const players = [
        createFakeCreateGamePlayerDto({ group: "old" }),
        createFakeCreateGamePlayerDto({ group: "old" }),
        createFakeCreateGamePlayerDto({ group: "other-one" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      const expectedPlayers = [
        createFakeCreateGamePlayerDto({
          ...players[0],
          group: "new-name",
        }),
        createFakeCreateGamePlayerDto({
          ...players[1],
          group: "new-name",
        }),
        createFakeCreateGamePlayerDto({
          ...players[2],
          group: "other-one",
        }),
      ];
      createGameDtoStore.setFirstDefaultGroupName("new-name");

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("setSecondDefaultGroupName", () => {
    it("should set second default group name and update players group name when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.secondGroupName = "old";
      const players = [
        createFakeCreateGamePlayerDto({ group: "old" }),
        createFakeCreateGamePlayerDto({ group: "old" }),
        createFakeCreateGamePlayerDto({ group: "other-one" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      const expectedPlayers = [
        createFakeCreateGamePlayerDto({
          ...players[0],
          group: "new-name",
        }),
        createFakeCreateGamePlayerDto({
          ...players[1],
          group: "new-name",
        }),
        createFakeCreateGamePlayerDto({
          ...players[2],
          group: "other-one",
        }),
      ];
      createGameDtoStore.setSecondDefaultGroupName("new-name");

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("resetCreateGameDto", () => {
    it("should reset create game dto with default values when local storage values are not kept.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
        ],
      });
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [],
        options: DEFAULT_GAME_OPTIONS,
      });
      createGameDtoStore.resetCreateGameDto(false);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });

    it("should reset create game dto with local storage values when local storage values are kept.", () => {
      const randomGameOptions = createFakeGameOptions();
      hoistedMocks.useLocalStorage.mockReturnValue({ value: randomGameOptions });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
        ],
      });
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [],
        options: randomGameOptions,
      });
      createGameDtoStore.resetCreateGameDto();

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });

    it("should not save create game options dto to local storage when local storage values are not kept.", () => {
      const randomGameOptions = createFakeGameOptions();
      hoistedMocks.useLocalStorage.mockReturnValue({ value: randomGameOptions });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
          createFakeCreateGamePlayerDto(),
        ],
      });
      createGameDtoStore.resetCreateGameDto(false);
      const expectedGameOptions = createFakeGameOptions(DEFAULT_GAME_OPTIONS);

      expect(createGameDtoStore.createGameOptionsDtoFromLocalStorage).toStrictEqual<{ value: GameOptions }>({ value: expectedGameOptions });
    });
  });

  describe("resetCreateGameOptionsDto", () => {
    it("should reset create game options dto with default values when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options = createFakeGameOptions();
      createGameDtoStore.resetCreateGameOptionsDto();
      const expectedGameOptions = createFakeGameOptions(DEFAULT_GAME_OPTIONS);

      expect(createGameDtoStore.createGameDto.options).toStrictEqual<GameOptions>(expectedGameOptions);
    });

    it("should save create game options dto to local storage when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options = createFakeGameOptions();
      createGameDtoStore.resetCreateGameOptionsDto();
      const expectedGameOptions = createFakeGameOptions(DEFAULT_GAME_OPTIONS);

      expect(createGameDtoStore.createGameOptionsDtoFromLocalStorage).toStrictEqual<{ value: GameOptions }>({ value: expectedGameOptions });
    });
  });

  describe("resetCreateGameOptionDto", () => {
    it("should reset create game option dto with its default value when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options = createFakeGameOptions(DEFAULT_GAME_OPTIONS);
      createGameDtoStore.createGameDto.options.composition.isHidden = true;
      createGameDtoStore.resetCreateGameOptionDto("composition.isHidden");
      const expectedGameOptions = createFakeGameOptions(DEFAULT_GAME_OPTIONS);

      expect(createGameDtoStore.createGameDto.options).toStrictEqual<GameOptions>(expectedGameOptions);
    });
  });

  describe("saveCreateGameOptionsDtoToLocalStorage", () => {
    it("should save create game options dto to local storage when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const randomGameOptions = createFakeGameOptions();
      createGameDtoStore.createGameDto.options = randomGameOptions;
      createGameDtoStore.saveCreateGameOptionsDtoToLocalStorage();

      expect(createGameDtoStore.createGameOptionsDtoFromLocalStorage).toStrictEqual<{ value: GameOptions }>({ value: randomGameOptions });
    });
  });

  describe("removeObsoleteAdditionalCardsFromCreateGameDto", () => {
    it("should remove existing additional cards when recipients are absent.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const additionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "seer",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "seer",
        }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "actor" }) })],
        additionalCards,
      });
      const expectedAdditionalCards = [additionalCards[2]];
      createGameDtoStore.removeObsoleteAdditionalCardsFromCreateGameDto();

      expect(createGameDtoStore.createGameDto.additionalCards).toStrictEqual<CreateGameAdditionalCardDto[]>(expectedAdditionalCards);
    });

    it("should do nothing when additional cards are undefined.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = undefined;
      createGameDtoStore.removeObsoleteAdditionalCardsFromCreateGameDto();

      expect(createGameDtoStore.createGameDto.additionalCards).toBeUndefined();
    });
  });

  describe("addPlayerToCreateGameDto", () => {
    it("should add player to createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const player = createFakeCreateGamePlayerDto();
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [player],
        options: DEFAULT_GAME_OPTIONS,
      });

      createGameDtoStore.addPlayerToCreateGameDto(player);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });

  describe("updatePlayerInCreateGameDto", () => {
    it("should update player in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ name: "player1" }),
        createFakeCreateGamePlayerDto({ name: "player2" }),
        createFakeCreateGamePlayerDto({ name: "player3" }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const player = createFakeCreateGamePlayerDto({ name: "player2", role: { name: "seer" } });
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [
          players[0],
          player,
          players[2],
        ],
        options: DEFAULT_GAME_OPTIONS,
      });

      createGameDtoStore.updatePlayerInCreateGameDto(player);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });

    it("should not update player in createGameDto when player not found.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ name: "player1" }),
        createFakeCreateGamePlayerDto({ name: "player2" }),
        createFakeCreateGamePlayerDto({ name: "player3" }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const player = createFakeCreateGamePlayerDto({ name: "player4", role: { name: "seer" } });
      const expectedCreateGameDto = createFakeCreateGameDto({
        players,
        options: DEFAULT_GAME_OPTIONS,
      });

      createGameDtoStore.updatePlayerInCreateGameDto(player);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });

  describe("setPlayersToCreateGameDto", () => {
    it("should set players to createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto(),
        createFakeCreateGamePlayerDto(),
        createFakeCreateGamePlayerDto(),
      ];
      createGameDtoStore.setPlayersToCreateGameDto(players);

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(players);
    });
  });

  describe("removePlayerFromCreateGameDto", () => {
    it("should remove player from createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ name: "player1" }),
        createFakeCreateGamePlayerDto({ name: "player2" }),
        createFakeCreateGamePlayerDto({ name: "player3" }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const expectedCreateGameDto = createFakeCreateGameDto({
        players: [
          players[0],
          players[2],
        ],
        options: DEFAULT_GAME_OPTIONS,
      });
      createGameDtoStore.removePlayerFromCreateGameDto(players[1].name);

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });

    it("should not remove player from createGameDto when player not found.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ name: "player1" }),
        createFakeCreateGamePlayerDto({ name: "player2" }),
        createFakeCreateGamePlayerDto({ name: "player3" }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const expectedCreateGameDto = createFakeCreateGameDto({
        players,
        options: DEFAULT_GAME_OPTIONS,
      });

      createGameDtoStore.removePlayerFromCreateGameDto("player4");

      expect(createGameDtoStore.createGameDto).toStrictEqual<CreateGameDto>(expectedCreateGameDto);
    });
  });

  describe("isRoleInCreateGameDto", () => {
    it("should return true when role is in createGameDto.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];

      expect(createGameDtoStore.isRoleInCreateGameDto("seer")).toBeTruthy();
    });

    it("should return false when role is not in createGameDto.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = [
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];

      expect(createGameDtoStore.isRoleInCreateGameDto("seer")).toBeFalsy();
    });
  });

  describe("getPlayersWithRoleNameInCreateGameDto", () => {
    it("should return players with role name in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
        createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const expectedPlayers = [players[0], players[1]];

      const result = createGameDtoStore.getPlayersWithRoleNameInCreateGameDto("seer");

      expect(result).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("getPlayersWithAnyRoleNameInCreateGameDto", () => {
    it("should return players with any role name in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
        createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
        createFakeCreateGamePlayerDto({ role: { name: "werewolf" } }),
        createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
      ];
      createGameDtoStore.createGameDto.players = players;
      const expectedPlayers = [players[0], players[1], players[3]];

      const result = createGameDtoStore.getPlayersWithAnyRoleNameInCreateGameDto(["seer", "villager"]);

      expect(result).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("isRoleMinReachedInCreateGameDto", () => {
    beforeEach(() => {
      const rolesStore = useRolesStore();
      rolesStore.roles = [
        createFakeRole({ name: "seer", minInGame: 1, maxInGame: 1 }),
        createFakeRole({ name: "villager", minInGame: 2, maxInGame: 2 }),
        createFakeRole({ name: "little-girl", maxInGame: 2 }),
      ];
    });

    it.each<{
      roleName: RoleName;
      players: CreateGamePlayerDto[];
      expected: boolean;
      test: string;
    }>([
      {
        roleName: "seer",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: true,
        test: "should return true when role min is reached in createGameDto.",
      },
      {
        roleName: "seer",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: true,
        test: "should return true when role min is reached + 1 in createGameDto.",
      },
      {
        roleName: "villager",
        players: [createFakeCreateGamePlayerDto({ role: { name: "villager" } })],
        expected: false,
        test: "should return false when role min is not reached in createGameDto.",
      },
      {
        roleName: "seer",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: false,
        test: "should return false when role is not in party.",
      },
      {
        roleName: "little-girl",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: true,
        test: "should return true when role doesn't have min in game.",
      },
      {
        roleName: "elder",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: false,
        test: "should return false when role is not in roles.",
      },
    ])("$test", ({ roleName, players, expected }) => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = players;

      expect(createGameDtoStore.isRoleMinReachedInCreateGameDto(roleName)).toBe(expected);
    });
  });

  describe("isRoleMaxReachedInCreateGameDto", () => {
    beforeEach(() => {
      const rolesStore = useRolesStore();
      rolesStore.roles = [
        createFakeRole({ name: "seer", maxInGame: 1 }),
        createFakeRole({ name: "villager", maxInGame: 2 }),
      ];
    });

    it.each<{
      roleName: RoleName;
      players: CreateGamePlayerDto[];
      expected: boolean;
      test: string;
    }>([
      {
        roleName: "seer",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: true,
        test: "should return true when role max is reached in createGameDto.",
      },
      {
        roleName: "seer",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: true,
        test: "should return true when role max is reached + 1 in createGameDto.",
      },
      {
        roleName: "villager",
        players: [createFakeCreateGamePlayerDto({ role: { name: "villager" } })],
        expected: false,
        test: "should return false when role max is not reached in createGameDto.",
      },
      {
        roleName: "elder",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: false,
        test: "should return false when role is not in roles.",
      },
    ])("$test", ({ roleName, players, expected }) => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = players;

      expect(createGameDtoStore.isRoleMaxReachedInCreateGameDto(roleName)).toBe(expected);
    });
  });

  describe("getRoleLeftCountToReachMinInCreateGameDto", () => {
    beforeEach(() => {
      const rolesStore = useRolesStore();
      rolesStore.roles = [
        createFakeRole({ name: "seer", minInGame: 1, maxInGame: 1 }),
        createFakeRole({ name: "villager", minInGame: 2, maxInGame: 2 }),
        createFakeRole({ name: "little-girl", maxInGame: 2 }),
      ];
    });

    it.each<{
      roleName: RoleName;
      players: CreateGamePlayerDto[];
      expected: number;
      test: string;
    }>([
      {
        roleName: "seer",
        players: [createFakeCreateGamePlayerDto({ role: { name: "seer" } })],
        expected: 0,
        test: "should return 0 when role min is reached in createGameDto.",
      },
      {
        roleName: "seer",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "seer" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: 0,
        test: "should return 0 when role min is reached with one more in createGameDto.",
      },
      {
        roleName: "villager",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: 0,
        test: "should return 0 when role min is reached in createGameDto.",
      },
      {
        roleName: "villager",
        players: [createFakeCreateGamePlayerDto({ role: { name: "villager" } })],
        expected: 1,
        test: "should return 1 when role min is not reached in createGameDto.",
      },
      {
        roleName: "elder",
        players: [
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
          createFakeCreateGamePlayerDto({ role: { name: "villager" } }),
        ],
        expected: 0,
        test: "should return 0 when role not in roles.",
      },
    ])(`$test`, ({ roleName, players, expected }) => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.players = players;

      expect(createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto(roleName)).toBe(expected);
    });
  });

  describe("setAdditionalCardsForRecipientInCreateGameDto", () => {
    it("should set additional cards for recipient in createGameDto when additional cards are not set yet.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const additionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "villager",
        }),
      ];
      createGameDtoStore.setAdditionalCardsForRecipientInCreateGameDto(additionalCards, "thief");

      expect(createGameDtoStore.createGameDto.additionalCards).toStrictEqual<CreateGameAdditionalCardDto[]>(additionalCards);
    });

    it("should add additional cards for recipient in createGameDto when additional cards are set.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const additionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "seer",
        }),
      ];
      createGameDtoStore.createGameDto.additionalCards = additionalCards;
      const newAdditionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "villager",
        }),
      ];
      const expectedAdditionalCards = [
        additionalCards[1],
        additionalCards[2],
        newAdditionalCards[0],
      ];

      createGameDtoStore.setAdditionalCardsForRecipientInCreateGameDto(newAdditionalCards, "thief");

      expect(createGameDtoStore.createGameDto.additionalCards).toStrictEqual<CreateGameAdditionalCardDto[]>(expectedAdditionalCards);
    });
  });

  describe("getAdditionalCardsForRecipientInCreateGameDto", () => {
    it("should return additional cards for recipient in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const additionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "villager",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "seer",
        }),
      ];
      createGameDtoStore.createGameDto.additionalCards = additionalCards;
      const expectedAdditionalCards = [
        additionalCards[0],
        additionalCards[1],
      ];

      const result = createGameDtoStore.getAdditionalCardsForRecipientInCreateGameDto("thief");

      expect(result).toStrictEqual<CreateGameAdditionalCardDto[]>(expectedAdditionalCards);
    });

    it("should return an empty array when additional cards are not set.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const result = createGameDtoStore.getAdditionalCardsForRecipientInCreateGameDto("thief");

      expect(result).toStrictEqual<CreateGameAdditionalCardDto[]>([]);
    });
  });

  describe("getAdditionalCardsWithRoleNameInCreateGameDto", () => {
    it("should return additional cards with role name in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const additionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "villager",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "seer",
        }),
      ];
      createGameDtoStore.createGameDto.additionalCards = additionalCards;
      const expectedAdditionalCards = [
        additionalCards[0],
        additionalCards[2],
      ];

      const result = createGameDtoStore.getAdditionalCardsWithRoleNameInCreateGameDto("werewolf");

      expect(result).toStrictEqual<CreateGameAdditionalCardDto[]>(expectedAdditionalCards);
    });

    it("should return an empty array when additional cards are not set.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const result = createGameDtoStore.getAdditionalCardsWithRoleNameInCreateGameDto("werewolf");

      expect(result).toStrictEqual<CreateGameAdditionalCardDto[]>([]);
    });
  });

  describe("getPlayersInGroupInCreateGameDto", () => {
    it("should return players in group in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ group: "group1" }),
        createFakeCreateGamePlayerDto({ group: "group1" }),
        createFakeCreateGamePlayerDto({ group: "group2" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      const expectedPlayers = [players[0], players[1]];

      const result = createGameDtoStore.getPlayersInGroupInCreateGameDto("group1");

      expect(result).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("removeGroupFromPlayersInCreateGameDto", () => {
    it("should remove group from all players in createGameDto when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({ group: "group1" }),
        createFakeCreateGamePlayerDto({ group: "group1" }),
        createFakeCreateGamePlayerDto({ group: "group2" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      const expectedPlayers = [
        createFakeCreateGamePlayerDto({
          ...players[0],
          group: undefined,
        }),
        createFakeCreateGamePlayerDto({
          ...players[1],
          group: undefined,
        }),
        createFakeCreateGamePlayerDto({
          ...players[2],
          group: undefined,
        }),
      ];

      createGameDtoStore.removeGroupFromPlayersInCreateGameDto();

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });

  describe("sanitizeCreateGameDtoForGameCreation", () => {
    it("should remove obsolete additional cards when called.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const additionalCards = [
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "werewolf",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "thief",
          roleName: "seer",
        }),
        createFakeCreateGameAdditionalCardDto({
          recipient: "actor",
          roleName: "seer",
        }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [createFakeCreateGamePlayerDto({ role: { name: "actor" } })],
        additionalCards,
      });
      const expectedAdditionalCards = [additionalCards[2]];
      createGameDtoStore.sanitizeCreateGameDtoForGameCreation();

      expect(createGameDtoStore.createGameDto.additionalCards).toStrictEqual<CreateGameAdditionalCardDto[]>(expectedAdditionalCards);
    });

    it("should not remove player groups when prejudiced manipulator is in the game.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({
          group: "group1",
          role: { name: "prejudiced-manipulator" },
        }),
        createFakeCreateGamePlayerDto({ group: "group1" }),
        createFakeCreateGamePlayerDto({ group: "group2" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      createGameDtoStore.sanitizeCreateGameDtoForGameCreation();

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(players);
    });

    it("should remove player groups when prejudiced manipulator is not in the game.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const players = [
        createFakeCreateGamePlayerDto({
          group: "group1",
          role: { name: "villager" },
        }),
        createFakeCreateGamePlayerDto({ group: "group1" }),
        createFakeCreateGamePlayerDto({ group: "group2" }),
      ];
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players,
      });
      createGameDtoStore.sanitizeCreateGameDtoForGameCreation();
      const expectedPlayers = [
        createFakeCreateGamePlayerDto({
          ...players[0],
          group: undefined,
        }),
        createFakeCreateGamePlayerDto({
          ...players[1],
          group: undefined,
        }),
        createFakeCreateGamePlayerDto({
          ...players[2],
          group: undefined,
        }),
      ];

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(expectedPlayers);
    });
  });
});