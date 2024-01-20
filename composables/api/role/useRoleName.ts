import type { RoleNames } from "~/composables/api/role/enums/role.enums";

type UseRoleName = {
  getRoleNameLabel: (roleName: RoleNames) => string;
};

function useRoleName(): UseRoleName {
  const { t } = useI18n();

  function getRoleNameLabel(roleName: RoleNames): string {
    return t(`shared.role.name.${roleName}`);
  }
  return { getRoleNameLabel };
}

export { useRoleName };