import type { Mock } from "vitest";

type MockedUseFetchGames = {
  createGame: Mock;
  getGame: Mock;
  cancelGame: Mock;
  makeGamePlay: Mock;
  createGameFeedback: Mock;
};

function createFakeUseFetchGames(): MockedUseFetchGames {
  return {
    createGame: vi.fn(),
    getGame: vi.fn(),
    cancelGame: vi.fn(),
    makeGamePlay: vi.fn(),
    createGameFeedback: vi.fn(),
  };
}

export { createFakeUseFetchGames };