import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { RoleNames } from "~/composables/api/role/enums/role.enums";

describe("Create Game Additional Card Dto", () => {
  describe("create", () => {
    it("should create a game additional card dto when called.", () => {
      const createGameAdditionalCardDto = CreateGameAdditionalCardDto.create({
        roleName: RoleNames.WEREWOLF,
        recipient: RoleNames.THIEF,
        extra: "Extra",
      } as CreateGameAdditionalCardDto);
      const expectedCreateGameAdditionalCardDto = new CreateGameAdditionalCardDto();
      expectedCreateGameAdditionalCardDto.roleName = RoleNames.WEREWOLF;
      expectedCreateGameAdditionalCardDto.recipient = RoleNames.THIEF;

      expect(createGameAdditionalCardDto).toStrictEqual<CreateGameAdditionalCardDto>(expectedCreateGameAdditionalCardDto);
    });
  });
});