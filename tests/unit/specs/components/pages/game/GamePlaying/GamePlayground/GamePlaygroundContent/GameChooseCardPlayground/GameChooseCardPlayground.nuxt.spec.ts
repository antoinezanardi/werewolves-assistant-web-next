import { createTestingPinia } from "@pinia/testing";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import { createFakeGamePlayThiefChoosesCard } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import GameChooseCardPlayground from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlayground.vue";
import type GameChooseCardPlaygroundAdditionalCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GameChooseCardPlayground/GameChooseCardPlaygroundAdditionalCard/GameChooseCardPlaygroundAdditionalCard.vue";
import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";

describe("Game Choose Card Playground Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameChooseCardPlayground>>;
  const additionalCards = [
    createFakeGameAdditionalCard({
      recipient: "thief",
      roleName: "seer",
      isUsed: false,
    }),
    createFakeGameAdditionalCard({
      recipient: "thief",
      roleName: "werewolf",
      isUsed: false,
    }),
    createFakeGameAdditionalCard({
      recipient: "thief",
      roleName: "hunter",
      isUsed: false,
    }),
  ];
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          additionalCards,
          currentPlay: createFakeGamePlayThiefChoosesCard(),
        }),
      },
    },
  };

  async function mountGameChooseCardPlaygroundComponent(options: ComponentMountingOptions<typeof GameChooseCardPlayground> = {}):
  Promise<ReturnType<typeof mount<typeof GameChooseCardPlayground>>> {
    return mountSuspendedComponent(GameChooseCardPlayground, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameChooseCardPlaygroundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot without shallow rendering when render.", async() => {
    wrapper = await mountGameChooseCardPlaygroundComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Recipient Game Additional Cards", () => {
    it("should display the game additional cards for the recipient when rendered.", async() => {
      wrapper = await mountGameChooseCardPlaygroundComponent({ shallow: false });
      const gameAdditionalCardsComponents = wrapper.findAllComponents<typeof GameChooseCardPlaygroundAdditionalCard>(".game-additional-card");

      expect(gameAdditionalCardsComponents).toHaveLength(3);
      expect(gameAdditionalCardsComponents[0].props("additionalCard")).toStrictEqual<GameAdditionalCard>(additionalCards[0]);
      expect(gameAdditionalCardsComponents[1].props("additionalCard")).toStrictEqual<GameAdditionalCard>(additionalCards[1]);
      expect(gameAdditionalCardsComponents[2].props("additionalCard")).toStrictEqual<GameAdditionalCard>(additionalCards[2]);
    });

    it("should unset card when the card is clicked on already chosen in make game play dto.", async() => {
      wrapper = await mountGameChooseCardPlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto.chosenCardId = additionalCards[1]._id;
      const gameAdditionalCardsComponents = wrapper.findAllComponents<typeof GameChooseCardPlaygroundAdditionalCard>(".game-additional-card");
      const chosenCard = gameAdditionalCardsComponents[1];
      chosenCard.vm.$emit("click-additional-card", additionalCards[1]);
      await nextTick();

      expect(makeGamePlayDtoStore.makeGamePlayDto.chosenCardId).toBeUndefined();
    });

    it("should set card when the card is clicked on not already chosen in make game play dto.", async() => {
      wrapper = await mountGameChooseCardPlaygroundComponent({ shallow: false });
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto.chosenCardId = undefined;
      const gameAdditionalCardsComponents = wrapper.findAllComponents<typeof GameChooseCardPlaygroundAdditionalCard>(".game-additional-card");
      const chosenCard = gameAdditionalCardsComponents[1];
      chosenCard.vm.$emit("click-additional-card", additionalCards[1]);
      await nextTick();

      expect(makeGamePlayDtoStore.makeGamePlayDto.chosenCardId).toBe(additionalCards[1]._id);
    });
  });
});