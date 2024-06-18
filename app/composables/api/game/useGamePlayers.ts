import type { ComputedRef, Ref } from "vue";
import type { Game } from "~/composables/api/game/types/game.class";
import type { Player } from "~/composables/api/game/types/players/player.class";
import type { RoleName } from "~/composables/api/role/types/role.types";

type UseGamePlayers = {
  sheriffInPlayers: ComputedRef<Player | undefined>;
  getPlayersWithCurrentRole: (role: RoleName) => Player[];
};

function useGamePlayers(game: Ref<Game>): UseGamePlayers {
  const sheriffInPlayers = computed<Player | undefined>(() => game.value.players.find(({ attributes }) => attributes.some(({ name }) => name === "sheriff")));

  // TODO: to test
  function getPlayersWithCurrentRole(role: RoleName): Player[] {
    return game.value.players.filter(player => player.role.current === role);
  }
  return {
    getPlayersWithCurrentRole,
    sheriffInPlayers,
  };
}

export { useGamePlayers };