import type { NuxtImg } from "#components";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";

describe("Game Lobby Start Game Confirm Dialog Players Ready Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersReady>>;

  async function mountGameLobbyStartGameConfirmDialogPlayersReadyComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogPlayersReady> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogPlayersReady>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogPlayersReady, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogPlayersReadyComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Step Svgs", () => {
    it("should set size to villager svg when rendered.", () => {
      const villagerSvg = wrapper.findComponent<typeof NuxtImg>("[alt='Villagers']");

      expect(villagerSvg.attributes("width")).toBe("75");
      expect(villagerSvg.attributes("height")).toBe("75");
    });

    it("should set source to villager svg when rendered.", () => {
      const villagerSvg = wrapper.findComponent<typeof NuxtImg>("[alt='Villagers']");

      expect(villagerSvg.attributes("src")).toBe("/svg/role/villager.svg");
    });

    it("should set size to werewolf svg when rendered.", () => {
      const werewolfSvg = wrapper.findComponent<typeof NuxtImg>("[alt='Werewolves']");

      expect(werewolfSvg.attributes("width")).toBe("75");
      expect(werewolfSvg.attributes("height")).toBe("75");
    });

    it("should set source to werewolf svg when rendered.", () => {
      const werewolfSvg = wrapper.findComponent<typeof NuxtImg>("[alt='Werewolves']");

      expect(werewolfSvg.attributes("src")).toBe("/svg/role/werewolf.svg");
    });
  });

  describe("Text", () => {
    it("should translate text when rendered.", () => {
      const text = wrapper.find<HTMLHeadingElement>("#game-lobby-start-game-confirm-dialog-players-ready-text");

      expect(text.text()).toBe("Do all the players have their role and are ready to play?");
    });
  });
});