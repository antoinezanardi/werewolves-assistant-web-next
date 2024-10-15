import { createFakeGameHistoryRecordPlaySource } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameOverHistoryRecordSourceProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/game-over-history-record-source.types";
import GameOverHistoryRecordSource from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/GameOverHistoryRecordSource.vue";
import type PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";

describe("Game Over History Record Source Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordSource>>;
  const defaultSourcePlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Olivia" }),
    createFakeActorAlivePlayer({ name: "Thomas" }),
    createFakeActorAlivePlayer({ name: "Doudou" }),
  ];
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      type: "vote",
      action: "vote",
      source: createFakeGameHistoryRecordPlaySource({
        name: "survivors",
        players: defaultSourcePlayers,
      }),
    }),
  });
  const defaultProps: GameOverHistoryRecordSourceProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordSourceComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordSource> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordSource>>> {
    return mountSuspendedComponent(GameOverHistoryRecordSource, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordSourceComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Source Name", () => {
    it("should display source name when rendered.", () => {
      const sourceName = wrapper.find<HTMLHeadElement>("#game-over-history-record-source-name");

      expect(sourceName.text()).toBe("shared.game.player.group.definiteName.survivors, 4");
    });
  });

  describe("Source Players", () => {
    it("should pass source players to horizontal list when rendered.", () => {
      const horizontalList = wrapper.findComponent<typeof PlayersHorizontalList>("#game-over-history-record-source-horizontal-list");

      expect(horizontalList.props("players")).toStrictEqual<Player[]>(defaultSourcePlayers);
    });
  });
});