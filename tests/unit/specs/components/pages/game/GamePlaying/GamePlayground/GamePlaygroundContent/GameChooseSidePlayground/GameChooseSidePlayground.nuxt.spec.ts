import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import { doesElementHaveClass } from "@tests/unit/utils/helpers/happy-dom.helpers";
import GameChooseSidePlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseSidePlayground/GameChooseSidePlayground.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Choose Side Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameChooseSidePlayground>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };

  async function mountGameChooseSidePlaygroundComponent(): Promise<ReturnType<typeof mount<typeof GameChooseSidePlayground>>> {
    return mountSuspendedComponent(GameChooseSidePlayground, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: { RoleImage: true },
      },
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameChooseSidePlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Choose Villager Side Button", () => {
    it("should select the villager side when clicked.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const button = wrapper.find<HTMLButtonElement>("#choose-villagers-side-button");
      await button.trigger("click");

      expect(makeGamePlayDtoStore.setChosenSide).toHaveBeenCalledExactlyOnceWith("villagers");
    });

    it("should have emerald border when side is villagers.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto.chosenSide = "villagers";
      await nextTick();
      const button = wrapper.find<HTMLButtonElement>("#choose-villagers-side-button");

      expect(doesElementHaveClass(button, "!border-emerald-500")).toBeTruthy();
    });

    describe("Villagers Button Image", () => {
      it("should have emerald border when side is villagers.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto.chosenSide = "villagers";
        await nextTick();
        const button = wrapper.find<HTMLButtonElement>("#choose-villagers-side-button");
        const image = button.findComponent<typeof RoleImage>("#villagers-side-image");

        expect(doesElementHaveClass(image, "!border-emerald-500")).toBeTruthy();
      });
    });

    describe("Villagers Button Text", () => {
      it("should have translated text when rendered.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto.chosenSide = "villagers";
        await nextTick();
        const button = wrapper.find<HTMLButtonElement>("#choose-villagers-side-button");

        expect(button.text()).toBe("Villagers side");
      });
    });
  });

  describe("Choose Werewolves Side button", () => {
    it("should select the werewolves side when clicked.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const button = wrapper.find<HTMLButtonElement>("#choose-werewolves-side-button");
      await button.trigger("click");

      expect(makeGamePlayDtoStore.setChosenSide).toHaveBeenCalledExactlyOnceWith("werewolves");
    });

    it("should have red border when side is werewolves.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto.chosenSide = "werewolves";
      await nextTick();
      const button = wrapper.find<HTMLButtonElement>("#choose-werewolves-side-button");

      expect(doesElementHaveClass(button, "!border-red-500")).toBeTruthy();
    });

    describe("Werewolves Button Image", () => {
      it("should have red border when side is werewolves.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto.chosenSide = "werewolves";
        await nextTick();
        const button = wrapper.find<HTMLButtonElement>("#choose-werewolves-side-button");
        const image = button.findComponent<typeof RoleImage>("#werewolves-side-image");

        expect(doesElementHaveClass(image, "!border-red-500")).toBeTruthy();
      });
    });

    describe("Werewolves Button Text", () => {
      it("should have translated text when rendered.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        makeGamePlayDtoStore.makeGamePlayDto.chosenSide = "werewolves";
        await nextTick();
        const button = wrapper.find<HTMLButtonElement>("#choose-werewolves-side-button");

        expect(button.text()).toBe("Werewolves side");
      });
    });
  });
});