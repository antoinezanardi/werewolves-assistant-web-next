import { defineStore } from "pinia";

import { MakeGamePlayTargetDto } from "~/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto";
import { MakeGamePlayVoteDto } from "~/composables/api/game/dto/make-game-play/make-game-play-vote/make-game-play-vote.dto";
import { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";
import type { RoleSide } from "~/composables/api/role/types/role.types";
import { StoreIds } from "~/stores/enums/store.enum";

const useMakeGamePlayDtoStore = defineStore(StoreIds.MAKE_GAME_PLAY_DTO, () => {
  const makeGamePlayDto = ref<MakeGamePlayDto>(MakeGamePlayDto.create({}));

  function setMakeGamePlayDto(makeGamePlayDtoValue: MakeGamePlayDto): void {
    makeGamePlayDto.value = MakeGamePlayDto.create(makeGamePlayDtoValue);
  }

  function resetMakeGamePlayDto(): void {
    makeGamePlayDto.value = MakeGamePlayDto.create({});
  }

  function addMakeGamePlayTargetDto(target: MakeGamePlayTargetDto): void {
    if (!makeGamePlayDto.value.targets) {
      makeGamePlayDto.value.targets = [];
    }
    makeGamePlayDto.value.targets.push(MakeGamePlayTargetDto.create(target));
  }

  function removeMakeGamePlayTargetDto(targetId: string): void {
    if (!makeGamePlayDto.value.targets) {
      return;
    }
    const targetIndex = makeGamePlayDto.value.targets.findIndex(target => target.playerId === targetId);
    if (targetIndex !== -1) {
      makeGamePlayDto.value.targets = makeGamePlayDto.value.targets.toSpliced(targetIndex, 1);
    }
    if (makeGamePlayDto.value.targets.length === 0) {
      makeGamePlayDto.value.targets = undefined;
    }
  }

  function removeFirstMakeGamePlayTargetDto(): void {
    if (!makeGamePlayDto.value.targets || makeGamePlayDto.value.targets.length === 0) {
      return;
    }
    const firstTarget = makeGamePlayDto.value.targets[0];
    removeMakeGamePlayTargetDto(firstTarget.playerId);
  }

  function removeFirstMakeGamePlayTargetDtoWithPotion(drankPotion: WitchPotion): void {
    const firstDrankPotionTarget = makeGamePlayDto.value.targets?.find(target => target.drankPotion === drankPotion);
    if (firstDrankPotionTarget) {
      removeMakeGamePlayTargetDto(firstDrankPotionTarget.playerId);
    }
  }

  function addMakeGamePlayVoteDto(vote: MakeGamePlayVoteDto): void {
    if (!makeGamePlayDto.value.votes) {
      makeGamePlayDto.value.votes = [];
    }
    makeGamePlayDto.value.votes.push(MakeGamePlayVoteDto.create(vote));
  }

  function removeMakeGamePlayVoteDto(sourceId: string): void {
    if (!makeGamePlayDto.value.votes) {
      return;
    }
    const voteIndex = makeGamePlayDto.value.votes.findIndex(vote => vote.sourceId === sourceId);
    if (voteIndex !== -1) {
      makeGamePlayDto.value.votes = makeGamePlayDto.value.votes.toSpliced(voteIndex, 1);
    }
    if (makeGamePlayDto.value.votes.length === 0) {
      makeGamePlayDto.value.votes = undefined;
    }
  }

  function setDoesJudgeRequestAnotherVote(doesJudgeRequestAnotherVote: boolean | undefined): void {
    makeGamePlayDto.value.doesJudgeRequestAnotherVote = doesJudgeRequestAnotherVote;
  }

  function setChosenCardId(chosenCardId: string | undefined): void {
    makeGamePlayDto.value.chosenCardId = chosenCardId;
  }

  function setChosenSide(chosenSide: RoleSide | undefined): void {
    makeGamePlayDto.value.chosenSide = chosenSide;
  }
  return {
    makeGamePlayDto,
    setMakeGamePlayDto,
    resetMakeGamePlayDto,
    addMakeGamePlayTargetDto,
    removeMakeGamePlayTargetDto,
    removeFirstMakeGamePlayTargetDto,
    removeFirstMakeGamePlayTargetDtoWithPotion,
    addMakeGamePlayVoteDto,
    removeMakeGamePlayVoteDto,
    setDoesJudgeRequestAnotherVote,
    setChosenCardId,
    setChosenSide,
  };
});

export { useMakeGamePlayDtoStore };