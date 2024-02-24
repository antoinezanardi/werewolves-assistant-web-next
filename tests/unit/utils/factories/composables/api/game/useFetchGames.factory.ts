import type { Mock } from "vitest";

type MockedUseFetchGames = {
  createGame: Mock;
  getGame: Mock;
  cancelGame: Mock;
  makeGamePlay: Mock;
};

function createFakeUseFetchGames(): MockedUseFetchGames {
  return {
    createGame: vi.fn(),
    getGame: vi.fn(),
    cancelGame: vi.fn(),
    makeGamePlay: vi.fn(),
  };
}

export { createFakeUseFetchGames };