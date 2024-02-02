import type { GamePhase, GameStatus } from "~/composables/api/game/types/game.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

class Game {
  public _id: string;

  public turn: number;

  public phase: GamePhase;

  public tick: number;

  public status: GameStatus;

  public players: Player[];

  public createdAt: Date;

  public updatedAt: Date;
}

export type { Game };