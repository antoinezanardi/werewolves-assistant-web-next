import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { TooltipOptions } from "primevue/tooltip";

import type { NuxtImg } from "#components";
import type { GameTeamSidePlayerAttributeProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/game-team-side-player-attribute.types";
import GameTeamSidePlayerAttribute from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerAttribute/GameTeamSidePlayerAttribute.vue";
import type { PlayerAttribute } from "~/composables/api/game/types/players/player-attribute/player-attribute.class";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeActingByActorPlayerAttribute, createFakeCantVoteByScapegoatPlayerAttribute, createFakeCantVoteBySurvivorsPlayerAttribute, createFakeCharmedByPiedPiperPlayerAttribute, createFakeContaminatedByRustySwordKnightPlayerAttribute, createFakeDrankDeathPotionByWitchPlayerAttribute, createFakeDrankLifePotionByWitchPlayerAttribute, createFakeEatenByBigBadWolfPlayerAttribute, createFakeEatenByWerewolvesPlayerAttribute, createFakeEatenByWhiteWerewolfPlayerAttribute, createFakeInLoveByCupidPlayerAttribute, createFakePlayerAttribute, createFakePowerlessByAccursedWolfFatherPlayerAttribute, createFakePowerlessByActorPlayerAttribute, createFakePowerlessByElderPlayerAttribute, createFakePowerlessByFoxPlayerAttribute, createFakePowerlessByWerewolvesPlayerAttribute, createFakeProtectedByDefenderPlayerAttribute, createFakeScandalmongerMarkedByScandalmongerPlayerAttribute, createFakeSeenBySeerPlayerAttribute, createFakeSheriffBySheriffPlayerAttribute, createFakeSheriffBySurvivorsPlayerAttribute, createFakeStolenRoleByDevotedServantPlayerAttribute, createFakeWorshipedByWildChildPlayerAttribute } from "~/tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute.factory";
import { createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { pTooltipDirectiveBinder } from "~/tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "~/tests/unit/utils/types/directive.types";

describe("Game Team Side Player Attribute Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayerAttribute>>;
  const defaultPlayer = createFakeSeerAlivePlayer();
  const defaultPlayerAttribute = createFakeSeenBySeerPlayerAttribute();
  const defaultProps: GameTeamSidePlayerAttributeProps = {
    player: defaultPlayer,
    attribute: defaultPlayerAttribute,
  };

  async function mountGameTeamSidePlayerAttributeComponent(options: ComponentMountingOptions<typeof GameTeamSidePlayerAttribute> = {}):
  Promise<ReturnType<typeof mount<typeof GameTeamSidePlayerAttribute>>> {
    return mountSuspendedComponent(GameTeamSidePlayerAttribute, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTeamSidePlayerAttributeComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Attribute Icon", () => {
    it.each<{
      attribute: PlayerAttribute;
      expectedAlt: string;
      expectedIconSrc: string;
      test: string;
    }>([
      {
        attribute: createFakeActingByActorPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.actingByActor",
        expectedIconSrc: "svg/role/actor.svg",
        test: "should render acting by actor icon when player attribute is acting by actor.",
      },
      {
        attribute: createFakeCantVoteBySurvivorsPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.cantVoteBySurvivors",
        expectedIconSrc: "svg/game/player/player-attribute/cant-vote.svg",
        test: "should render cant vote by survivors icon when player attribute is cant vote by survivors.",
      },
      {
        attribute: createFakeCantVoteByScapegoatPlayerAttribute(createFakeGame()),
        expectedAlt: "components.GameTeamSidePlayerAttribute.cantVoteByScapegoat",
        expectedIconSrc: "svg/game/player/player-attribute/cant-vote.svg",
        test: "should render cant vote by scapegoat icon when player attribute is cant vote by scapegoat.",
      },
      {
        attribute: createFakeCharmedByPiedPiperPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.charmedByPiedPiper",
        expectedIconSrc: "svg/game/player/player-attribute/charmed.svg",
        test: "should render charmed by pied piper icon when player attribute is charmed by pied piper.",
      },
      {
        attribute: createFakeContaminatedByRustySwordKnightPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.contaminatedByRustySwordKnight",
        expectedIconSrc: "svg/game/player/player-attribute/contaminated.svg",
        test: "should render contaminated by rusty sword knight icon when player attribute is contaminated by rusty sword knight.",
      },
      {
        attribute: createFakeDrankDeathPotionByWitchPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.drankDeathPotionByWitch",
        expectedIconSrc: "svg/game/player/player-attribute/drank-death-potion.svg",
        test: "should render drank death potion by witch icon when player attribute is drank death potion by witch.",
      },
      {
        attribute: createFakeDrankLifePotionByWitchPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.drankLifePotionByWitch",
        expectedIconSrc: "svg/game/player/player-attribute/drank-life-potion.svg",
        test: "should render drank life potion by witch icon when player attribute is drank life potion by witch.",
      },
      {
        attribute: createFakeEatenByWerewolvesPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.eatenByWerewolves",
        expectedIconSrc: "svg/role/werewolf.svg",
        test: "should render eaten by werewolves icon when player attribute is eaten by werewolves.",
      },
      {
        attribute: createFakeEatenByWhiteWerewolfPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.eatenByWhiteWerewolf",
        expectedIconSrc: "svg/role/white-werewolf.svg",
        test: "should render eaten by white werewolf icon when player attribute is eaten by white werewolf.",
      },
      {
        attribute: createFakeEatenByBigBadWolfPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.eatenByBigBadWolf",
        expectedIconSrc: "svg/role/big-bad-wolf.svg",
        test: "should render eaten by big bad wolf icon when player attribute is eaten by big bad wolf.",
      },
      {
        attribute: createFakeInLoveByCupidPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.inLoveByCupid",
        expectedIconSrc: "svg/game/player/player-attribute/in-love.svg",
        test: "should render in love by cupid icon when player attribute is in love by cupid.",
      },
      {
        attribute: createFakePowerlessByActorPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.powerlessByActor",
        expectedIconSrc: "svg/game/player/player-attribute/powerless.svg",
        test: "should render powerless by actor icon when player attribute is powerless by actor.",
      },
      {
        attribute: createFakePowerlessByWerewolvesPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.powerlessByWerewolves",
        expectedIconSrc: "svg/game/player/player-attribute/powerless.svg",
        test: "should render powerless by werewolves icon when player attribute is powerless by werewolves.",
      },
      {
        attribute: createFakePowerlessByAccursedWolfFatherPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.powerlessByAccursedWolfFather",
        expectedIconSrc: "svg/game/player/player-attribute/powerless.svg",
        test: "should render powerless by accursed wolf father icon when player attribute is powerless by accursed wolf father.",
      },
      {
        attribute: createFakePowerlessByFoxPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.powerlessByFox",
        expectedIconSrc: "svg/game/player/player-attribute/powerless.svg",
        test: "should render powerless by fox icon when player attribute is powerless by fox.",
      },
      {
        attribute: createFakePowerlessByElderPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.powerlessByElder",
        expectedIconSrc: "svg/game/player/player-attribute/powerless.svg",
        test: "should render powerless by elder icon when player attribute is powerless by elder.",
      },
      {
        attribute: createFakeProtectedByDefenderPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.protectedByDefender",
        expectedIconSrc: "svg/game/player/player-attribute/protected.svg",
        test: "should render protected by defender icon when player attribute is protected by defender.",
      },
      {
        attribute: createFakeScandalmongerMarkedByScandalmongerPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.scandalmongerMarkedByScandalmonger",
        expectedIconSrc: "svg/game/player/player-attribute/scandalmonger-marked.svg",
        test: "should render scandalmonger marked by scandalmonger icon when player attribute is scandalmonger marked by scandalmonger.",
      },
      {
        attribute: createFakeSeenBySeerPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.seenBySeer",
        expectedIconSrc: "svg/game/player/player-attribute/seen.svg",
        test: "should render seen by seer icon when player attribute is seen by seer.",
      },
      {
        attribute: createFakeSheriffBySheriffPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.sheriffBySheriff",
        expectedIconSrc: "svg/game/player/player-attribute/sheriff.svg",
        test: "should render sheriff by sheriff icon when player attribute is sheriff by sheriff.",
      },
      {
        attribute: createFakeSheriffBySurvivorsPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.sheriffBySurvivors",
        expectedIconSrc: "svg/game/player/player-attribute/sheriff.svg",
        test: "should render sheriff by survivors icon when player attribute is sheriff by survivors.",
      },
      {
        attribute: createFakeStolenRoleByDevotedServantPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.stolenRoleByDevotedServant",
        expectedIconSrc: "svg/game/player/player-attribute/stolen-role.svg",
        test: "should render stolen role by devoted servant icon when player attribute is stolen role by devoted servant.",
      },
      {
        attribute: createFakeWorshipedByWildChildPlayerAttribute(),
        expectedAlt: "components.GameTeamSidePlayerAttribute.worshipedByWildChild",
        expectedIconSrc: "svg/role/wild-child.svg",
        test: "should render worshiped by wild child icon when player attribute is worshiped by wild child.",
      },
      {
        attribute: createFakePlayerAttribute({
          source: "hunter",
          name: "eaten",
        }),
        expectedAlt: "components.GameTeamSidePlayerAttribute.unknownPlayerAttribute",
        expectedIconSrc: "svg/misc/question-mark.svg",
        test: "should render unknown icon when player attribute is unknown.",
      },
    ])("$test", async({ attribute, expectedAlt, expectedIconSrc }) => {
      wrapper = await mountGameTeamSidePlayerAttributeComponent({ props: { ...defaultProps, attribute } });
      const icon = wrapper.findComponent<typeof NuxtImg>(`#game-team-side-player-attribute-icon`);

      expect(icon.attributes("src")).toBe(expectedIconSrc);
      expect(icon.attributes("alt")).toBe(expectedAlt);
    });

    it("should have tooltip on right position when player is from villagers side.", async() => {
      const tooltip: BoundTooltip = { value: undefined, arg: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-team-side-player-attribute-icon") };
      wrapper = await mountGameTeamSidePlayerAttributeComponent({ global: { directives } });
      const expectedTooltipOptions: TooltipOptions = {
        value: `<div class="flex flex-col items-center">
                <img width="75" src="/_ipx/_/svg/game/player/player-attribute/seen.svg" alt="components.GameTeamSidePlayerAttribute.seenBySeer" class="mb-3"/>
                <div class="text-center">components.GameTeamSidePlayerAttribute.seenBySeer</div>
            </div>`,
        fitContent: false,
        escape: false,
      };

      expect(tooltip.value).toStrictEqual<TooltipOptions>(expectedTooltipOptions);
      expect(tooltip.arg).toStrictEqual({ position: "right" });
    });

    it("should have tooltip on left position when player is from werewolves side.", async() => {
      const tooltip: BoundTooltip = { value: undefined, arg: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-team-side-player-attribute-icon") };
      wrapper = await mountGameTeamSidePlayerAttributeComponent({
        props: {
          ...defaultProps,
          player: createFakeWerewolfAlivePlayer(),
        },
        global: { directives },
      });
      const expectedTooltipOptions: TooltipOptions = {
        value: `<div class="flex flex-col items-center">
                <img width="75" src="/_ipx/_/svg/game/player/player-attribute/seen.svg" alt="components.GameTeamSidePlayerAttribute.seenBySeer" class="mb-3"/>
                <div class="text-center">components.GameTeamSidePlayerAttribute.seenBySeer</div>
            </div>`,
        fitContent: false,
        escape: false,
      };

      expect(tooltip.value).toStrictEqual<TooltipOptions>(expectedTooltipOptions);
      expect(tooltip.arg).toStrictEqual({ position: "left" });
    });
  });
});