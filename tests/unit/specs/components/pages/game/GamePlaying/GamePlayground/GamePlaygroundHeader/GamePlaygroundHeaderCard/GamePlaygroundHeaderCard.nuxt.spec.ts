import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";

import GamePlaygroundHeaderCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundHeader/GamePlaygroundHeaderCard/GamePlaygroundHeaderCard.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Header Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundHeaderCard>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          currentPlay: createFakeGamePlay({
            source: createFakeGamePlaySource({ name: "sheriff" }),
            action: "delegate",
          }),
        }),
      },
    },
  };

  async function mountGamePlaygroundHeaderCard(): Promise<ReturnType<typeof mount<typeof GamePlaygroundHeaderCard>>> {
    return mountSuspendedComponent(GamePlaygroundHeaderCard, { global: { plugins: [createTestingPinia(testingPinia)] } });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundHeaderCard();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Image", () => {
    it.each<{
      sourceName: GamePlaySourceName;
      expectedRoleImageRoleName: RoleName;
      test: string;
    }>([
      {
        sourceName: "sheriff",
        expectedRoleImageRoleName: "villager",
        test: "should pass the villager role name to the role image component when the current play source name is sheriff.",
      },
      {
        sourceName: "survivors",
        expectedRoleImageRoleName: "villager",
        test: "should pass the villager role name to the role image component when the current play source name is survivors.",
      },
      {
        sourceName: "charmed",
        expectedRoleImageRoleName: "villager",
        test: "should pass the villager role name to the role image component when the current play source name is charmed.",
      },
      {
        sourceName: "lovers",
        expectedRoleImageRoleName: "villager",
        test: "should pass the villager role name to the role image component when the current play source name is lovers.",
      },
      {
        sourceName: "werewolves",
        expectedRoleImageRoleName: "werewolf",
        test: "should pass the werewolf role name to the role image component when the current play source name is werewolf.",
      },
      {
        sourceName: "witch",
        expectedRoleImageRoleName: "witch",
        test: "should pass the witch role name to the role image component when the current play source name is witch.",
      },
      {
        sourceName: "seer",
        expectedRoleImageRoleName: "seer",
        test: "should pass the seer role name to the role image component when the current play source name is seer.",
      },
      {
        sourceName: "hunter",
        expectedRoleImageRoleName: "hunter",
        test: "should pass the hunter role name to the role image component when the current play source name is hunter.",
      },
    ])("$test", async({ sourceName, expectedRoleImageRoleName }) => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ source: createFakeGamePlaySource({ name: sourceName }) });
      await nextTick();
      const roleImage = wrapper.findComponent<typeof RoleImage>(RoleImage);

      expect(roleImage.props("roleName")).toBe(expectedRoleImageRoleName);
    });

    it("should pass undefined to the role image component when the current play is not set.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      await nextTick();
      const roleImage = wrapper.findComponent<typeof RoleImage>(RoleImage);

      expect(roleImage.props("roleName")).toBeUndefined();
    });
  });
});