describe("client", () => {
  test("should call createClient with the correct arguments", () => {
    const createClient = jest.fn();
    jest.mock("@supabase/supabase-js", () => ({
      createClient,
    }));

    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.com";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test";

    const { backendClient } = require("./client");

    expect(createClient).toHaveBeenCalledWith("https://test.com", "test");
  });
});
