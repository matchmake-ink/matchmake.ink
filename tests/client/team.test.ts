import { createTeam } from "@/lib/client/team";

describe("team", () => {
  describe("createTeam", () => {
    it("should call fetch with the correct arguments", async () => {
      const teamName = "test";
      const teamEmail = "test";

      await createTeam(teamName, teamEmail);
      expect(fetch).toHaveBeenCalledWith("/api/team/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "",
          name: teamName,
          email: teamEmail,
        }),
      });
    });
  });
});
