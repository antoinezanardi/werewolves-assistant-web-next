import { Role } from "~/composables/api/role/types/role.class";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";

describe("Role Class", () => {
  describe("create", () => {
    it("should create a role when called.", () => {
      const role = createFakeRole();
      const createdRole = Role.create(role);
      const expectedRole = new Role();
      expectedRole.name = role.name;
      expectedRole.side = role.side;
      expectedRole.type = role.type;
      expectedRole.origin = role.origin;
      expectedRole.minInGame = role.minInGame;
      expectedRole.maxInGame = role.maxInGame;
      expectedRole.additionalCardsEligibleRecipients = role.additionalCardsEligibleRecipients;
      expectedRole.recommendedMinPlayers = role.recommendedMinPlayers;

      expect(createdRole).toStrictEqual<Role>(expectedRole);
    });
  });
});