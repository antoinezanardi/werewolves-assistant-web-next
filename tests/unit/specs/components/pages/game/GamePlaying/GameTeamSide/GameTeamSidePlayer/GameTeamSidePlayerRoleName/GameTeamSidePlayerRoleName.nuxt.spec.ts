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

  describe("Player originally Thief", () => {
    it("should display thief logo when player was originally a thief but now another role.", async() => {
      const player = createFakeWerewolfAlivePlayer({
        role: createFakePlayerRole({
          current: "werewolf",
          original: "thief",
        }),
      });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({ props: { ...defaultProps, player } });
      const thiefIcon = wrapper.findComponent<typeof NuxtImg>(`[alt="This player was originally the Thief"]`);

      expect(thiefIcon.exists()).toBeTruthy();
    });

    it("should not display thief logo when player was not originally a thief.", () => {
      const thiefIcon = wrapper.findComponent<typeof NuxtImg>(`[alt="This player was originally the Thief"]`);

      expect(thiefIcon.exists()).toBeFalsy();
    });

    it("should not display thief logo when thief is still thief.", async() => {
      const player = createFakeWerewolfAlivePlayer({
        role: createFakePlayerRole({
          current: "thief",
          original: "thief",
        }),
      });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({ props: { ...defaultProps, player } });
      const thiefIcon = wrapper.findComponent<typeof NuxtImg>(`[alt="This player was originally the Thief"]`);

      expect(thiefIcon.exists()).toBeFalsy();
    });

    it("should attach tooltip to thief logo when player was originally a thief.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, `[alt="This player was originally the Thief"]`) };
      const player = createFakeWerewolfAlivePlayer({
        role: createFakePlayerRole({
          current: "werewolf",
          original: "thief",
        }),
      });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({
        props: { ...defaultProps, player },
        global: { directives },
      });

      expect(tooltip.value).toBe("This player was originally the Thief");
    });
  });

  describe("Player originally Actor", () => {
    it("should display actor logo when player was originally an actor but now another role.", async() => {
      const player = createFakeWerewolfAlivePlayer({
        role: createFakePlayerRole({
          current: "werewolf",
          original: "actor",
        }),
      });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({ props: { ...defaultProps, player } });
      const actorIcon = wrapper.findComponent<typeof NuxtImg>(`[alt="This player was originally the Actor"]`);

      expect(actorIcon.exists()).toBeTruthy();
    });

    it("should not display actor logo when player was not originally an actor.", () => {
      const actorIcon = wrapper.findComponent<typeof NuxtImg>(`[alt="This player was originally the Actor"]`);

      expect(actorIcon.exists()).toBeFalsy();
    });

    it("should not display actor logo when actor is still actor.", async() => {
      const player = createFakeWerewolfAlivePlayer({
        role: createFakePlayerRole({
          current: "actor",
          original: "actor",
        }),
      });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({ props: { ...defaultProps, player } });
      const actorIcon = wrapper.findComponent<typeof NuxtImg>(`[alt="This player was originally the Actor"]`);

      expect(actorIcon.exists()).toBeFalsy();
    });

    it("should attach tooltip to actor logo when player was originally an actor.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, `[alt="This player was originally the Actor"]`) };
      const player = createFakeWerewolfAlivePlayer({
        role: createFakePlayerRole({
          current: "werewolf",
          original: "actor",
        }),
      });
      wrapper = await mountGameTeamSidePlayerRoleNameComponent({
        props: { ...defaultProps, player },
        global: { directives },
      });

      expect(tooltip.value).toBe("This player was originally the Actor");
    });
  });

  describe("Player role name", () => {
    it("should display player role when rendered.", () => {
      const playerRole = wrapper.find<HTMLDivElement>("#player-role-name");

      expect(playerRole.text()).toBe("Werewolf");
    });
  });
});