import type { Mock } from "vitest";

type MockedVueLottie = {
  play: Mock;
  setDirection: Mock;
  playSegments: Mock;
};

function createFakeVueLottie(): MockedVueLottie {
  return {
    play: vi.fn(),
    setDirection: vi.fn(),
    playSegments: vi.fn(),
  };
}

export { createFakeVueLottie };