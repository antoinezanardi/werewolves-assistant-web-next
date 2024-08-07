import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";
import { GameEvent } from "~/composables/api/game/game-event/game-event.class";

describe("Game Event class", () => {
  describe("create", () => {
    it("should create a game event when called.", () => {
      const players = [
        createFakePlayer(),
        createFakePlayer(),
        createFakePlayer(),
      ];
      const gameEvent = createFakeGameEvent({ players });
      const createdGameEvent = GameEvent.create(gameEvent);
      const expectedGameEvent = new GameEvent();
      expectedGameEvent.type = gameEvent.type;
      expectedGameEvent.players = gameEvent.players;

      expect(createdGameEvent).toStrictEqual<GameEvent>(expectedGameEvent);
    });
  });
});