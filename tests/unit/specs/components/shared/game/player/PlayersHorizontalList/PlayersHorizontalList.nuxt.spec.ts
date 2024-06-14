import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { PlayersHorizontalListProps } from "~/components/shared/game/player/PlayersHorizontalList/players-horizontal-list.types";
import PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import { createFakeFoxAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Players Horizontal List Component", () => {
  let wrapper: ReturnType<typeof mount<typeof PlayersHorizontalList>>;
  const defaultPlayers = [
    createFakeFoxAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Benoit" }),
    createFakeWerewolfAlivePlayer({ name: "Alice" }),
  ];
  const defaultProps: PlayersHorizontalListProps = { players: defaultPlayers };

  async function mountPlayersHorizontalListComponent(options: ComponentMountingOptions<typeof PlayersHorizontalList> = {}):
  Promise<ReturnType<typeof mount<typeof PlayersHorizontalList>>> {
    return mountSuspendedComponent(PlayersHorizontalList, {
      props: defaultProps,
      shallow: false,
      global: { stubs: { RoleImage: true } },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountPlayersHorizontalListComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Players", () => {
    it("should render the expected players to act when rendered.", () => {
      const playersInList = wrapper.findAll<HTMLDivElement>(".player-in-list");

      expect(playersInList).toHaveLength(defaultPlayers.length);
      expect(playersInList[0].text()).toBe(defaultPlayers[0].name);
      expect(playersInList[1].text()).toBe(defaultPlayers[1].name);
      expect(playersInList[2].text()).toBe(defaultPlayers[2].name);
    });
  });
});