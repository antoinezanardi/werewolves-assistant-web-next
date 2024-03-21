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

  function resetCreateGameDto(): void {
    createGameDto.value = CreateGameDto.create({ players: [] });
  }

  function addPlayerToCreateGameDto(player: CreateGamePlayerDto): void {
    createGameDto.value.players.push(CreateGamePlayerDto.create(player));
  }

  function updatePlayerInCreateGameDto(player: CreateGamePlayerDto): void {
    const playerIndex = createGameDto.value.players.findIndex(({ name }) => name === player.name);
    if (playerIndex !== -1) {
      createGameDto.value.players.splice(playerIndex, 1, CreateGamePlayerDto.create(player));
    }
  }

  function setPlayersToCreateGameDto(players: CreateGamePlayerDto[]): void {
    createGameDto.value.players = players.map(player => CreateGamePlayerDto.create(player));
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
    resetCreateGameDto,
    addPlayerToCreateGameDto,
    updatePlayerInCreateGameDto,
    setPlayersToCreateGameDto,
    removePlayerFromCreateGameDto,
  };
});

export { useCreateGameDtoStore };