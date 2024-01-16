import { RoleNames } from "~/composables/api/role/enums/role.enums";

const GAME_ADDITIONAL_CARDS_RECIPIENTS = [RoleNames.THIEF, RoleNames.ACTOR] as const satisfies Readonly<(RoleNames)[]>;

export { GAME_ADDITIONAL_CARDS_RECIPIENTS };