import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameEventWithTextsProps } from "~/components/shared/game/game-event/GameEventWithTexts/game-event-with-texts.types";
import type GameEventTextsManager from "~/components/shared/game/game-event/GameEventWithTexts/GameEventTextsManager/GameEventTextsManager.vue";
import GameEventWithTexts from "~/components/shared/game/game-event/GameEventWithTexts/GameEventWithTexts.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Event With Texts Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventWithTexts>>;
  const defaultProps: GameEventWithTextsProps = {
    texts: [
      "Game starts.",
      "Day rises.",
      "Night falls.",
    ],
  };

  async function mountGameEventWithTextsComponent(options: ComponentMountingOptions<typeof GameEventWithTexts> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventWithTexts>>> {
    return mountSuspendedComponent(GameEventWithTexts, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventWithTextsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot without shallow when rendered.", async() => {
    wrapper = await mountGameEventWithTextsComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Event Texts Manager", () => {
    it("should pass texts from props when rendered.", () => {
      const gameEventTextsManager = wrapper.findComponent<typeof GameEventTextsManager>("#game-event-texts-manager");

      expect(gameEventTextsManager.props("texts")).toStrictEqual<string[]>(defaultProps.texts);
    });
  });
});