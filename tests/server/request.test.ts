import { ServerFunction } from "@/lib/server/request";
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
});
