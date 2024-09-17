import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type VueUseCore from "@vueuse/core";

import type { PlayersHorizontalListProps } from "~/components/shared/game/player/PlayersHorizontalList/players-horizontal-list.types";
import PlayersHorizontalList from "~/components/shared/game/player/PlayersHorizontalList/PlayersHorizontalList.vue";
import { createFakeFoxAlivePlayer, createFakeSeerAlivePlayer, createFakeWerewolfAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

const hoistedMocks = vi.hoisted(() => ({
  useBreakpoints: {
    smaller: vi.fn(),
  },
}));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUseCore>(),
  useBreakpoints: (): typeof hoistedMocks.useBreakpoints => hoistedMocks.useBreakpoints,
}));

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
    hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(false));
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

    it("should render the expected players to act with large size when screen is not smaller than md.", async() => {
      hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(false));
      wrapper = await mountPlayersHorizontalListComponent();
      const roleImagesInList = wrapper.findAllComponents<typeof RoleImage>(".role-image-in-list");

      expect(roleImagesInList[0].props("sizes")).toBe("100px");
    });

    it("should render the expected players to act with small size when screen is smaller than md.", async() => {
      hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(true));
      wrapper = await mountPlayersHorizontalListComponent();
      const roleImagesInList = wrapper.findAllComponents<typeof RoleImage>(".role-image-in-list");

      expect(roleImagesInList[0].props("sizes")).toBe("50px");
    });
  });
});