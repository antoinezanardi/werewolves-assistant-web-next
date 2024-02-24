import { createPinia, setActivePinia } from "pinia";

import { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import { RoleSides } from "~/composables/api/role/enums/role.enums";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { createFakeMakeGamePlayTargetDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto.factory";
import { createFakeMakeGamePlayVoteDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play-vote/make-game-play-vote.dto.factory";
import { createFakeMakeGamePlayDto } from "~/tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play.dto.factory";

describe("Make Game Play Dto Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
    const expectedMakeGamePlayDto = createFakeMakeGamePlayDto({});

    expect(makeGamePlayDtoStore.makeGamePlayDto).toStrictEqual<MakeGamePlayDto>(expectedMakeGamePlayDto);
  });

  describe("setMakeGamePlayDto", () => {
    it("should set makeGamePlayDto when called.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const expectedMakeGamePlayDto = createFakeMakeGamePlayDto({
        targets: [],
        votes: [],
        doesJudgeRequestAnotherVote: true,
        chosenCardId: "cardId",
        chosenSide: RoleSides.WEREWOLVES,
      });
      makeGamePlayDtoStore.setMakeGamePlayDto(expectedMakeGamePlayDto);

      expect(makeGamePlayDtoStore.makeGamePlayDto).toStrictEqual<MakeGamePlayDto>(expectedMakeGamePlayDto);
    });
  });

  describe("resetMakeGamePlayDto", () => {
    it("should reset make game play dto when called.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({
        targets: [],
        votes: [],
        doesJudgeRequestAnotherVote: true,
        chosenCardId: "cardId",
        chosenSide: RoleSides.WEREWOLVES,
      });
      const expectedMakeGamePlayDto = MakeGamePlayDto.create({});
      makeGamePlayDtoStore.resetMakeGamePlayDto();

      expect(makeGamePlayDtoStore.makeGamePlayDto).toStrictEqual<MakeGamePlayDto>(expectedMakeGamePlayDto);
    });
  });

  describe("addMakeGamePlayTargetDto", () => {
    it("should add target to makeGamePlayDto when targets are undefined.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      const target = createFakeMakeGamePlayTargetDto();
      makeGamePlayDtoStore.addMakeGamePlayTargetDto(target);

      expect(makeGamePlayDtoStore.makeGamePlayDto.targets).toStrictEqual<MakeGamePlayDto["targets"]>([target]);
    });

    it("should add target to makeGamePlayDto when targets are defined.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const targets = [createFakeMakeGamePlayTargetDto()];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ targets });
      const target = createFakeMakeGamePlayTargetDto();
      makeGamePlayDtoStore.addMakeGamePlayTargetDto(target);
      const expectedTargets = [...targets, target];

      expect(makeGamePlayDtoStore.makeGamePlayDto.targets).toStrictEqual<MakeGamePlayDto["targets"]>(expectedTargets);
    });
  });

  describe("removeMakeGamePlayTargetDto", () => {
    it("should not remove target from makeGamePlayDto when targets are undefined.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      makeGamePlayDtoStore.removeMakeGamePlayTargetDto("targetId");

      expect(makeGamePlayDtoStore.makeGamePlayDto.targets).toBeUndefined();
    });

    it("should not remove target from makeGamePlayDto when target does not exist.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const targets = [createFakeMakeGamePlayTargetDto({ playerId: "anotherTargetId" })];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ targets });
      makeGamePlayDtoStore.removeMakeGamePlayTargetDto("targetId");

      expect(makeGamePlayDtoStore.makeGamePlayDto.targets).toStrictEqual<MakeGamePlayDto["targets"]>(targets);
    });

    it("should remove target from makeGamePlayDto when target exists.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const targets = [
        createFakeMakeGamePlayTargetDto(),
        createFakeMakeGamePlayTargetDto(),
        createFakeMakeGamePlayTargetDto(),
      ];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ targets });
      makeGamePlayDtoStore.removeMakeGamePlayTargetDto(targets[1].playerId);
      const expectedTargets = [targets[0], targets[2]];

      expect(makeGamePlayDtoStore.makeGamePlayDto.targets).toStrictEqual<MakeGamePlayDto["targets"]>(expectedTargets);
    });

    it("should remove target from makeGamePlayDto when target exists and set it as undefined because there is no targets left.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const target = createFakeMakeGamePlayTargetDto();
      const targets = [target];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ targets });
      makeGamePlayDtoStore.removeMakeGamePlayTargetDto(target.playerId);

      expect(makeGamePlayDtoStore.makeGamePlayDto.targets).toBeUndefined();
    });
  });

  describe("addMakeGamePlayVoteDto", () => {
    it("should add vote to makeGamePlayDto when votes are undefined.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      const vote = createFakeMakeGamePlayVoteDto();
      makeGamePlayDtoStore.addMakeGamePlayVoteDto(vote);

      expect(makeGamePlayDtoStore.makeGamePlayDto.votes).toStrictEqual<MakeGamePlayDto["votes"]>([vote]);
    });

    it("should add vote to makeGamePlayDto when votes are defined.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const votes = [createFakeMakeGamePlayVoteDto()];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ votes });
      const vote = createFakeMakeGamePlayVoteDto();
      makeGamePlayDtoStore.addMakeGamePlayVoteDto(vote);
      const expectedVotes = [...votes, vote];

      expect(makeGamePlayDtoStore.makeGamePlayDto.votes).toStrictEqual<MakeGamePlayDto["votes"]>(expectedVotes);
    });
  });

  describe("removeMakeGamePlayVoteDto", () => {
    it("should not remove vote from makeGamePlayDto when votes are undefined.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      makeGamePlayDtoStore.removeMakeGamePlayVoteDto("sourceId");

      expect(makeGamePlayDtoStore.makeGamePlayDto.votes).toBeUndefined();
    });

    it("should not remove vote from makeGamePlayDto when vote does not exist.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const votes = [createFakeMakeGamePlayVoteDto({ sourceId: "anotherSourceId" })];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ votes });
      makeGamePlayDtoStore.removeMakeGamePlayVoteDto("sourceId");

      expect(makeGamePlayDtoStore.makeGamePlayDto.votes).toStrictEqual<MakeGamePlayDto["votes"]>(votes);
    });

    it("should remove vote from makeGamePlayDto when vote exists.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const votes = [
        createFakeMakeGamePlayVoteDto(),
        createFakeMakeGamePlayVoteDto(),
        createFakeMakeGamePlayVoteDto(),
      ];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ votes });
      makeGamePlayDtoStore.removeMakeGamePlayVoteDto(votes[1].sourceId);
      const expectedVotes = [votes[0], votes[2]];

      expect(makeGamePlayDtoStore.makeGamePlayDto.votes).toStrictEqual<MakeGamePlayDto["votes"]>(expectedVotes);
    });

    it("should remove vote from makeGamePlayDto when vote exists and set it as undefined because there is no votes left.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const vote = createFakeMakeGamePlayVoteDto();
      const votes = [vote];
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({ votes });
      makeGamePlayDtoStore.removeMakeGamePlayVoteDto(vote.sourceId);

      expect(makeGamePlayDtoStore.makeGamePlayDto.votes).toBeUndefined();
    });
  });

  describe("setDoesJudgeRequestAnotherVote", () => {
    it("should set doesJudgeRequestAnotherVote when called.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      makeGamePlayDtoStore.setDoesJudgeRequestAnotherVote(true);

      expect(makeGamePlayDtoStore.makeGamePlayDto.doesJudgeRequestAnotherVote).toBeTruthy();
    });
  });

  describe("setChosenCardId", () => {
    it("should set chosenCardId when called.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      makeGamePlayDtoStore.setChosenCardId("cardId");

      expect(makeGamePlayDtoStore.makeGamePlayDto.chosenCardId).toBe("cardId");
    });
  });

  describe("setChosenSide", () => {
    it("should set chosenSide when called.", () => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto = createFakeMakeGamePlayDto({});
      makeGamePlayDtoStore.setChosenSide(RoleSides.WEREWOLVES);

      expect(makeGamePlayDtoStore.makeGamePlayDto.chosenSide).toBe(RoleSides.WEREWOLVES);
    });
  });
});