import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Tag from "primevue/tag";
import type { OverflowTagProps } from "~/components/shared/misc/OverflowTag/overflow-tag.types";

import OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import { createFakeGameHistoryRecordPlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Overflow Tag Component", () => {
  let wrapper: ReturnType<typeof mount<typeof OverflowTag>>;
  const defaultProps: OverflowTagProps = {
    entitiesCount: 4,
    maximumEntitiesDisplayed: 3,
  };

  async function mountOverflowTagComponent(options: ComponentMountingOptions<typeof OverflowTag> = {}): Promise<ReturnType<typeof mount<typeof OverflowTag>>> {
    return mountSuspendedComponent(OverflowTag, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountOverflowTagComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Overflow Tag", () => {
    it("should display the overflow number when the entities count is greater than the maximum entities displayed.", () => {
      const tag = wrapper.findComponent<Tag>("#overflow-tag");

      expect(tag.attributes("value")).toBe("+ 1");
    });

    it("should not display the overflow number when the entities count is less than or equal to the maximum entities displayed.", async() => {
      wrapper = await mountOverflowTagComponent({
        props: {
          entitiesCount: 3,
          maximumEntitiesDisplayed: 3,
        },
      });
      const tag = wrapper.findComponent<Tag>("#overflow-tag");

      expect(tag.exists()).toBeFalsy();
    });
  });
});