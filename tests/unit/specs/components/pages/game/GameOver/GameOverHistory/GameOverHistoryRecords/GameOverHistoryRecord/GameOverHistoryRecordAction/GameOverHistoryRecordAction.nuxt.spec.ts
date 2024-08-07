import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordActionProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordAction/game-over-history-record-action.types";
import GameOverHistoryRecordAction from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordAction/GameOverHistoryRecordAction.vue";
import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { createFakeGameHistoryRecordPlaySource } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Action Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordAction>>;
  const defaultGameOverHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      action: "vote",
      type: "vote",
    }),
  });
  const defaultProps: GameOverHistoryRecordActionProps = { gameHistoryRecord: defaultGameOverHistoryRecord };

  async function mountGameOverHistoryRecordActionComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordAction> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordAction>>> {
    return mountSuspendedComponent(GameOverHistoryRecordAction, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordActionComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Action Text", () => {
    it.each<{
      gameHistoryRecord: GameHistoryRecord;
      expectedText: string;
      test: string;
    }>([
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "vote",
            type: "vote",
            votes: undefined,
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.skippedTurn",
        test: "should have skipped text when game history record action is skipped.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "accursed-wolf-father" }),
            action: "infect",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.infected",
        test: "should have infected text when game history record action is infected.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "actor" }),
            action: "choose-card",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.choseCard",
        test: "should have chose card text when game history record action is chose card.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "big-bad-wolf" }),
            action: "eat",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.ate",
        test: "should have ate text when game history record action is ate.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "charmed" }),
            action: "meet-each-other",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.metEachOther",
        test: "should have met each other text when game history record action is met each other.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "cupid" }),
            action: "charm",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.madeFallInLove",
        test: "should have made fall in love text when game history record action is made fall in love.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "defender" }),
            action: "protect",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.protected",
        test: "should have protected text when game history record action is protected.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "fox" }),
            action: "sniff",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.sniffed",
        test: "should have sniffed text when game history record action is sniffed.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "hunter" }),
            action: "shoot",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.shot",
        test: "should have shot text when game history record action is shot.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "lovers" }),
            action: "meet-each-other",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.metEachOther",
        test: "should have met each other text when game history record action is met each other.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "pied-piper" }),
            action: "charm",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.charmed",
        test: "should have charmed text when game history record action is charmed.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "scandalmonger" }),
            action: "mark",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.markedWithFeather",
        test: "should have marked with feather text when game history record action is marked with feather.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "scapegoat" }),
            action: "ban-voting",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.bannedFromVotes",
        test: "should have banned from votes text when game history record action is banned from votes.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "seer" }),
            action: "look",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.seen",
        test: "should have seen text when game history record action is seen.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "sheriff" }),
            action: "delegate",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.delegated",
        test: "should have delegated text when game history record action is delegated.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "sheriff" }),
            action: "settle-votes",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.settledVotes",
        test: "should have settled votes text when game history record action is settled votes.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "stuttering-judge" }),
            action: "request-another-vote",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.requestedAnotherVote",
        test: "should have requested another vote text when game history record action is requested another vote.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "vote",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.voted",
        test: "should have voted text when game history record action is voted.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "bury-dead-bodies",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.buriedDeadBodies",
        test: "should have buried dead bodies text when game history record action is buried dead bodies.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "elect-sheriff",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.electedAsSheriff",
        test: "should have elected as sheriff text when game history record action is elected as sheriff.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "vote",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.voted",
        test: "should have voted text when game history record action is voted.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "thief" }),
            action: "choose-card",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.choseCard",
        test: "should have chose card text when game history record action is chose card.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "three-brothers" }),
            action: "meet-each-other",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.metEachOther",
        test: "should have met each other text when game history record action is met each other.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "two-sisters" }),
            action: "meet-each-other",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.metEachOther",
        test: "should have met each other text when game history record action is met each other.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "werewolves" }),
            action: "eat",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.ate",
        test: "should have ate text when game history record action is ate.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "white-werewolf" }),
            action: "eat",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.ate",
        test: "should have ate text when game history record action is ate.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "wild-child" }),
            action: "choose-model",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.choseAsModel",
        test: "should have chose as model text when game history record action is chose as model.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "witch" }),
            action: "use-potions",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.usedPotions",
        test: "should have used potions text when game history record action is used potions.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "wolf-hound" }),
            action: "choose-side",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.choseSide",
        test: "should have chose side text when game history record action is chose side.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "witch" }),
            action: "eat",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedText: "components.GameOverHistoryRecordAction.unknownGamePlay",
        test: "should have unknown play text when game history record action is unknown.",
      },
    ])("$test", async({ gameHistoryRecord, expectedText }) => {
      wrapper = await mountGameOverHistoryRecordActionComponent({ props: { gameHistoryRecord } });

      const actionText = wrapper.find("#game-over-history-record-action-text");

      expect(actionText.text()).toBe(expectedText);
    });
  });

  describe("Action Icon", () => {
    it.each<{
      gameHistoryRecord: GameHistoryRecord;
      expectedIconSrc: string;
      test: string;
    }>([
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "vote",
            type: "vote",
            votes: undefined,
          }),
        }),
        expectedIconSrc: "/svg/game/player/player-attribute/powerless.svg",
        test: "should have skipped icon when game history record action is skipped.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "stuttering-judge" }),
            action: "request-another-vote",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedIconSrc: "/svg/misc/exclamation-mark.svg",
        test: "should have exclamation mark icon when game history record action is requested another vote.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            action: "meet-each-other",
            type: "no-action",
          }),
        }),
        expectedIconSrc: "/svg/misc/people.svg",
        test: "should have people icon when game history record action is met each other.",
      },
      {
        gameHistoryRecord: createFakeGameHistoryRecord({
          play: createFakeGameHistoryRecordPlay({
            source: createFakeGameHistoryRecordPlaySource({ name: "werewolves" }),
            action: "eat",
            type: "target",
            targets: [createFakeGameHistoryRecordPlayTarget()],
          }),
        }),
        expectedIconSrc: "/svg/misc/arrow-right.svg",
        test: "should have arrow right icon when game history record action is ate.",
      },
    ])("$test", async({ gameHistoryRecord, expectedIconSrc }) => {
      wrapper = await mountGameOverHistoryRecordActionComponent({ props: { gameHistoryRecord } });

      const actionIcon = wrapper.find("[alt='Action icon']");

      expect(actionIcon.attributes("src")).toBe(expectedIconSrc);
    });
  });
});