import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Tag from "primevue/tag";
import type Radash from "radash";
import { vi } from "vitest";
import type { GameOverHistoryRecordSourceProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/game-over-history-record-source.types";
import GameOverHistoryRecordSource from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordSource/GameOverHistoryRecordSource.vue";
import type PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { createFakeGameHistoryRecordPlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

const { radash: mockedRadash } = vi.hoisted(() => ({ radash: { shuffle: vi.fn() } }));

vi.mock("radash", async importOriginal => ({
  ...await importOriginal<typeof Radash>(),
  shuffle: vi.fn(mockedRadash.shuffle),
}));

describe("Game Over History Record Source Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordSource>>;
  const defaultSourcePlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Vanessa" }),
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
    mockedRadash.shuffle.mockReturnValue(defaultSourcePlayers);
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
    it("should display truncated players when there are more than 3 players in source.", () => {
      const sourcePlayerCards = wrapper.findAllComponents<typeof PlayerCard>(".game-over-history-record-source-player-card");

      expect(sourcePlayerCards).toHaveLength(3);
      expect(sourcePlayerCards[0].props("playerName")).toBe("Antoine");
      expect(sourcePlayerCards[1].props("playerName")).toBe("Vanessa");
      expect(sourcePlayerCards[2].props("playerName")).toBe("Thomas");
    });

    it("should display all players when there are less than 4 players in source.", async() => {
      mockedRadash.shuffle.mockReturnValue(defaultSourcePlayers.slice(0, 2));
      wrapper = await mountGameOverHistoryRecordSourceComponent();
      const sourcePlayerCards = wrapper.findAllComponents<typeof PlayerCard>(".game-over-history-record-source-player-card");

      expect(sourcePlayerCards).toHaveLength(2);
      expect(sourcePlayerCards[0].props("playerName")).toBe("Antoine");
      expect(sourcePlayerCards[1].props("playerName")).toBe("Vanessa");
    });
  });

  describe("Source Players Tag", () => {
    it("should display source players tag when there are more than 3 players.", () => {
      const sourcePlayersTag = wrapper.findComponent<Tag>("#game-over-history-record-source-players-truncated");

      expect(sourcePlayersTag.attributes("value")).toBe("+ 1");
    });

    it("should display source players tag when there are exactly 3 players.", async() => {
      wrapper = await mountGameOverHistoryRecordSourceComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "vote",
              action: "vote",
              source: createFakeGameHistoryRecordPlaySource({
                name: "survivors",
                players: defaultSourcePlayers.slice(0, 3),
              }),
            }),
          }),
        },
      });
      const sourcePlayersTag = wrapper.findComponent<Tag>("#game-over-history-record-source-players-truncated");

      expect(sourcePlayersTag.exists()).toBeFalsy();
    });

    it("should not display source players tag when there are less than 4 players.", async() => {
      wrapper = await mountGameOverHistoryRecordSourceComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "vote",
              action: "vote",
              source: createFakeGameHistoryRecordPlaySource({
                name: "survivors",
                players: defaultSourcePlayers.slice(0, 2),
              }),
            }),
          }),
        },
      });
      const sourcePlayersTag = wrapper.findComponent<Tag>("#game-over-history-record-source-players-truncated");

      expect(sourcePlayersTag.exists()).toBeFalsy();
    });
  });
});