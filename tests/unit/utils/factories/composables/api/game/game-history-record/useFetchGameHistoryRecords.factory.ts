import type { Mock } from "vitest";

type MockedUseFetchGameHistoryRecords = {
  getGameHistoryRecords: Mock;
};

function createFakeUseFetchGameHistoryRecords(): MockedUseFetchGameHistoryRecords {
  return { getGameHistoryRecords: vi.fn() };
}

export { createFakeUseFetchGameHistoryRecords };