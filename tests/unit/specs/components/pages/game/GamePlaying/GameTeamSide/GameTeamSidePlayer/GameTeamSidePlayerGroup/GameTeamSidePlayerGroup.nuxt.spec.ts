import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { TooltipOptions } from "primevue/tooltip";

import type { NuxtImg } from "#components";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameTeamSidePlayerGroup from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerGroup/GameTeamSidePlayerGroup.vue";
import type { GameTeamSidePlayerNameProps } from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayerName/game-team-side-player-name.types";
import { StoreIds } from "~/stores/enums/store.enum";

describe("Game Team Side Player Group Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSidePlayerGroup>>;
  const defaultGame = createFakeGame({
    players: [
      createFakeWerewolfAlivePlayer({ name: "Antoine", group: "Group 1" }),
      createFakeWerewolfAlivePlayer({ name: "Benoit", group: "Group 1" }),
      createFakeWerewolfAlivePlayer({ name: "Clement", group: "Group 2" }),
      createFakeWerewolfAlivePlayer({ name: "David", group: "Group 2" }),
    ],
    playerGroups: ["Group 1", "Group 2"],
  });
  const defaultPlayer = createFakeWerewolfAlivePlayer({
    name: "Antoine",
    group: "Group 1",
  });
  const defaultProps: GameTeamSidePlayerNameProps = { player: defaultPlayer };
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameTeamSidePlayerGroupComponent(options: ComponentMountingOptions<typeof GameTeamSidePlayerGroup> = {}):
  Promise<ReturnType<typeof mount<typeof GameTeamSidePlayerGroup>>> {
    return mountSuspendedComponent(GameTeamSidePlayerGroup, {
      props: defaultProps,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTeamSidePlayerGroupComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Group Icon", () => {
    it("should have source set to first group when player is in first group.", () => {
      const groupIcon = wrapper.findComponent<typeof NuxtImg>("#game-team-side-player-group-icon");

      expect(groupIcon.attributes("src")).toBe("svg/game/player/player-group/group-1.svg");
    });

    it("should have source set to second group when player is in second group.", async() => {
      const player = createFakeWerewolfAlivePlayer({ name: "Clement", group: "Group 2" });
      wrapper = await mountGameTeamSidePlayerGroupComponent({ props: { player } });
      const groupIcon = wrapper.findComponent<typeof NuxtImg>("#game-team-side-player-group-icon");

      expect(groupIcon.attributes("src")).toBe("svg/game/player/player-group/group-2.svg");
    });

    it("should have alt set when rendered.", () => {
      const groupIcon = wrapper.findComponent<typeof NuxtImg>("#game-team-side-player-group-icon");

      expect(groupIcon.attributes("alt")).toBe("components.GameTeamSidePlayerGroup.playerGroup, {\"groupName\":\"Group 1\"}");
    });

    it("should have tooltip set when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined, arg: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-team-side-player-group-icon") };
      wrapper = await mountGameTeamSidePlayerGroupComponent({
        props: {
          ...defaultProps,
          player: createFakeWerewolfAlivePlayer({ group: "Group 1" }),
        },
        global: {
          directives,
          plugins: [createTestingPinia(testingPinia)],
        },
      });
      const expectedTooltipOptions: TooltipOptions = {
        value: `<div class="flex flex-col items-center gap-2">
                <img width="75" class="drop-shadow-xl" src="/_ipx/_/svg/game/player/player-group/group-1.svg" alt="components.GameTeamSidePlayerGroup.playerGroup, {"groupName":"Group 1"}"/>
                <div class="text-center">components.GameTeamSidePlayerGroup.playerGroup, {"groupName":"Group 1"}</div>
            </div>`,
        fitContent: false,
        escape: false,
      };

      expect(tooltip.value).toStrictEqual<TooltipOptions>(expectedTooltipOptions);
    });
  });
});