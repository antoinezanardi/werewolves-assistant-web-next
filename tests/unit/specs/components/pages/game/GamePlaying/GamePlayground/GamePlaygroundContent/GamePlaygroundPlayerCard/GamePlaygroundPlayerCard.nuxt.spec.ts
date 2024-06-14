import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GamePlaygroundPlayerCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import type GamePlaygroundPlayerCardVoteInput from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/GamePlaygroundPlayerCardVoteInput.vue";
import type PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeMakeGamePlayTargetDto } from "@tests/unit/utils/factories/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto.factory";
import { createFakeGamePlaySourceInteractionBoundaries } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction-boundaries/game-play-source-interaction-boundaries.factory";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySurvivorsElectSheriff, createFakeGamePlayWerewolvesEat, createFakeGamePlayWitchUsesPotions } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Playground Player Card Component", () => {
  const player = createFakeSeerAlivePlayer({ name: "Antoine" });
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: createFakeGame() } } };
  const defaultProps: GamePlaygroundPlayerCardProps = {
    player,
    interaction: "eat",
  };

  async function mountGamePlaygroundPlayerCardComponent(options: ComponentMountingOptions<typeof GamePlaygroundPlayerCard> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>> {
    return mountSuspendedComponent(GamePlaygroundPlayerCard, {
      props: defaultProps,
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundPlayerCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Player Card", () => {
    it("should have player name as props when rendered.", () => {
      const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");

      expect(playerCard.props("playerName")).toBe(player.name);
    });

    it("should have current player role as props when rendered.", () => {
      const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");

      expect(playerCard.props("playerRole")).toBe(player.role.current);
    });

    it("should not be selected when player is not in make game play dto targets.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      makeGamePlayDtoStore.makeGamePlayDto.targets = undefined;
      await nextTick();
      const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");

      expect(playerCard.props("isSelected")).toBeFalsy();
    });

    it("should be selected when player is in make game play dto targets.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const players = [
        player,
        createFakeSeerAlivePlayer({ name: "Benoit" }),
        createFakeSeerAlivePlayer({ name: "Alex" }),
      ];
      makeGamePlayDtoStore.makeGamePlayDto.targets = [
        createFakeMakeGamePlayTargetDto({ playerId: players[0]._id }),
        createFakeMakeGamePlayTargetDto({ playerId: players[1]._id }),
        createFakeMakeGamePlayTargetDto({ playerId: players[2]._id }),
      ];
      await nextTick();
      const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");

      expect(playerCard.props("isSelected")).toBeTruthy();
    });

    describe("Click on Player Card", () => {
      it("should do nothing when player can't be targeted because game play is null.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = null;
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should do nothing when player can't be targeted because game play type is not target.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlaySurvivorsElectSheriff({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "eat",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should do nothing when player can't be targeted because interaction is not found.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "charm",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should not call remove first make game play target dto when player is targeted but there are no current play.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = null;
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should remove first make game play target dto when interaction is life potion and there is already one target for life potion.", async() => {
        wrapper = await mountGamePlaygroundPlayerCardComponent({
          props: {
            ...defaultProps,
            interaction: "give-life-potion",
          },
        });
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "give-life-potion",
                eligibleTargets: [player],
                boundaries: createFakeGamePlaySourceInteractionBoundaries({
                  min: 1,
                  max: 1,
                }),
              }),
            ],
          }),
        });
        const players = [
          player,
          createFakeSeerAlivePlayer({ name: "Benoit" }),
          createFakeSeerAlivePlayer({ name: "Alex" }),
        ];
        makeGamePlayDtoStore.makeGamePlayDto.targets = [createFakeMakeGamePlayTargetDto({ playerId: players[2]._id, drankPotion: "life" })];
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDtoWithPotion).toHaveBeenCalledExactlyOnceWith("life");
      });

      it("should add player to make game play dto targets with drank life potion when player can be targeted and is not already with death targets.", async() => {
        wrapper = await mountGamePlaygroundPlayerCardComponent({
          props: {
            ...defaultProps,
            interaction: "give-life-potion",
          },
        });
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "give-life-potion",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        makeGamePlayDtoStore.makeGamePlayDto.targets = [createFakeMakeGamePlayTargetDto({ playerId: createFakePlayer()._id, drankPotion: "death" })];
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith({ playerId: player._id, drankPotion: "life" });
        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDtoWithPotion).not.toHaveBeenCalled();
      });

      it("should add player to make game play dto targets with drank life potion when player can be targeted and is not already without death targets.", async() => {
        wrapper = await mountGamePlaygroundPlayerCardComponent({
          props: {
            ...defaultProps,
            interaction: "give-life-potion",
          },
        });
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "give-life-potion",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        makeGamePlayDtoStore.makeGamePlayDto.targets = undefined;
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith({ playerId: player._id, drankPotion: "life" });
        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDtoWithPotion).not.toHaveBeenCalled();
      });

      it("should remove first make game play target dto when interaction is death potion and there is already one target for death potion.", async() => {
        wrapper = await mountGamePlaygroundPlayerCardComponent({
          props: {
            ...defaultProps,
            interaction: "give-death-potion",
          },
        });
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "give-death-potion",
                eligibleTargets: [player],
                boundaries: createFakeGamePlaySourceInteractionBoundaries({
                  min: 1,
                  max: 1,
                }),
              }),
            ],
          }),
        });
        const players = [
          player,
          createFakeSeerAlivePlayer({ name: "Benoit" }),
          createFakeSeerAlivePlayer({ name: "Alex" }),
        ];
        makeGamePlayDtoStore.makeGamePlayDto.targets = [createFakeMakeGamePlayTargetDto({ playerId: players[2]._id, drankPotion: "death" })];
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDtoWithPotion).toHaveBeenCalledExactlyOnceWith("death");
      });

      it("should add player to make game play dto targets with drank death potion when player can be targeted and is not already with life targets.", async() => {
        wrapper = await mountGamePlaygroundPlayerCardComponent({
          props: {
            ...defaultProps,
            interaction: "give-death-potion",
          },
        });
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "give-death-potion",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        makeGamePlayDtoStore.makeGamePlayDto.targets = [createFakeMakeGamePlayTargetDto({ playerId: createFakePlayer()._id, drankPotion: "life" })];
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith({ playerId: player._id, drankPotion: "death" });
        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDtoWithPotion).not.toHaveBeenCalled();
      });

      it("should add player to make game play dto targets with drank death potion when player can be targeted and is not already without life targets.", async() => {
        wrapper = await mountGamePlaygroundPlayerCardComponent({
          props: {
            ...defaultProps,
            interaction: "give-death-potion",
          },
        });
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWitchUsesPotions({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "give-death-potion",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        makeGamePlayDtoStore.makeGamePlayDto.targets = undefined;
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith({ playerId: player._id, drankPotion: "death" });
        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDtoWithPotion).not.toHaveBeenCalled();
      });

      it("should add player to make game play dto targets when player can be targeted and is not already.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat({
          type: "bury-dead-bodies",
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "eat",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith({ playerId: player._id });
        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should not call remove first make game play target dto when player is targeted but there are no eligible targets.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat();
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should remove player from make game play dto targets when player can be targeted and is already.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "eat",
                eligibleTargets: [player],
              }),
            ],
          }),
        });
        const players = [
          player,
          createFakeSeerAlivePlayer({ name: "Benoit" }),
          createFakeSeerAlivePlayer({ name: "Alex" }),
        ];
        makeGamePlayDtoStore.makeGamePlayDto.targets = [
          createFakeMakeGamePlayTargetDto({ playerId: players[0]._id }),
          createFakeMakeGamePlayTargetDto({ playerId: players[1]._id }),
          createFakeMakeGamePlayTargetDto({ playerId: players[2]._id }),
        ];
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.removeMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith(player._id);
        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).not.toHaveBeenCalled();
        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDto).not.toHaveBeenCalled();
      });

      it("should remove first player from make game play dto targets when player can be targeted and max targets are reached.", async() => {
        const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
        const gameStore = useGameStore();
        gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat({
          source: createFakeGamePlaySource({
            interactions: [
              createFakeGamePlaySourceInteraction({
                type: "eat",
                eligibleTargets: [player],
                boundaries: createFakeGamePlaySourceInteractionBoundaries({
                  min: 1,
                  max: 1,
                }),
              }),
            ],
          }),
        });
        const players = [
          player,
          createFakeSeerAlivePlayer({ name: "Benoit" }),
          createFakeSeerAlivePlayer({ name: "Alex" }),
        ];
        makeGamePlayDtoStore.makeGamePlayDto.targets = [createFakeMakeGamePlayTargetDto({ playerId: players[2]._id })];
        await nextTick();
        const playerCard = wrapper.findComponent<typeof PlayerCard>("#player-card");
        (playerCard.vm as VueVm).$emit("player-card-selector-click");

        expect(makeGamePlayDtoStore.removeFirstMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith();
        expect(makeGamePlayDtoStore.addMakeGamePlayTargetDto).toHaveBeenCalledExactlyOnceWith({ playerId: player._id });
      });
    });
  });

  describe("Vote Input", () => {
    it("should render vote input when game current play is vote type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlaySurvivorsElectSheriff();
      await nextTick();
      const voteInput = wrapper.findComponent<typeof GamePlaygroundPlayerCardVoteInput>("#game-playground-player-card-vote-input");

      expect(voteInput.exists()).toBeTruthy();
    });

    it("should not render vote input when game current play is not vote type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlayWerewolvesEat();
      await nextTick();
      const voteInput = wrapper.findComponent<typeof GamePlaygroundPlayerCardVoteInput>("#game-playground-player-card-vote-input");

      expect(voteInput.exists()).toBeFalsy();
    });
  });
});