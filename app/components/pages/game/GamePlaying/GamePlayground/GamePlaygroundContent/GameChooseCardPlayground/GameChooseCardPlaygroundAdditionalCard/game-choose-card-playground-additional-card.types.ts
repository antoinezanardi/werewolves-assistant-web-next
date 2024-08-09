import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";

type GameChooseCardPlaygroundAdditionalCardProps = {
  additionalCard: GameAdditionalCard;
};

type GameChooseCardPlaygroundAdditionalCardEmits = {
  clickAdditionalCard: [GameAdditionalCard];
};

export type {
  GameChooseCardPlaygroundAdditionalCardProps,
  GameChooseCardPlaygroundAdditionalCardEmits,
};