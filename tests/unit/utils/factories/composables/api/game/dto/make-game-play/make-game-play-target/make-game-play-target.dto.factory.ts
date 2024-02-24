import { faker } from "@faker-js/faker";

import { MakeGamePlayTargetDto } from "~/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto";

function createFakeMakeGamePlayTargetDto(makeGamePlayTargetDto: Partial<MakeGamePlayTargetDto> = {}): MakeGamePlayTargetDto {
  return MakeGamePlayTargetDto.create({
    playerId: makeGamePlayTargetDto.playerId ?? faker.string.uuid(),
    drankPotion: makeGamePlayTargetDto.drankPotion ?? undefined,
  });
}

export { createFakeMakeGamePlayTargetDto };