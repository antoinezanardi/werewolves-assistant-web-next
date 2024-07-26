import type { GameTurnStartsEventTypeComponent } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/game-turn-starts-event.types";
import GameAccursedWolfFatherTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameAccursedWolfFatherTurnStartsEvent/GameAccursedWolfFatherTurnStartsEvent.vue";
import GameActorTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameActorTurnStartsEvent/GameActorTurnStartsEvent.vue";
import GameBigBadWolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameBigBadWolfTurnStartsEvent/GameBigBadWolfTurnStartsEvent.vue";
import GameCharmedTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameCharmedTurnStartsEvent/GameCharmedTurnStartsEvent.vue";
import GameCupidTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameCupidTurnStartsEvent/GameCupidTurnStartsEvent.vue";
import GameDefenderTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameDefenderTurnStartsEvent/GameDefenderTurnStartsEvent.vue";
import GameFoxTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameFoxTurnStartsEvent/GameFoxTurnStartsEvent.vue";
import GameHunterTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameHunterTurnStartsEvent/GameHunterTurnStartsEvent.vue";
import GameLoversTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameLoversTurnStartsEvent/GameLoversTurnStartsEvent.vue";
import GamePiedPiperTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GamePiedPiperTurnStartsEvent/GamePiedPiperTurnStartsEvent.vue";
import GameScandalmongerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameScandalmongerTurnStartsEvent/GameScandalmongerTurnStartsEvent.vue";
import GameScapegoatTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameScapegoatTurnStartsEvent/GameScapegoatTurnStartsEvent.vue";
import GameSeerTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSeerTurnStartsEvent/GameSeerTurnStartsEvent.vue";
import GameSheriffTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSheriffTurnStartsEvent/GameSheriffTurnStartsEvent.vue";
import GameStutteringJudgeTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameStutteringJudgeTurnStartsEvent/GameStutteringJudgeTurnStartsEvent.vue";
import GameSurvivorsTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameSurvivorsTurnStartsEvent/GameSurvivorsTurnStartsEvent.vue";
import GameThiefTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameThiefTurnStartsEvent/GameThiefTurnStartsEvent.vue";
import GameThreeBrothersTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameThreeBrothersTurnStartsEvent/GameThreeBrothersTurnStartsEvent.vue";
import GameTwoSistersTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTwoSistersTurnStartsEvent/GameTwoSistersTurnStartsEvent.vue";
import GameWerewolvesTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWerewolvesTurnStartsEvent/GameWerewolvesTurnStartsEvent.vue";
import GameWhiteWerewolfTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWhiteWerewolfTurnStartsEvent/GameWhiteWerewolfTurnStartsEvent.vue";
import GameWildChildTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWildChildTurnStartsEvent/GameWildChildTurnStartsEvent.vue";
import GameWitchTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWitchTurnStartsEvent/GameWitchTurnStartsEvent.vue";
import GameWolfHoundTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameWolfHoundTurnStartsEvent/GameWolfHoundTurnStartsEvent.vue";
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";

const GAME_PLAY_SOURCE_NAME_TURN_STARTS_EVENT_COMPONENTS: Record<GamePlaySourceName, GameTurnStartsEventTypeComponent> = {
  "accursed-wolf-father": GameAccursedWolfFatherTurnStartsEvent,
  "actor": GameActorTurnStartsEvent,
  "big-bad-wolf": GameBigBadWolfTurnStartsEvent,
  "charmed": GameCharmedTurnStartsEvent,
  "cupid": GameCupidTurnStartsEvent,
  "defender": GameDefenderTurnStartsEvent,
  "fox": GameFoxTurnStartsEvent,
  "hunter": GameHunterTurnStartsEvent,
  "lovers": GameLoversTurnStartsEvent,
  "pied-piper": GamePiedPiperTurnStartsEvent,
  "scandalmonger": GameScandalmongerTurnStartsEvent,
  "scapegoat": GameScapegoatTurnStartsEvent,
  "seer": GameSeerTurnStartsEvent,
  "sheriff": GameSheriffTurnStartsEvent,
  "stuttering-judge": GameStutteringJudgeTurnStartsEvent,
  "survivors": GameSurvivorsTurnStartsEvent,
  "thief": GameThiefTurnStartsEvent,
  "three-brothers": GameThreeBrothersTurnStartsEvent,
  "two-sisters": GameTwoSistersTurnStartsEvent,
  "werewolves": GameWerewolvesTurnStartsEvent,
  "white-werewolf": GameWhiteWerewolfTurnStartsEvent,
  "wild-child": GameWildChildTurnStartsEvent,
  "witch": GameWitchTurnStartsEvent,
  "wolf-hound": GameWolfHoundTurnStartsEvent,
};

export { GAME_PLAY_SOURCE_NAME_TURN_STARTS_EVENT_COMPONENTS };