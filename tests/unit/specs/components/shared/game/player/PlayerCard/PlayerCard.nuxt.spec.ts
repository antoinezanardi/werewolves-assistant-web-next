import type { mount } from "@vue/test-utils";

import type { PlayerCardProps } from "~/components/shared/game/player/PlayerCard/player-card.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import RoleFlippingImage from "~/components/shared/role/RoleImage/RoleFlippingImage/RoleFlippingImage.vue";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Player Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof PlayerCard>>;
  const defaultProps: PlayerCardProps = {
    playerName: "Player",
    playerRole: "werewolf",
    selectorAriaLabel: "Select Player",
  };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(PlayerCard, { props: defaultProps });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Selector Button", () => {
    it("should render selector button without aria label when not provided in props.", async() => {
      wrapper = await mountSuspendedComponent(PlayerCard, { props: { ...defaultProps, selectorAriaLabel: undefined } });
      const selectorButton = wrapper.find<HTMLButtonElement>(".player-card-selector");

      expect(selectorButton.attributes("aria-label")).toBeUndefined();
    });

    it("should emit playerCardSelectorClick event when clicked.", async() => {
      const selectorButton = wrapper.find<HTMLButtonElement>("[aria-label=\"Select Player\"]");
      await selectorButton.trigger("click");
      const emittedEvents = wrapper.emitted("playerCardSelectorClick");

      expect(emittedEvents).toHaveLength(1);
    });

    it("should have tooltip with aria label as value when doesShowSelectorTooltip prop is true.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, ".player-card-selector") };
      wrapper = await mountSuspendedComponent(PlayerCard, { props: { ...defaultProps, doesShowSelectorTooltip: true }, global: { directives } });

      expect(tooltip.value).toBe("Select Player");
    });

    it("should not have tooltip when doesShowSelectorTooltip prop is false.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, ".player-card-selector") };
      wrapper = await mountSuspendedComponent(PlayerCard, { props: { ...defaultProps, doesShowSelectorTooltip: false }, global: { directives } });

      expect(tooltip.value).toBeUndefined();
    });

    describe("Flipping Role Image", () => {
      it("should render role image of player with correct alt when rendered.", () => {
        const roleImage = wrapper.findComponent<typeof RoleFlippingImage>(RoleFlippingImage);

        expect(roleImage.attributes("alt")).toBe("components.PlayerCard.playerCardRoleImageAlt, {\"playerName\":\"Player\"}");
      });
    });
  });
});