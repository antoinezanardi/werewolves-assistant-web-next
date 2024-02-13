import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { createFakeCreateGamePlayerRoleDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerSideDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-side/create-game-player-side.dto.factory";

describe("Create Game Player Dto", () => {
  describe("create", () => {
    it("should create a game player dto when called.", () => {
      const expectedRole = createFakeCreateGamePlayerRoleDto({ name: RoleNames.WEREWOLF });
      const expectedSide = createFakeCreateGamePlayerSideDto();
      const createGamePlayerDto = CreateGamePlayerDto.create({
        name: "Player 1",
        role: expectedRole,
        side: {},
        extra: "Extra",
      } as CreateGamePlayerDto);
      const expectedCreateGamePlayerDto = new CreateGamePlayerDto();
      expectedCreateGamePlayerDto.name = "Player 1";
      expectedCreateGamePlayerDto.role = expectedRole;
      expectedCreateGamePlayerDto.side = expectedSide;

      expect(createGamePlayerDto).toStrictEqual<CreateGamePlayerDto>(expectedCreateGamePlayerDto);
    });
  });
});