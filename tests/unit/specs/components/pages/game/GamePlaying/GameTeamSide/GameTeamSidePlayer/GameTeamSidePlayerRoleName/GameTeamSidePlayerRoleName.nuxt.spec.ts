import type { NuxtImg } from "#components";
import { createFakeActingByActorPlayerAttribute, createFakeSeenBySeerPlayerAttribute } from "@tests/unit/utils/factories/composables/api/game/player/player-attribute/player-attribute.factory";
import { createFakePlayerRole } from "@tests/unit/utils/factories/composables/api/game/player/player-role/player-role.factory";
import { createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameTeamSidePlayerRoleNameProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerRoleName/game-team-side-player-role-name.types";
import GameTeamSidePlayerRoleName from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerRoleName/GameTeamSidePlayerRoleName.vue";

describe("Game Team Side Player Role Name Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayerRoleName>>;
  const defaultPlayer = createFakeWerewolfAlivePlayer({
    name: "Antoine",
    attributes: [
      createFakeActingByActorPlayerAttribute(),
      createFakeSeenBySeerPlayerAttribute(),
    ],
  });
  const defaultProps: GameTeamSidePlayerRoleNameProps = { player: defaultPlayer };

  async function mountGameTeamSidePlayerRoleNameComponent(options: ComponentMountingOptions<typeof GameTeamSidePlayerRoleName> = {}):
  Promise<ReturnType<typeof mount<typeof GameTeamSidePlayerRoleName>>> {
    return mountSuspendedComponent(GameTeamSidePlayerRoleName, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTeamSidePlayerRoleNameComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player role revelation", () => {
    it("should display player seen logo when player role is revealed.", async() => {
      const player = createFakeSeerAlivePlayer({ role: createFakePlayerRole({ isRevealed: true }) });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({ props: { ...defaultProps, player } });
      const revealedIcon = wrapper.findComponent<typeof NuxtImg>(`[alt$="role is revealed"]`);

      expect(revealedIcon.exists()).toBeTruthy();
    });

    it("should not display player death logo when player is alive.", () => {
      const revealedIcon = wrapper.findComponent<typeof NuxtImg>(`[alt$="role is revealed"]`);

      expect(revealedIcon.exists()).toBeFalsy();
    });

    it("should attach tooltip to player seen logo when player's role is revealed.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, `[src="svg/game/player/player-attribute/seen.svg"]`) };
      const player = createFakeSeerAlivePlayer({ role: createFakePlayerRole({ isRevealed: true }) });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({
        props: { ...defaultProps, player },
        global: { directives },
      });

      expect(tooltip.value).toBe("This player's role is revealed");
    });
  });

  describe("Player role name", () => {
    it("should display player role when rendered.", () => {
      const playerRole = wrapper.find<HTMLDivElement>("#player-role-name");

      expect(playerRole.text()).toBe("Werewolf");
    });
  });
});