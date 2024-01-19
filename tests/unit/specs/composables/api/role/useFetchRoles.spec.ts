import { useFetchRoles } from "~/composables/api/role/useFetchRoles";

describe("Use Fetch Roles Composable", () => {
  describe("fetchRoles", () => {
    it("should fetch roles when called without options.", async() => {
      await useFetchRoles().fetchRoles();

      expect(useFetch).toHaveBeenCalledExactlyOnceWith("http://127.0.0.1/roles", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }, "$dk08ZMi4Ri");
    });

    it("should fetch roles when called with options.", async() => {
      await useFetchRoles().fetchRoles({ method: "POST" });

      expect(useFetch).toHaveBeenCalledExactlyOnceWith("http://127.0.0.1/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }, "$dk08ZMi4Ri");
    });
  });
});