import type { mount } from "@vue/test-utils";

import type { GamePlaygroundPlayerCardProps } from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/game-playground-player-card.types";
import GamePlaygroundPlayerCard from "~/components/pages/game/GamePlaying/GamePlayground/GamePlaygroundContent/GamePlaygroundPlayerCard/GamePlaygroundPlayerCard.vue";
import { createFakeSeerAlivePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Playground Player Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>;
  const defaultProps: GamePlaygroundPlayerCardProps = { player: createFakeSeerAlivePlayer({ name: "Antoine" }) };

  async function mountGamePlaygroundPlayerCardComponent(): Promise<ReturnType<typeof mount<typeof GamePlaygroundPlayerCard>>> {
    return mountSuspendedComponent(GamePlaygroundPlayerCard, { props: defaultProps });
  }

  beforeEach(async() => {
    wrapper = await mountGamePlaygroundPlayerCardComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});