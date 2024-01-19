import { mockNuxtImport } from "@nuxt/test-utils/runtime";

import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { useRoleName } from "~/composables/api/role/useRoleName";
import { createFakeI18n } from "~/tests/unit/utils/factories/composables/i18n/useI18n.factory";

const { tMock } = vi.hoisted(() => ({ tMock: vi.fn() }));

describe("Use Role Name Composable", () => {
  beforeEach(() => {
    mockNuxtImport<() => ReturnType<typeof createFakeI18n>>(
      "useI18n",
    () => vi.fn(() => createFakeI18n({ t: tMock })),
    );
  });

  describe("getRoleLabel", () => {
    it("should translate role when called with role name.", () => {
      useRoleName().getRoleNameLabel(RoleNames.WEREWOLF);

      expect(tMock).toHaveBeenCalledExactlyOnceWith("shared.role.roleName.werewolf");
    });
  });
});