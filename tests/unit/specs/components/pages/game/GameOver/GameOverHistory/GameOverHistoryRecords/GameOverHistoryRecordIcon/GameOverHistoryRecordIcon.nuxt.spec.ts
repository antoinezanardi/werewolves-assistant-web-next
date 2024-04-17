import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameOverHistoryRecordIconProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordIcon/game-over-history-record-icon.types";
import GameOverHistoryRecordIcon from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordIcon/GameOverHistoryRecordIcon.vue";
import { createFakeGameHistoryRecordPlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Icon Component", () => {
  const gameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      source: createFakeGameHistoryRecordPlaySource({ name: "sheriff" }),
      action: "delegate",
    }),
  });
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordIcon>>;
  const defaultProps: GameOverHistoryRecordIconProps = { gameHistoryRecord };

  async function mountGameOverHistoryRecordIconComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordIcon> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordIcon>>> {
    return mountSuspendedComponent(GameOverHistoryRecordIcon, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordIconComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Icon", () => {
    it("should display the game history record icon when rendered.", () => {
      const icon = wrapper.find<HTMLImageElement>("[alt='Game history record icon']");

      expect(icon.attributes("src")).toBe("/svg/game/player/player-attribute/sheriff.svg");
    });
  });
});