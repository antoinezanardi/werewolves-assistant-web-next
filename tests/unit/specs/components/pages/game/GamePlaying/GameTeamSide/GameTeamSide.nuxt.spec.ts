import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { NuxtImg } from "#components";
import type { GameTeamSideProps } from "~/components/pages/game/GamePlaying/GameTeamSide/game-team-side.types";
import GameTeamSide from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSide.vue";
import GameTeamSidePlayer from "~/components/pages/game/GamePlaying/GameTeamSide/GameTeamSidePlayer/GameTeamSidePlayer.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeAccursedWolfFatherAlivePlayer, createFakeBigBadWolfAlivePlayer, createFakeHunterAlivePlayer, createFakeSeerAlivePlayer, createFakeVillagerAlivePlayer, createFakeWerewolfAlivePlayer, createFakeWhiteWerewolfAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Team Side Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameTeamSide>>;
  const defaultProps: GameTeamSideProps = { side: "villagers" };
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameTeamSideComponent(options: ComponentMountingOptions<typeof GameTeamSide> = {}): Promise<ReturnType<typeof mount<typeof GameTeamSide>>> {
    return mountSuspendedComponent(GameTeamSide, {
      props: options.props ?? defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameTeamSideComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Team Side Image", () => {
    it("should render the werewolves image when the side is werewolves.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "werewolves" } });
      const image = wrapper.findComponent<typeof NuxtImg>("[alt='Werewolves side']");

      expect(image.attributes("src")).toBe("/svg/role/werewolf.svg");
    });

    it("should render the villagers image when the side is villagers.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "villagers" } });
      const image = wrapper.findComponent<typeof NuxtImg>("[alt='Villagers side']");

      expect(image.attributes("src")).toBe("/svg/role/villager.svg");
    });
  });

  describe("Title", () => {
    it("should render the werewolves title when the side is werewolves.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "werewolves" } });
      const title = wrapper.find<HTMLHeadingElement>("#side-title");

      expect(title.text()).toBe("Werewolves");
    });

    it("should render the villagers title when the side is villagers.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "villagers" } });
      const title = wrapper.find<HTMLHeadingElement>("#side-title");

      expect(title.text()).toBe("Villagers");
    });
  });

  describe("Alive text", () => {
    it("should render the number of alive werewolves when the side is werewolves.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "werewolves" } });
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        players: [
          createFakeWerewolfAlivePlayer(),
          createFakeBigBadWolfAlivePlayer({ isAlive: false }),
          createFakeVillagerAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeWhiteWerewolfAlivePlayer(),
        ],
      });
      await nextTick();
      const aliveText = wrapper.find<HTMLSpanElement>("#alive-team-players");

      expect(aliveText.text()).toBe("components.GameTeamSide.aliveTeamPlayers, {\"alivePlayers\":3,\"totalPlayers\":4}");
    });

    it("should render the number of alive villagers when the side is villagers.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "villagers" } });
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        players: [
          createFakeWerewolfAlivePlayer(),
          createFakeSeerAlivePlayer(),
          createFakeVillagerAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer({ isAlive: false }),
          createFakeHunterAlivePlayer({ isAlive: false }),
        ],
      });
      await nextTick();
      const aliveText = wrapper.find<HTMLSpanElement>("#alive-team-players");

      expect(aliveText.text()).toBe("components.GameTeamSide.aliveTeamPlayers, {\"alivePlayers\":2,\"totalPlayers\":3}");
    });
  });

  describe("Game Team Side Players", () => {
    it("should render the werewolves players with alive players first when the side is werewolves.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "werewolves" } });
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        players: [
          createFakeWerewolfAlivePlayer(),
          createFakeBigBadWolfAlivePlayer(),
          createFakeVillagerAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer({ isAlive: false }),
          createFakeWhiteWerewolfAlivePlayer(),
        ],
      });
      await nextTick();
      const players = wrapper.findAllComponents<typeof GameTeamSidePlayer>(GameTeamSidePlayer);

      expect(players).toHaveLength(4);
      expect(players[0].props("player")).toStrictEqual<Player>(gameStore.game.players[0]);
      expect(players[1].props("player")).toStrictEqual<Player>(gameStore.game.players[1]);
      expect(players[2].props("player")).toStrictEqual<Player>(gameStore.game.players[4]);
      expect(players[3].props("player")).toStrictEqual<Player>(gameStore.game.players[3]);
    });

    it("should render the villagers players with alive players first when the side is villagers.", async() => {
      wrapper = await mountGameTeamSideComponent({ props: { side: "villagers" } });
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({
        players: [
          createFakeWerewolfAlivePlayer(),
          createFakeSeerAlivePlayer({ isAlive: false }),
          createFakeVillagerAlivePlayer(),
          createFakeAccursedWolfFatherAlivePlayer(),
          createFakeHunterAlivePlayer(),
        ],
      });
      await nextTick();
      const players = wrapper.findAllComponents<typeof GameTeamSidePlayer>(GameTeamSidePlayer);

      expect(players).toHaveLength(3);
      expect(players[0].props("player")).toStrictEqual<Player>(gameStore.game.players[2]);
      expect(players[1].props("player")).toStrictEqual<Player>(gameStore.game.players[4]);
      expect(players[2].props("player")).toStrictEqual<Player>(gameStore.game.players[1]);
    });
  });
});