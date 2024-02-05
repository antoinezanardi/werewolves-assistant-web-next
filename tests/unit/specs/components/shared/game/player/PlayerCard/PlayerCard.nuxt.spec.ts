import type { mount } from "@vue/test-utils";

import type { PlayerCardProps } from "~/components/shared/game/player/PlayerCard/player-card.types";
import PlayerCard from "~/components/shared/game/player/PlayerCard/PlayerCard.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Player Card Component", () => {
  let wrapper: ReturnType<typeof mount<typeof PlayerCard>>;
  const defaultProps: PlayerCardProps = {
    playerName: "Player",
    playerRole: RoleNames.WEREWOLF,
  };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(PlayerCard, { props: defaultProps });
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Image", () => {
    it("should render role image of player with correct alt when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>(RoleImage);

      expect(roleImage.attributes("alt")).toBe("components.PlayerCard.playerCardRoleImageAlt, {\"playerName\":\"Player\"}");
    });
  });
});