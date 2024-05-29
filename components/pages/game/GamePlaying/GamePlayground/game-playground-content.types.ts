import type GameBuryDeadBodiesPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameBuryDeadBodiesPlayground/GameBuryDeadBodiesPlayground.vue";
import type GameChooseCardPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlayground.vue";
import type GameChooseSidePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseSidePlayground/GameChooseSidePlayground.vue";
import type GameNoActionPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameNoActionPlayground/GameNoActionPlayground.vue";
import type GameRequestAnotherVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameRequestAnotherVotePlayground/GameRequestAnotherVotePlayground.vue";
import type GameTargetPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameTargetPlayground/GameTargetPlayground.vue";
import type GameUsePotionsPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameUsePotionsPlayground/GameUsePotionsPlayground.vue";
import type GameVotePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameVotePlayground/GameVotePlayground.vue";

type GamePlaygroundTypeComponent =
  | typeof GameBuryDeadBodiesPlayground
  | typeof GameChooseCardPlayground
  | typeof GameChooseSidePlayground
  | typeof GameNoActionPlayground
  | typeof GameRequestAnotherVotePlayground
  | typeof GameTargetPlayground
  | typeof GameUsePotionsPlayground
  | typeof GameVotePlayground;

export type { GamePlaygroundTypeComponent };