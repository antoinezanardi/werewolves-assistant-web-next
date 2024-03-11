import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";

describe("Create Game Additional Card Dto", () => {
  describe("create", () => {
    it("should create a game additional card dto when called.", () => {
      const createGameAdditionalCardDto = CreateGameAdditionalCardDto.create({
        roleName: "werewolf",
        recipient: "thief",
        extra: "Extra",
      } as CreateGameAdditionalCardDto);
      const expectedCreateGameAdditionalCardDto = new CreateGameAdditionalCardDto();
      expectedCreateGameAdditionalCardDto.roleName = "werewolf";
      expectedCreateGameAdditionalCardDto.recipient = "thief";

      expect(createGameAdditionalCardDto).toStrictEqual<CreateGameAdditionalCardDto>(expectedCreateGameAdditionalCardDto);
    });
  });
});