import type { RoleName } from "~/composables/api/role/types/role.types";

type UseRoleName = {
  getRoleNameLabel: (roleName: RoleName) => string;
  getDefiniteRoleNameLabel: (roleName: RoleName, count: number) => string;
};

function useRoleName(): UseRoleName {
  const { t } = useI18n();

  function getRoleNameLabel(roleName: RoleName): string {
    return t(`shared.role.name.${roleName}`);
  }

  function getDefiniteRoleNameLabel(roleName: RoleName, count: number): string {
    return t(`shared.role.definiteName.${roleName}`, count);
  }
  return {
    getRoleNameLabel,
    getDefiniteRoleNameLabel,
  };
}

export { useRoleName };