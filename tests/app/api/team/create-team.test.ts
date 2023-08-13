import { POST } from "@/app/api/team/create/route";
import { vi } from "vitest";

vi.mock("next/server", () => {
  return {
    NextResponse: {
      json: (data: any) => {
        return data;
      },
    },
  };
});

describe("POST /api/team/create", () => {
  it("should return badArgs if name is not provided", async () => {
    const request = new Request("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    //@ts-expect-error It's fine if this fails because we're in a test
    expect(response.result).toEqual("error");
  });
  it("should return noId if the user is not logged in", async () => {
    const request = new Request("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "test" }),
    });

    const response = await POST(request);
    //@ts-expect-error It's fine if this fails because we're in a test
    expect(response.result).toEqual("error");
  });
  it("should write a new team to the database", async () => {
    const request = new Request("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "test team" }),
    });

    const response = await POST(request);

    // ensure that db.doc(`profiles/${uid}`).update({ teamId: teamUid }) was called
  });
});
