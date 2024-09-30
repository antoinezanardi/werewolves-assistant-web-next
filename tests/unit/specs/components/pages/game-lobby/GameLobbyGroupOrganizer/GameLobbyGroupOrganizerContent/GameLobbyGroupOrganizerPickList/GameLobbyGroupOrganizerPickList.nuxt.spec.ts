import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type VueUseCore from "@vueuse/core";
import type { PickListMoveToTargetEvent, PickListProps } from "primevue/picklist";
import type PickList from "primevue/picklist";
import GameLobbyGroupOrganizerPickList from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerPickList/GameLobbyGroupOrganizerPickList.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

const hoistedMocks = vi.hoisted(() => ({
  useBreakpoints: {
    smaller: vi.fn(),
  },
}));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUseCore>(),
  useBreakpoints: (): typeof hoistedMocks.useBreakpoints => hoistedMocks.useBreakpoints,
}));

describe("Game Lobby Group Organizer Pick List Component", () => {
  const defaultFirstGroupName = "Group 1";
  const defaultSecondGroupName = "Group 2";
  const defaultPlayers = [
    createFakeCreateGamePlayerDto({
      name: "Antoine",
      role: createFakeCreateGamePlayerRoleDto({ name: "prejudiced-manipulator" }),
      group: defaultFirstGroupName,
    }),
    createFakeCreateGamePlayerDto({
      name: "Bobby",
      role: createFakeCreateGamePlayerRoleDto({ name: "werewolf" }),
      group: defaultFirstGroupName,
    }),
    createFakeCreateGamePlayerDto({
      name: "Cindy",
      role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
      group: defaultSecondGroupName,
    }),
    createFakeCreateGamePlayerDto({
      name: "Derek",
      role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
      group: defaultSecondGroupName,
    }),
  ];
  const defaultCreateGameDto = createFakeCreateGameDto({ players: defaultPlayers });
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: defaultCreateGameDto,
        firstGroupName: defaultFirstGroupName,
        secondGroupName: defaultSecondGroupName,
      },
    },
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizerPickList>>;

  async function mountGameLobbyGroupOrganizerPickListComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizerPickList> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizerPickList>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizerPickList, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          PickList: false,
          ListBox: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(false));
    wrapper = await mountGameLobbyGroupOrganizerPickListComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLobbyGroupOrganizerPickListComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Pick List", () => {
    it("should set items from player groups when rendered.", () => {
      const pickList = wrapper.findComponent<typeof PickList>("#game-lobby-group-organizer-pick-list");
      const pickListProps = pickList.props() as PickListProps;

      expect(pickListProps.modelValue).toStrictEqual<CreateGamePlayerDto[][]>([
        [defaultPlayers[0], defaultPlayers[1]],
        [defaultPlayers[2], defaultPlayers[3]],
      ]);
    });
    describe("Move events", () => {
      it("should move players to second group when pick list emits move to target event.", async() => {
        const pickList = wrapper.findComponent<typeof PickList>("#game-lobby-group-organizer-pick-list");
        const event: PickListMoveToTargetEvent = {
          items: [defaultPlayers[0], defaultPlayers[1]],
          originalEvent: new Event(""),
        };
        (pickList.vm as VueVm).$emit("moveToTarget", event);
        await nextTick();
        const createGameDtoStore = useCreateGameDtoStore();

        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenNthCalledWith(1, createFakeCreateGamePlayerDto({
          ...defaultPlayers[0],
          group: defaultSecondGroupName,
        }));
        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenNthCalledWith(2, createFakeCreateGamePlayerDto({
          ...defaultPlayers[1],
          group: defaultSecondGroupName,
        }));
      });

      it("should move players to first group when pick list emits move to source event.", async() => {
        const pickList = wrapper.findComponent<typeof PickList>("#game-lobby-group-organizer-pick-list");
        const event: PickListMoveToTargetEvent = {
          items: [defaultPlayers[2], defaultPlayers[3]],
          originalEvent: new Event(""),
        };
        (pickList.vm as VueVm).$emit("moveToSource", event);
        await nextTick();
        const createGameDtoStore = useCreateGameDtoStore();

        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenNthCalledWith(1, createFakeCreateGamePlayerDto({
          ...defaultPlayers[2],
          group: defaultFirstGroupName,
        }));
        expect(createGameDtoStore.updatePlayerInCreateGameDto).toHaveBeenNthCalledWith(2, createFakeCreateGamePlayerDto({
          ...defaultPlayers[3],
          group: defaultFirstGroupName,
        }));
      });
    });

    describe("Items", () => {
      it("should render the players role image when rendered.", async() => {
        wrapper = await mountGameLobbyGroupOrganizerPickListComponent({ shallow: false });
        const roleImages = wrapper.findAllComponents<typeof RoleImage>(".option-role-image");

        expect(roleImages).toHaveLength(4);
      });

      it("should set role image size to 35px when screen is not smalled than md.", async() => {
        wrapper = await mountGameLobbyGroupOrganizerPickListComponent({ shallow: false });
        const roleImages = wrapper.findAllComponents<typeof RoleImage>(".option-role-image");

        expect(roleImages[0].props("sizes")).toBe("35px");
      });

      it("should set role image size to 25px when screen is smalled than md.", async() => {
        hoistedMocks.useBreakpoints.smaller.mockReturnValue(ref(true));
        wrapper = await mountGameLobbyGroupOrganizerPickListComponent({ shallow: false });
        const roleImages = wrapper.findAllComponents<typeof RoleImage>(".option-role-image");

        expect(roleImages[0].props("sizes")).toBe("25px");
      });
    });
  });
});