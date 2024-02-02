import { defineStore } from "pinia";
import { ref } from "vue";

import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import { StoreIds } from "~/stores/enums/store.enum";

const useCreateGameDtoStore = defineStore(StoreIds.CREATE_GAME_DTO, () => {
  const createGameDto = ref<CreateGameDto>(CreateGameDto.create({ players: [] }));

  function setCreateGameDto(createGameDtoValue: CreateGameDto): void {
    createGameDto.value = CreateGameDto.create(createGameDtoValue);
  }

  function addPlayerToCreateGameDto(player: CreateGamePlayerDto): void {
    createGameDto.value.players.push(CreateGamePlayerDto.create(player));
  }

  function removePlayerFromCreateGameDto(playerName: string): void {
    const playerIndex = createGameDto.value.players.findIndex(player => player.name === playerName);
    if (playerIndex !== -1) {
      createGameDto.value.players = createGameDto.value.players.toSpliced(playerIndex, 1);
    }
  }
  return {
    createGameDto,
    setCreateGameDto,
    addPlayerToCreateGameDto,
    removePlayerFromCreateGameDto,
  };
});

export { useCreateGameDtoStore };