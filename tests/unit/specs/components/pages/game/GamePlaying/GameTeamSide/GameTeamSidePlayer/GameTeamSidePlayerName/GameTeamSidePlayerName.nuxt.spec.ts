import type { NuxtImg } from "#components";
import { createFakeActingByActorPlayerAttribute, createFakeSeenBySeerPlayerAttribute } from "@tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute.factory";
import { createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameTeamSidePlayerNameProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerName/game-team-side-player-name.types";
import GameTeamSidePlayerName from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerName/GameTeamSidePlayerName.vue";

describe("Game Team Side Player Name Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayerName>>;
  const defaultPlayer = createFakeWerewolfAlivePlayer({
    name: "Antoine",
    attributes: [
      createFakeActingByActorPlayerAttribute(),
      createFakeSeenBySeerPlayerAttribute(),
    ],
  });
  const defaultProps: GameTeamSidePlayerNameProps = { player: defaultPlayer };

  async function mountGameTeamSidePlayerNameComponent(options: ComponentMountingOptions<typeof GameTeamSidePlayerName> = {}):
  Promise<ReturnType<typeof mount<typeof GameTeamSidePlayerName>>> {
    return mountSuspendedComponent(GameTeamSidePlayerName, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTeamSidePlayerNameComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player death", () => {
    it("should display player death logo when player is dead.", async() => {
      const player = createFakeSeerAlivePlayer({ isAlive: false });
      wrapper = await mountGameTeamSidePlayerNameComponent({ props: { ...defaultProps, player } });
      const deathIcon = wrapper.findComponent<typeof NuxtImg>("[alt='This player is dead']");

      expect(deathIcon.exists()).toBeTruthy();
    });

    it("should not display player death logo when player is alive.", () => {
      const deathIcon = wrapper.findComponent<typeof NuxtImg>("[alt='This player is dead']");

      expect(deathIcon.exists()).toBeFalsy();
    });

    it("should attach tooltip to player death logo when player is dead.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "[alt='This player is dead']") };
      const player = createFakeSeerAlivePlayer({ isAlive: false });
      wrapper = await mountGameTeamSidePlayerNameComponent({ props: { ...defaultProps, player }, global: { directives } });

      expect(tooltip.value).toBe("This player is dead");
    });
  });

  describe("Player name", () => {
    it("should display player name when rendered.", () => {
      const playerName = wrapper.find<HTMLDivElement>("#player-name");

      expect(playerName.text()).toBe("Antoine");
    });

    it("should be lined through when player is dead.", async() => {
      const player = createFakeSeerAlivePlayer({ isAlive: false });
      wrapper = await mountGameTeamSidePlayerNameComponent({ props: { ...defaultProps, player } });
      const playerName = wrapper.find<HTMLDivElement>("#player-name");

      expect(playerName.classes("line-through")).toBeTruthy();
    });
  });
});