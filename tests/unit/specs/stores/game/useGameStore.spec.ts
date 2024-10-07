import { createPinia, setActivePinia } from "pinia";

import { createFakeMakeGamePlayDto } from "@tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play.dto.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeUseFetchGames } from "@tests/unit/utils/factories/composables/api/game/useFetchGames.factory";
import { Game } from "~/composables/api/game/types/game.class";
import { useGameStore } from "~/stores/game/useGameStore";

const hoistedMocks = vi.hoisted(() => ({
  useGameEventsStore: {
    resetGameEventIndex: vi.fn(),
  },
  useFetchGames: {
    getGame: vi.fn(),
    cancelGame: vi.fn(),
    makeGamePlay: vi.fn(),
  },
}));

vi.mock("~/stores/game/game-event/useGameEventsStore", () => ({
  useGameEventsStore: (): typeof hoistedMocks.useGameEventsStore => hoistedMocks.useGameEventsStore,
}));

vi.mock("~/composables/api/game/useFetchGames", () => ({
  useFetchGames: (): typeof hoistedMocks.useFetchGames => hoistedMocks.useFetchGames,
}));

describe("Game Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    hoistedMocks.useGameEventsStore = {
      resetGameEventIndex: vi.fn(),
    };
    hoistedMocks.useFetchGames = createFakeUseFetchGames();
  });

  it("should have initial state when created.", () => {
    const gameStore = useGameStore();
    const expectedGame = new Game();

    expect(gameStore.game).toStrictEqual<Game>(expectedGame);
    expect(gameStore.fetchingGameStatus).toBe("idle");
  });

  it("should have empty player groups when there is no player groups in game.", () => {
    const gameStore = useGameStore();

    expect(gameStore.gamePlayerGroups).toStrictEqual<string[]>([]);
  });

  it("should have player groups when there is player groups in game.", () => {
    const gameStore = useGameStore();
    gameStore.game.playerGroups = ["group1", "group2"];

    expect(gameStore.gamePlayerGroups).toStrictEqual<string[]>(["group1", "group2"]);
  });

  describe("resetGame", () => {
    it("should reset game when called.", () => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame();
      gameStore.resetGame();

      expect(gameStore.game).toStrictEqual<Game>(new Game());
    });
  });

  describe("fetchAndSetGame", () => {
    it("should fetch game when called.", async() => {
      const gameStore = useGameStore();
      await gameStore.fetchAndSetGame("gameId");

      expect(hoistedMocks.useFetchGames.getGame).toHaveBeenCalledExactlyOnceWith("gameId");
    });

    it("should reset game current event index when called.", async() => {
      const game = createFakeGame();
      hoistedMocks.useFetchGames.getGame.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.fetchAndSetGame("gameId");

      expect(hoistedMocks.useGameEventsStore.resetGameEventIndex).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set game when called.", async() => {
      const game = createFakeGame();
      hoistedMocks.useFetchGames.getGame.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.fetchAndSetGame("gameId");

      expect(gameStore.game).toStrictEqual<Game>(game);
    });
  });

  describe("cancelGame", () => {
    it("should cancel game when called.", async() => {
      const gameStore = useGameStore();
      gameStore.game._id = "gameId";
      await gameStore.cancelGame();

      expect(hoistedMocks.useFetchGames.cancelGame).toHaveBeenCalledExactlyOnceWith("gameId");
    });

    it("should set game when called.", async() => {
      const game = createFakeGame();
      hoistedMocks.useFetchGames.cancelGame.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.cancelGame();

      expect(gameStore.game).toStrictEqual<Game>(game);
    });
  });

  describe("makeGamePlay", () => {
    it("should make game play when called.", async() => {
      const gameStore = useGameStore();
      gameStore.game._id = "gameId";
      const makeGamePlayDto = createFakeMakeGamePlayDto();
      await gameStore.makeGamePlay(makeGamePlayDto);

      expect(hoistedMocks.useFetchGames.makeGamePlay).toHaveBeenCalledExactlyOnceWith("gameId", makeGamePlayDto);
    });

    it("should reset game event indes when called.", async() => {
      const game = createFakeGame();
      const makeGamePlayDto = createFakeMakeGamePlayDto();
      hoistedMocks.useFetchGames.makeGamePlay.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.makeGamePlay(makeGamePlayDto);

      expect(hoistedMocks.useGameEventsStore.resetGameEventIndex).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set game when called.", async() => {
      const game = createFakeGame();
      const makeGamePlayDto = createFakeMakeGamePlayDto();
      hoistedMocks.useFetchGames.makeGamePlay.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.makeGamePlay(makeGamePlayDto);

      expect(gameStore.game).toStrictEqual<Game>(game);
    });
  });

  describe("skipGamePlay", () => {
    it("should skip game play when called.", async() => {
      const gameStore = useGameStore();
      gameStore.game._id = "gameId";
      await gameStore.skipGamePlay();
      const emptyMakeGamePlayDto = createFakeMakeGamePlayDto();

      expect(hoistedMocks.useFetchGames.makeGamePlay).toHaveBeenCalledExactlyOnceWith("gameId", emptyMakeGamePlayDto);
    });
  });
});