import type { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";

type RecipientRoleAdditionalCardsMultiSelectProps = {
  recipientRoleName: GameAdditionalCardRecipientRoleName;
};

type LabeledCreateGameAdditionalCardDto = CreateGameAdditionalCardDto & { label: string };

export type {
  RecipientRoleAdditionalCardsMultiSelectProps,
  LabeledCreateGameAdditionalCardDto,
};