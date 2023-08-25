import { ServerFunction } from "@/lib/server/request";
import { vi } from "vitest";
import { ERRORS } from "@/lib/server/errors";

async function getServerFunction() {
  const request = new Request("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: "test",
      captain: true,
      failedTypecast: "not a boolean",
    }),
  });

  const wrapper = new ServerFunction();
  await wrapper.init(request);
  return wrapper;
}

describe("RequestWrapper", () => {
  beforeEach(() => {
    vi.mock("@/lib/server/firebase", () => {
      return {
        auth: {
          verifyIdToken: (token: string) => {
            if (token === "test") {
              return Promise.resolve({ uid: "test" });
            } else {
              return Promise.reject();
            }
          },
        },
        db: {
          doc: (path: string) => {
            return {
              get: () => {
                return {
                  update: (data: any) => {
                    return Promise.resolve();
                  },
                  get: () => {
                    return Promise.resolve({});
                  },
                };
              },
            };
          },
        },
      };
    });
  });
  it("should parse the request into a map and get the properties", async () => {
    const wrapper = await getServerFunction();

    expect(wrapper.getProperty<string>("token")).toBe("test");
    expect(wrapper.getProperty<boolean>("captain")).toBe(true);
  });
  it("should throw an error if the property is not found", async () => {
    const wrapper = await getServerFunction();

    expect(() => wrapper.getProperty<string>("notFound")).toThrow(
      ERRORS.BAD_ARGS
    );
  });
  it("should not throw if nothing is enforced", async () => {
    const wrapper = await getServerFunction();

    expect(() =>
      wrapper.enforce({
        captain: false,
        onTeam: false,
        freeAgent: false,
        authenticated: false,
      })
    ).not.toThrow();
  });
});
