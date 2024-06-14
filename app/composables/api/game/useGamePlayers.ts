import type { ComputedRef, Ref } from "vue";
import type { Game } from "~/composables/api/game/types/game.class";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseGamePlayers = {
  sheriffInPlayers: ComputedRef<Player | undefined>;
};

function useGamePlayers(game: Ref<Game>): UseGamePlayers {
  const sheriffInPlayers = computed<Player | undefined>(() => game.value.players.find(({ attributes }) => attributes.some(({ name }) => name === "sheriff")));

  return { sheriffInPlayers };
}

export { useGamePlayers };