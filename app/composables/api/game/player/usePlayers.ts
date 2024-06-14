import type { Player } from "~/composables/api/game/types/players/player.class";

type UsePlayers = {
  getPlayersNamesText: (players: Player[]) => string;
};

function usePlayers(): UsePlayers {
  const { t } = useI18n();

  function getPlayersNamesText(players: Player[]): string {
    return players.reduce<string>((acc, player, index) => {
      if (index === 0) {
        return player.name;
      }
      if (index === players.length - 1) {
        return `${acc} ${t("shared.and")} ${player.name}`;
      }
      return `${acc}, ${player.name}`;
    }, "");
  }
  return { getPlayersNamesText };
}

export { usePlayers };