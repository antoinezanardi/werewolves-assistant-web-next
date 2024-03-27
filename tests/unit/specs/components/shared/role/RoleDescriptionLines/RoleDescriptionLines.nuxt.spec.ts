import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { RoleDescriptionLinesProps } from "~/components/shared/role/RoleDescriptionLines/role-description-lines.types";
import RoleDescriptionLines from "~/components/shared/role/RoleDescriptionLines/RoleDescriptionLines.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Role Description Lines Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleDescriptionLines>>;
  const defaultRole: Role = createFakeRole({
    name: "werewolf",
    type: "werewolf",
    origin: "classic",
  });
  const defaultProps: RoleDescriptionLinesProps = { role: defaultRole };

  async function mountRoleDescriptionLinesComponent(options: ComponentMountingOptions<typeof RoleDescriptionLines> = {}):
  Promise<ReturnType<typeof mount<typeof RoleDescriptionLines>>> {
    return mountSuspendedComponent(RoleDescriptionLines, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRoleDescriptionLinesComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Description Lines", () => {
    it("should display role description lines when rendered.", () => {
      const roleDescriptionLines = wrapper.findAll<HTMLParagraphElement>(".role-description-line");

      expect(roleDescriptionLines).toHaveLength(4);
      expect(roleDescriptionLines[0].text()).toBe("shared.role.descriptions.werewolf.hisGoalIsToKillVillagers");
      expect(roleDescriptionLines[1].text()).toBe("shared.role.descriptions.werewolf.eachNightEatsVillager");
      expect(roleDescriptionLines[2].text()).toBe("shared.role.descriptions.werewolf.numberOfWolvesVaries");
      expect(roleDescriptionLines[3].text()).toBe("shared.role.descriptions.werewolf.werewolvesCantEatEachOther");
    });

    it("should not display role description lines when rendered if role description is not set in messages.", async() => {
      const unknownRole = createFakeRole({ name: "unknown" as RoleName });
      wrapper = await mountRoleDescriptionLinesComponent({ props: { role: unknownRole } });
      const roleDescriptionLines = wrapper.findAll<HTMLParagraphElement>(".role-description-line");

      expect(roleDescriptionLines).toHaveLength(0);
    });
  });
});