import { createFakeAccursedWolfFatherAlivePlayer, createFakeVillagerVillagerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { useGamePlayers } from "~/composables/api/game/useGamePlayers";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeProtectedByDefenderPlayerAttribute, createFakeSheriffBySheriffPlayerAttribute } from "@tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";

describe("Use Game Players Composable", () => {
  describe("sheriffInPlayers", () => {
    it("should return sheriff player when sheriff is in players.", () => {
      const game = createFakeGame({
        players: [
          createFakePlayer(),
          createFakePlayer({ attributes: [createFakeSheriffBySheriffPlayerAttribute()] }),
          createFakePlayer({ attributes: [createFakeProtectedByDefenderPlayerAttribute()] }),
        ],
      });
      const { sheriffInPlayers } = useGamePlayers(ref(game));

      expect(sheriffInPlayers.value).toStrictEqual<Player>(game.players[1]);
    });

    it("should return undefined when sheriff is not in players.", () => {
      const game = createFakeGame({
        players: [
          createFakePlayer(),
          createFakePlayer({ attributes: [createFakeProtectedByDefenderPlayerAttribute()] }),
        ],
      });
      const { sheriffInPlayers } = useGamePlayers(ref(game));

      expect(sheriffInPlayers.value).toBeUndefined();
    });
  });

  describe("getPlayersWithCurrentRole", () => {
    it("should return players with current role when called.", () => {
      const game = createFakeGame({
        players: [
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeVillagerVillagerAlivePlayer(),
          createFakeVillagerVillagerAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
        ],
      });
      const { getPlayersWithCurrentRole } = useGamePlayers(ref(game));

      expect(getPlayersWithCurrentRole("villager-villager")).toStrictEqual<Player[]>([game.players[1], game.players[2]]);
    });

    it("should return empty array when no player with current role.", () => {
      const game = createFakeGame({
        players: [
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
        ],
      });
      const { getPlayersWithCurrentRole } = useGamePlayers(ref(game));

      expect(getPlayersWithCurrentRole("villager-villager")).toStrictEqual<Player[]>([]);
    });
  });
});