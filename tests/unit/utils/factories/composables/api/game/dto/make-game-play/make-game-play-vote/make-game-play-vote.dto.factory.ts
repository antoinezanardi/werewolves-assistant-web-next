import { faker } from "@faker-js/faker";

import { MakeGamePlayVoteDto } from "~/composables/api/game/dto/make-game-play/make-game-play-vote/make-game-play-vote.dto";

function createFakeMakeGamePlayVoteDto(makeGamePlayVoteDto: Partial<MakeGamePlayVoteDto> = {}): MakeGamePlayVoteDto {
  return MakeGamePlayVoteDto.create({
    sourceId: makeGamePlayVoteDto.sourceId ?? faker.string.uuid(),
    targetId: makeGamePlayVoteDto.targetId ?? faker.string.uuid(),
  });
}

export { createFakeMakeGamePlayVoteDto };