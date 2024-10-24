import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type DataTable from "primevue/datatable";
import { beforeEach } from "vitest";

import type { NuxtImg } from "#components";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { PlayerGroupsDataTableValue } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersGrouped/GameLobbyStartGameConfirmDialogPlayersGroupedDataTable/game-lobby-start-game-confirm-dialog-players-grouped-data-table.types";
import GameLobbyStartGameConfirmDialogPlayersGroupedDataTable from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersGrouped/GameLobbyStartGameConfirmDialogPlayersGroupedDataTable/GameLobbyStartGameConfirmDialogPlayersGroupedDataTable.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Start Game Confirm Dialog Players Grouped Data Table Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersGroupedDataTable>>;
  const firstGroupName = "First Group";
  const secondGroupName = "Second Group";
  const defaultPlayers = [
    createFakeCreateGamePlayerDto({
      name: "Antoine",
      role: createFakeCreateGamePlayerRoleDto({ name: "seer" }),
      group: firstGroupName,
    }),
    createFakeCreateGamePlayerDto({
      name: "Benoit",
      role: createFakeCreateGamePlayerRoleDto({ name: "werewolf" }),
      group: firstGroupName,
    }),
    createFakeCreateGamePlayerDto({
      name: "Catherine",
      role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
      group: secondGroupName,
    }),
    createFakeCreateGamePlayerDto({
      name: "David",
      role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
      group: secondGroupName,
    }),
  ];
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: defaultPlayers,
  });
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: defaultCreateGameDto,
        firstGroupName,
        secondGroupName,
      },
    },
  };

  async function mountGameLobbyStartGameConfirmDialogPlayersGroupedDataTableComponent(options:
  ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogPlayersGroupedDataTable> = {}):
    Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersGroupedDataTable>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogPlayersGroupedDataTable, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          DataTable: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersGroupedDataTableComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered with bigger first group and without shallow rendering.", async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersGroupedDataTableComponent({
      shallow: false,
    });
    const createGameDtoStore = useCreateGameDtoStore();
    const otherPlayer = createFakeCreateGamePlayerDto({
      name: "Eva",
      role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
      group: firstGroupName,
    });
    createGameDtoStore.createGameDto = createFakeCreateGameDto({
      players: [
        ...defaultPlayers,
        otherPlayer,
      ],
    });
    await nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered with bigger second group and without shallow rendering.", async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersGroupedDataTableComponent({
      shallow: false,
    });
    const createGameDtoStore = useCreateGameDtoStore();
    const otherPlayer = createFakeCreateGamePlayerDto({
      name: "Eva",
      role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
      group: secondGroupName,
    });
    createGameDtoStore.createGameDto = createFakeCreateGameDto({
      players: [
        ...defaultPlayers,
        otherPlayer,
      ],
    });
    await nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("DataTable", () => {
    it("should pass evenly grouped players to data table when rendered.", () => {
      const dataTable = wrapper.findComponent<typeof DataTable>("#game-lobby-start-game-confirm-dialog-players-grouped-datatable");
      const expectedValue: PlayerGroupsDataTableValue[] = [
        {
          firstGroup: defaultPlayers[0],
          secondGroup: defaultPlayers[2],
        },
        {
          firstGroup: defaultPlayers[1],
          secondGroup: defaultPlayers[3],
        },
      ];

      expect(dataTable.props("value")).toStrictEqual<PlayerGroupsDataTableValue[]>(expectedValue);
    });

    it("should pass not evenly grouped players to data table when group 1 is larger.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const otherPlayer = createFakeCreateGamePlayerDto({
        name: "Eva",
        role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
        group: firstGroupName,
      });
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          ...defaultPlayers,
          otherPlayer,
        ],
      });
      await nextTick();
      const dataTable = wrapper.findComponent<typeof DataTable>("#game-lobby-start-game-confirm-dialog-players-grouped-datatable");
      const expectedValue: PlayerGroupsDataTableValue[] = [
        {
          firstGroup: defaultPlayers[0],
          secondGroup: defaultPlayers[2],
        },
        {
          firstGroup: defaultPlayers[1],
          secondGroup: defaultPlayers[3],
        },
        {
          firstGroup: otherPlayer,
          secondGroup: undefined,
        },
      ];

      expect(dataTable.props("value")).toStrictEqual<PlayerGroupsDataTableValue[]>(expectedValue);
    });

    it("should pass not evenly grouped players to data table when group 2 is larger.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const otherPlayer = createFakeCreateGamePlayerDto({
        name: "Eva",
        role: createFakeCreateGamePlayerRoleDto({ name: "villager" }),
        group: secondGroupName,
      });
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          ...defaultPlayers,
          otherPlayer,
        ],
      });
      await nextTick();
      const dataTable = wrapper.findComponent<typeof DataTable>("#game-lobby-start-game-confirm-dialog-players-grouped-datatable");
      const expectedValue: PlayerGroupsDataTableValue[] = [
        {
          firstGroup: defaultPlayers[0],
          secondGroup: defaultPlayers[2],
        },
        {
          firstGroup: defaultPlayers[1],
          secondGroup: defaultPlayers[3],
        },
        {
          firstGroup: undefined,
          secondGroup: otherPlayer,
        },
      ];

      expect(dataTable.props("value")).toStrictEqual<PlayerGroupsDataTableValue[]>(expectedValue);
    });

    describe("DataTable Content", () => {
      beforeEach(async() => {
        wrapper = await mountGameLobbyStartGameConfirmDialogPlayersGroupedDataTableComponent({
          global: {
            stubs: {
              DataTable: false,
              TableHeader: false,
              TableBody: false,
              BodyRow: false,
              BodyCell: false,
              HeaderCell: false,
              RenderContext: false,
              RenderFnWithContext: false,
              Column: false,
              VirtualScroller: false,
            },
            plugins: [createTestingPinia(testingPinia)],
          },
        });
      });

      it("should render first group header icon with good size and src when rendered.", () => {
        const firstGroupHeaderIcon = wrapper.findComponent<typeof NuxtImg>("[alt='First group']");

        expect(firstGroupHeaderIcon.attributes("width")).toBe("30");
        expect(firstGroupHeaderIcon.attributes("height")).toBe("30");
        expect(firstGroupHeaderIcon.attributes("src")).toBe("/svg/game/player/player-group/group-1.svg");
      });

      it("should render second group header icon with good size and src when rendered.", () => {
        const secondGroupHeaderIcon = wrapper.findComponent<typeof NuxtImg>("[alt='Second group']");

        expect(secondGroupHeaderIcon.attributes("width")).toBe("30");
        expect(secondGroupHeaderIcon.attributes("height")).toBe("30");
        expect(secondGroupHeaderIcon.attributes("src")).toBe("/svg/game/player/player-group/group-2.svg");
      });

      it("should render first group name in header when rendered.", () => {
        const firstGroupHeaderName = wrapper.find<HTMLDivElement>("#first-group-header-name");

        expect(firstGroupHeaderName.text()).toBe(firstGroupName);
      });

      it("should render second group name in header when rendered.", () => {
        const secondGroupHeaderName = wrapper.find<HTMLDivElement>("#second-group-header-name");

        expect(secondGroupHeaderName.text()).toBe(secondGroupName);
      });

      it("should render 2 role images for first group when rendered.", () => {
        const firstGroupRoleImages = wrapper.findAllComponents<typeof NuxtImg>(".first-group-player-role-image");

        expect(firstGroupRoleImages).toHaveLength(2);
        expect(firstGroupRoleImages[0].attributes("rolename")).toBe("seer");
        expect(firstGroupRoleImages[0].attributes("sizes")).toBe("30");
        expect(firstGroupRoleImages[1].attributes("rolename")).toBe("werewolf");
        expect(firstGroupRoleImages[1].attributes("sizes")).toBe("30");
      });

      it("should render 2 role images for second group when rendered.", () => {
        const secondGroupRoleImages = wrapper.findAllComponents<typeof NuxtImg>(".second-group-player-role-image");

        expect(secondGroupRoleImages).toHaveLength(2);
        expect(secondGroupRoleImages[0].attributes("rolename")).toBe("villager");
        expect(secondGroupRoleImages[0].attributes("sizes")).toBe("30");
        expect(secondGroupRoleImages[1].attributes("rolename")).toBe("villager");
        expect(secondGroupRoleImages[1].attributes("sizes")).toBe("30");
      });

      it("should render 2 player names for first group when rendered.", () => {
        const firstGroupPlayerNames = wrapper.findAll<HTMLDivElement>(".first-group-player-name");

        expect(firstGroupPlayerNames).toHaveLength(2);
        expect(firstGroupPlayerNames[0].text()).toBe("Antoine");
        expect(firstGroupPlayerNames[1].text()).toBe("Benoit");
      });

      it("should render 2 player names for second group when rendered.", () => {
        const secondGroupPlayerNames = wrapper.findAll<HTMLDivElement>(".second-group-player-name");

        expect(secondGroupPlayerNames).toHaveLength(2);
        expect(secondGroupPlayerNames[0].text()).toBe("Catherine");
        expect(secondGroupPlayerNames[1].text()).toBe("David");
      });
    });
  });
});