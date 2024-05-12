import type { GameSource } from "~/composables/api/game/types/game.types";
import { useGameSourceName } from "~/composables/api/game/useGameSource";

describe("Use Game Source Composable", () => {
  describe("getDefiniteGameSourceNameLabel", () => {
    it.each<{
      gameSource: GameSource;
      count: number;
      expectedLabel: string;
      test: string;
    }>([
      {
        gameSource: "sheriff",
        count: 1,
        expectedLabel: "shared.game.player.attribute.definiteName.sheriff, 1",
        test: "should translate game source when called with sheriff and count 1.",
      },
      {
        gameSource: "werewolves",
        count: 1,
        expectedLabel: "shared.game.player.group.definiteName.werewolves, 1",
        test: "should translate game source when called with werewolves and count 1.",
      },
      {
        gameSource: "villagers",
        count: 1,
        expectedLabel: "shared.game.player.group.definiteName.villagers, 1",
        test: "should translate game source when called with villagers and count 1.",
      },
      {
        gameSource: "werewolf",
        count: 1,
        expectedLabel: "shared.role.definiteName.werewolf, 1",
        test: "should translate definite role name when called with werewolf and count 1.",
      },
    ])("$test", ({ gameSource, count, expectedLabel }) => {
      expect(useGameSourceName().getDefiniteGameSourceNameLabel(gameSource, count)).toBe(expectedLabel);
    });
  });
});