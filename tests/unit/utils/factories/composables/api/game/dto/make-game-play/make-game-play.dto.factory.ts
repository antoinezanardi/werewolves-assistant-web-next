import { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";

function createFakeMakeGamePlayDto(makeGamePlayDto: Partial<MakeGamePlayDto> = {}): MakeGamePlayDto {
  return MakeGamePlayDto.create({
    targets: makeGamePlayDto.targets ?? [],
    votes: makeGamePlayDto.votes ?? [],
    doesJudgeRequestAnotherVote: makeGamePlayDto.doesJudgeRequestAnotherVote ?? undefined,
    chosenCardId: makeGamePlayDto.chosenCardId ?? undefined,
    chosenSide: makeGamePlayDto.chosenSide ?? undefined,
  });
}

export { createFakeMakeGamePlayDto };