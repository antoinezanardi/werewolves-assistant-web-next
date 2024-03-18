import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Fuse from "fuse.js";
import type { AutoCompleteChangeEvent } from "primevue/autocomplete";

import { VuePrimeAutoComplete } from "#components";
import type { GamePlaygroundPlayerCardVoteInputProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/game-playground-player-card-vote-input.types";
import GamePlaygroundPlayerCardVoteInput from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCardVoteInput/GamePlaygroundPlayerCardVoteInput.vue";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { useMakeGamePlayDtoStore } from "~/stores/game/make-game-play-dto/useMakeGamePlayDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGamePlaySourceInteraction } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlay, createFakeGamePlaySurvivorsVote } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Player Card Vote Input Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundPlayerCardVoteInput>>;
  const defaultPlayer = createFakeSeerAlivePlayer({ name: "Antoine" });
  const players = [
    createFakeSeerAlivePlayer({ name: "Antoinette" }),
    createFakeSeerAlivePlayer({ name: "Johnny" }),
    defaultPlayer,
    createFakeSeerAlivePlayer({ name: "Antony" }),
  ];
  const pinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: createFakeGame({
          players,
          currentPlay: createFakeGamePlaySurvivorsVote({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "vote",
                  eligibleTargets: players,
                }),
              ],
            }),
          }),
        }),
      },
    },
  };
  const defaultProps: GamePlaygroundPlayerCardVoteInputProps = { player: defaultPlayer };

  async function mountGamePlaygroundPlayerCardVoteInputComponent(options: ComponentMountingOptions<typeof GamePlaygroundPlayerCardVoteInput> = {}):
  Promise<ReturnType<typeof mount<typeof GamePlaygroundPlayerCardVoteInput>>> {
    return mountSuspendedComponent(GamePlaygroundPlayerCardVoteInput, {
      shallow: false,
      global: {
        stubs: { RoleImage: true },
        plugins: [createTestingPinia(pinia)],
      },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundPlayerCardVoteInputComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Label", () => {
    it("should render translated float label text when rendered.", () => {
      const label = wrapper.find<HTMLLabelElement>("#player-vote-input-label");

      expect(label.text()).toBe("Vote for");
    });
  });

  describe("Autocomplete", () => {
    it("should have null as model value when render.", async() => {
      wrapper = await mountGamePlaygroundPlayerCardVoteInputComponent({
        global: {
          stubs: { RoleImage: true, VuePrimeAutoComplete: true },
          plugins: [createTestingPinia(pinia)],
        },
      });
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);

      expect(autocomplete.props("modelValue")).toBeNull();
    });

    it("should pass empty array as suggestions when render.", () => {
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>([]);
    });

    it("should pass empty array as suggestions when there is no current play on complete event.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = null;
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      autocomplete.vm.$emit("complete", { query: "Antoine" });
      await nextTick();

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>([]);
    });

    it("should pass empty array as suggestions when there is no current play eligible targets on complete event.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay();
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      autocomplete.vm.$emit("complete", { query: "Antoine" });
      await nextTick();

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>([]);
    });

    it("should pass empty array as suggestions when there is no current play source interactions on complete event.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ source: createFakeGamePlaySource() });
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const setCollectionSpy = vi.spyOn(Fuse.prototype, "setCollection");
      autocomplete.vm.$emit("complete", { query: "Antoine" });
      await nextTick();

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>([]);
      expect(setCollectionSpy).toHaveBeenCalledExactlyOnceWith([], undefined);
    });

    it("should pass empty array as suggestions when there is no current play source interactions (empty array) on complete event.", async() => {
      const gameStore = useGameStore();
      gameStore.game.currentPlay = createFakeGamePlay({ source: createFakeGamePlaySource({ interactions: [] }) });
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const setCollectionSpy = vi.spyOn(Fuse.prototype, "setCollection");
      autocomplete.vm.$emit("complete", { query: "Antoine" });
      await nextTick();

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>([]);
      expect(setCollectionSpy).toHaveBeenCalledExactlyOnceWith([], undefined);
    });

    it("should pass all players without the player in props himself as suggestions when query is empty on complete event.", async() => {
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      autocomplete.vm.$emit("complete", { query: "   " });
      await nextTick();
      const expectedSuggestions = players.filter(player => player._id !== defaultPlayer._id);

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>(expectedSuggestions);
    });

    it("should pass players with similar name without the player in props himself as suggestions when query the player's name himself on complete event.", async() => {
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      autocomplete.vm.$emit("complete", { query: "Antoine" });
      await nextTick();
      const expectedSuggestions = [
        players[0],
        players[3],
      ];

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>(expectedSuggestions);
    });

    it("should empty suggestions when hide event is emitted.", async() => {
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      autocomplete.vm.$emit("complete", { query: "Antoine" });
      await nextTick();
      autocomplete.vm.$emit("hide");
      await nextTick();

      expect(autocomplete.props("suggestions")).toStrictEqual<Player[]>([]);
    });

    it("should do nothing when v-model change event is emitted but value is string.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const event: AutoCompleteChangeEvent = { originalEvent: new Event("change"), value: "Antoine" };
      autocomplete.vm.$emit("change", event);
      await nextTick();

      expect(makeGamePlayDtoStore.removeMakeGamePlayVoteDto).not.toHaveBeenCalled();
      expect(makeGamePlayDtoStore.addMakeGamePlayVoteDto).not.toHaveBeenCalled();
    });

    it("should remove make game play vote from dto when item select event is emitted and player is null.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const event: AutoCompleteChangeEvent = { originalEvent: new Event("change"), value: null };
      autocomplete.vm.$emit("change", event);
      await nextTick();

      expect(makeGamePlayDtoStore.removeMakeGamePlayVoteDto).toHaveBeenCalledExactlyOnceWith(defaultPlayer._id);
    });

    it("should remove make game play vote from dto when v-model change event is emitted and player is voted.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const event: AutoCompleteChangeEvent = { originalEvent: new Event("change"), value: players[0] };
      autocomplete.vm.$emit("change", event);
      await nextTick();

      expect(makeGamePlayDtoStore.removeMakeGamePlayVoteDto).toHaveBeenCalledExactlyOnceWith(defaultPlayer._id);
    });

    it("should add make game play vote from dto when item select event is emitted and player is voted.", async() => {
      const makeGamePlayDtoStore = useMakeGamePlayDtoStore();
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const event: AutoCompleteChangeEvent = { originalEvent: new Event("change"), value: players[0] };
      autocomplete.vm.$emit("change", event);
      await nextTick();

      expect(makeGamePlayDtoStore.addMakeGamePlayVoteDto).toHaveBeenCalledExactlyOnceWith({ sourceId: defaultPlayer._id, targetId: players[0]._id });
    });

    it("should have the same value as the player in props when v-model change event is emitted and player is voted.", async() => {
      const autocomplete = wrapper.findComponent<typeof VuePrimeAutoComplete>(VuePrimeAutoComplete);
      const event: AutoCompleteChangeEvent = { originalEvent: new Event("change"), value: players[0] };
      autocomplete.vm.$emit("change", event);
      await nextTick();

      expect(autocomplete.props("modelValue")).toStrictEqual<Player>(players[0]);
    });
  });
});