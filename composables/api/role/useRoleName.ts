import type { RoleName } from "~/composables/api/role/types/role.types";

type UseRoleName = {
  getRoleNameLabel: (roleName: RoleName) => string;
};

function useRoleName(): UseRoleName {
  const { t } = useI18n();

  function getRoleNameLabel(roleName: RoleName): string {
    return t(`shared.role.name.${roleName}`);
  }
  return { getRoleNameLabel };
}

export { useRoleName };