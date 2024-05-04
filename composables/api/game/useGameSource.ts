import { PLAYER_GROUPS } from "~/composables/api/game/constants/player/player.constants";
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerGroup } from "~/composables/api/game/types/players/player.types";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { useRoleName } from "~/composables/api/role/useRoleName";

type UseGameSourceName = {
  getDefiniteGameSourceNameLabel: (gameSource: GameSource, count: number) => string;
};

function useGameSourceName(): UseGameSourceName {
  const { t } = useI18n();
  const { getDefiniteRoleNameLabel } = useRoleName();

  function getDefiniteGameSourceNameLabel(gameSource: GameSource, count: number): string {
    if (gameSource === "sheriff") {
      return t(`shared.game.player.attribute.definiteName.sheriff`, count);
    }
    if (PLAYER_GROUPS.includes(gameSource as PlayerGroup)) {
      return t(`shared.game.player.group.definiteName.${gameSource}`, count);
    }
    return getDefiniteRoleNameLabel(gameSource as RoleName, count);
  }
  return { getDefiniteGameSourceNameLabel };
}

export { useGameSourceName };