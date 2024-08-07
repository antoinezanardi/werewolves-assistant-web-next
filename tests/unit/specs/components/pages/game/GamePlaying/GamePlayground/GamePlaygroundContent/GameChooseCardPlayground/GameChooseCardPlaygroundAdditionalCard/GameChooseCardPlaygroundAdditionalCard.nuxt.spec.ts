import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeMakeGamePlayDto } from "@tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play.dto.factory";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameChooseCardPlaygroundAdditionalCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlaygroundAdditionalCard/game-choose-card-playground-additional-card.types";
import GameChooseCardPlaygroundAdditionalCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlaygroundAdditionalCard/GameChooseCardPlaygroundAdditionalCard.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";

const hoistedMocks = vi.hoisted(() => ({
  useRolesStore: {
    getRoleSideForRoleName: vi.fn(),
  },
}));

vi.mock("~/stores/role/useRolesStore.ts", () => ({
  useRolesStore: (): typeof hoistedMocks.useRolesStore => hoistedMocks.useRolesStore,
}));

describe("Game Choose Card Playground Additional Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameChooseCardPlaygroundAdditionalCard>>;
  const defaultCreateGameDto = createFakeCreateGameDto();
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  const defaultProps: GameChooseCardPlaygroundAdditionalCardProps = {
    additionalCard: createFakeGameAdditionalCard({
      _id: "1",
      recipient: "thief",
      roleName: "seer",
      isUsed: false,
    }),
  };

  async function mountGameChooseCardPlaygroundAdditionalCardComponent(options: ComponentMountingOptions<typeof GameChooseCardPlaygroundAdditionalCard> = {}): Promise<ReturnType<typeof mount<typeof GameChooseCardPlaygroundAdditionalCard>>> {
    return mountSuspendedComponent(GameChooseCardPlaygroundAdditionalCard, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    hoistedMocks.useRolesStore.getRoleSideForRoleName.mockReturnValue("villagers");
    wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent();
    const makeGamePlayStore = useMakeGamePlayDtoStore();
    makeGamePlayStore.makeGamePlayDto = createFakeMakeGamePlayDto();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Additional Card Button", () => {
    it("should set base classes to button when card side is villagers.", () => {
      const button = wrapper.find<HTMLButtonElement>("#additional-card-button");
      const expectedClasses = [
        "border-4",
        "border-transparent",
        "flex",
        "flex-col",
        "glow:border-emerald-500",
        "h-52",
        "items-center",
        "me-2",
        "p-3",
        "rounded-lg",
      ];

      expect(button.classes()).toStrictEqual<string[]>(expectedClasses);
    });

    it("should set base classes to button when card side is werewolves.", async() => {
      hoistedMocks.useRolesStore.getRoleSideForRoleName.mockReturnValue("werewolves");
      wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent({
        props: {
          additionalCard: createFakeGameAdditionalCard({
            _id: "1",
            recipient: "thief",
            roleName: "werewolf",
            isUsed: false,
          }),
        },
      });
      const button = wrapper.find<HTMLButtonElement>("#additional-card-button");
      const expectedClasses = [
        "border-4",
        "border-transparent",
        "flex",
        "flex-col",
        "glow:border-red-500",
        "h-52",
        "items-center",
        "me-2",
        "p-3",
        "rounded-lg",
      ];

      expect(button.classes()).toStrictEqual<string[]>(expectedClasses);
    });

    it("should set base classes plus selected class to button when card side is villagers and selected.", async() => {
      wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent();
      const makeGamePlayStore = useMakeGamePlayDtoStore();
      makeGamePlayStore.makeGamePlayDto.chosenCardId = "1";
      await nextTick();
      const button = wrapper.find<HTMLButtonElement>("#additional-card-button");
      const expectedClasses = [
        "border-4",
        "border-transparent",
        "flex",
        "flex-col",
        "glow:border-emerald-500",
        "h-52",
        "items-center",
        "me-2",
        "p-3",
        "rounded-lg",
        "!border-emerald-500",
      ];

      expect(button.classes()).toStrictEqual<string[]>(expectedClasses);
    });

    it("should set base classes plus selected class to button when card side is werewolves and selected.", async() => {
      hoistedMocks.useRolesStore.getRoleSideForRoleName.mockReturnValue("werewolves");
      wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent({
        props: {
          additionalCard: createFakeGameAdditionalCard({
            _id: "1",
            recipient: "thief",
            roleName: "werewolf",
            isUsed: false,
          }),
        },
      });
      const makeGamePlayStore = useMakeGamePlayDtoStore();
      makeGamePlayStore.makeGamePlayDto.chosenCardId = "1";
      await nextTick();
      const button = wrapper.find<HTMLButtonElement>("#additional-card-button");
      const expectedClasses = [
        "border-4",
        "border-transparent",
        "flex",
        "flex-col",
        "glow:border-red-500",
        "h-52",
        "items-center",
        "me-2",
        "p-3",
        "rounded-lg",
        "!border-red-500",
      ];

      expect(button.classes()).toStrictEqual<string[]>(expectedClasses);
    });

    describe("Card Image", () => {
      it("should set card image to seer when card role name is seer.", () => {
        const roleImage = wrapper.findComponent<typeof RoleImage>("#additional-card-image");

        expect(roleImage.props("roleName")).toBe("seer");
      });

      it("should set base classes to card image when card side is villagers.", () => {
        const roleImage = wrapper.findComponent<typeof RoleImage>("#additional-card-image");
        const expectedClasses = [
          "border-4",
          "border-gray-800",
          "role-image",
          "rounded-lg",
          "h-[125px]",
          "w-[125px]",
          "glow:border-emerald-500",
          "mb-1",
        ];

        expect(roleImage.classes()).toStrictEqual<string[]>(expectedClasses);
      });

      it("should set base classes to card image when card side is werewolves.", async() => {
        hoistedMocks.useRolesStore.getRoleSideForRoleName.mockReturnValue("werewolves");
        wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent({
          props: {
            additionalCard: createFakeGameAdditionalCard({
              _id: "1",
              recipient: "thief",
              roleName: "werewolf",
              isUsed: false,
            }),
          },
        });
        const roleImage = wrapper.findComponent<typeof RoleImage>("#additional-card-image");
        const expectedClasses = [
          "border-4",
          "border-gray-800",
          "role-image",
          "rounded-lg",
          "h-[125px]",
          "w-[125px]",
          "glow:border-red-500",
          "mb-1",
        ];

        expect(roleImage.classes()).toStrictEqual<string[]>(expectedClasses);
      });

      it("should set base classes plus selected class to card image when card side is villagers and selected.", async() => {
        wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent();
        const makeGamePlayStore = useMakeGamePlayDtoStore();
        makeGamePlayStore.makeGamePlayDto.chosenCardId = "1";
        await nextTick();
        const roleImage = wrapper.findComponent<typeof RoleImage>("#additional-card-image");
        const expectedClasses = [
          "border-4",
          "border-gray-800",
          "role-image",
          "rounded-lg",
          "h-[125px]",
          "w-[125px]",
          "glow:border-emerald-500",
          "mb-1",
          "!border-emerald-500",
        ];

        expect(roleImage.classes()).toStrictEqual<string[]>(expectedClasses);
      });

      it("should set base classes plus selected class to card image when card side is werewolves and selected.", async() => {
        hoistedMocks.useRolesStore.getRoleSideForRoleName.mockReturnValue("werewolves");
        wrapper = await mountGameChooseCardPlaygroundAdditionalCardComponent({
          props: {
            additionalCard: createFakeGameAdditionalCard({
              _id: "1",
              recipient: "thief",
              roleName: "werewolf",
              isUsed: false,
            }),
          },
        });
        const makeGamePlayStore = useMakeGamePlayDtoStore();
        makeGamePlayStore.makeGamePlayDto.chosenCardId = "1";
        await nextTick();
        const roleImage = wrapper.findComponent<typeof RoleImage>("#additional-card-image");
        const expectedClasses = [
          "border-4",
          "border-gray-800",
          "role-image",
          "rounded-lg",
          "h-[125px]",
          "w-[125px]",
          "glow:border-red-500",
          "mb-1",
          "!border-red-500",
        ];

        expect(roleImage.classes()).toStrictEqual<string[]>(expectedClasses);
      });
    });

    describe("Card Label", () => {
      it("should translate card label to seer when card role name is seer.", () => {
        const label = wrapper.find<HTMLSpanElement>("#additional-card-role-label");

        expect(label.text()).toBe("shared.role.name.seer");
      });
    });

    describe("Emits", () => {
      it("should emit click additional card event when button is clicked.", async() => {
        const button = wrapper.find<HTMLButtonElement>("#additional-card-button");
        await button.trigger("click");

        expect(wrapper.emitted("clickAdditionalCard")).toBeTruthy();
      });
    });
  });
});