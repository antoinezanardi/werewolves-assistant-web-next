import { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import { createFakeGameEvent } from "~/tests/unit/utils/factories/stores/game/game-event/game-event.factory";

describe("Game Event class", () => {
  describe("create", () => {
    it("should create a game event when called.", () => {
      const gameEvent = createFakeGameEvent();
      const createdGameEvent = GameEvent.create(gameEvent);
      const expectedGameEvent = new GameEvent();
      expectedGameEvent.type = gameEvent.type;

      expect(createdGameEvent).toStrictEqual<GameEvent>(expectedGameEvent);
    });
  });
});