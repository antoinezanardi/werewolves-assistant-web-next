import type { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";

type GameFeedbackSubmitterFooterProps = {
  createGameFeedbackDto: CreateGameFeedbackDto;
};

type GameFeedbackSubmitterFooterEmits = {
  closeDialog: [];
};

export type {
  GameFeedbackSubmitterFooterProps,
  GameFeedbackSubmitterFooterEmits,
};